package com.example.ecohouse2;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonGetter;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.util.Pair;

import java.io.Serializable;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.util.*;

import static java.util.concurrent.TimeUnit.MINUTES;

@Getter
@Setter
@Entity
@Table(name = "house")
public class House implements Serializable {

    public House() {
        this.createdAt = OffsetDateTime.now();
        this.address = "";
        this.name = "";
        this.daytimeTariff = 0.0;
        this.nightTariff = 0.0;
    }


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "house_id", nullable = false)
    private Long house_id;

    @Column(name = "address", nullable = false, length = Integer.MAX_VALUE)
    private String address;

    @Column(name = "name", nullable = false, length = Integer.MAX_VALUE)
    private String name;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "daytime_tariff", nullable = false)
    private Double daytimeTariff; //PLN per kWh

    @Column(name = "night_tariff", nullable = false)
    private Double nightTariff; //PLN per kWh

    private static LocalTime dayStart = LocalTime.parse("06:00");
    private static LocalTime dayEnd = LocalTime.parse("22:00");

    public boolean isDay(LocalTime time) {
        return !time.isBefore(dayStart) && !time.isAfter(dayEnd);
    }
    private double getTariff(LocalTime time) {
        return isDay(time) ? daytimeTariff : nightTariff;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    @JsonBackReference
    private Owner owner;

    @JsonGetter("dailyEnergyProduced_kWh")
    public double calculateDailyEnergyProduced() {
        return generators.stream().mapToDouble(Generator::dailyEnergyProduced_kWh).sum();
    }

    @JsonGetter("dailyEnergyConsumedGraph_WattsPerHour")
    public Map<String, Double> calculateDailyEnergyConsumed() {
        return convertToPowerMap(getIntervals());
    }

    @JsonGetter("dailyCostGraph")
    public Map<String, Double> calculateDailyCost() {
        return calculateCostOfEnergy(calculateDailyEnergyConsumed());
    }

    @JsonGetter("dailyCost")
    public double calculateDailyCostSum() {
        Map<String, Double> costGraph = calculateDailyCost();
        double sum = 0.0;
        LocalTime timeBefore = null;
        double costBefore = 0.0;
        for (Map.Entry<String, Double> entry : costGraph.entrySet()) {
            if (timeBefore == null) {
                timeBefore = LocalTime.parse(entry.getKey());
                costBefore = entry.getValue();
                continue;
            }
            LocalTime current = LocalTime.parse(entry.getKey());

            double hours = MINUTES.toMinutes(current.toSecondOfDay() - timeBefore.toSecondOfDay()) / (60.0 * 60.0);
            double add = costBefore * hours;
            //System.out.println("Time before: " + timeBefore + " Current: " + current + " Hours: " + hours + " Add: " + add);
            sum += add;
            timeBefore = current;
            costBefore = entry.getValue();
        }
        return sum;
    }

    private Map<String, Double> calculateCostOfEnergy(Map<String, Double> dailyEnergyConsumed) {
        Map<String, Double> result = new LinkedHashMap<>();
        for (Map.Entry<String, Double> entry : dailyEnergyConsumed.entrySet()) {
            LocalTime time = LocalTime.parse(entry.getKey());
            double powerInWh = entry.getValue();
            double powerInKwh = powerInWh / 1000.0;
            double cost = powerInKwh * getTariff(time);
            result.put(entry.getKey(), cost);
        }
        return result;
    }


    private ArrayList<Pair<LocalTime, Double>> getIntervals() {
        double energyProduced = calculateDailyEnergyProduced();
        ArrayList<Pair<LocalTime, Double>> intervals = new ArrayList<>();
        for (Room room : rooms){
            for (Device device : room.getDevices()) {
                for (Interval interval : device.getIntervals()) {

                    if (isDay(interval.getTimeStart()) && isDay(interval.getTimeEnd())) { // same tariff
                        //TODO fix if interval is longer than day
                        intervals.add(Pair.of(interval.getTimeStart(), device.getPowerConsumptionPerHour() - energyProduced));
                        intervals.add(Pair.of(interval.getTimeEnd(), -device.getPowerConsumptionPerHour() - energyProduced));
                    }
                    else if (isDay(interval.getTimeStart()) && !isDay(interval.getTimeEnd())) { //start is day, end is night
                        intervals.add(Pair.of(interval.getTimeStart(), device.getPowerConsumptionPerHour() - energyProduced));
                        intervals.add(Pair.of(dayEnd, -device.getPowerConsumptionPerHour() - energyProduced));
                        intervals.add(Pair.of(dayEnd, device.getPowerConsumptionPerHour() - energyProduced));
                        intervals.add(Pair.of(interval.getTimeEnd(), -device.getPowerConsumptionPerHour() - energyProduced));
                    }
                    else if (!isDay(interval.getTimeStart()) && isDay(interval.getTimeEnd())) { //start is night, end is day
                        intervals.add(Pair.of(interval.getTimeStart(), device.getPowerConsumptionPerHour() - energyProduced));
                        intervals.add(Pair.of(dayStart, -device.getPowerConsumptionPerHour() - energyProduced));
                        intervals.add(Pair.of(dayStart, device.getPowerConsumptionPerHour() - energyProduced));
                        intervals.add(Pair.of(interval.getTimeEnd(), -device.getPowerConsumptionPerHour() - energyProduced));
                    }
                }
            }
        }
        System.out.println(intervals);
        return intervals;
    }

    public static Map<String, Double> convertToPowerMap(List<Pair<LocalTime, Double>> intervals) {
        TreeMap<LocalTime, Double> powerMap = new TreeMap<>();

        for (Pair<LocalTime, Double> interval : intervals) {
            LocalTime time = interval.getFirst();
            double power = interval.getSecond();
            powerMap.put(time, powerMap.getOrDefault(time, 0.0) + power);
        }

        Map<String, Double> result = new LinkedHashMap<>();
        double cumulativePower = 0.0;
        for (Map.Entry<LocalTime, Double> entry : powerMap.entrySet()) {
            cumulativePower += entry.getValue();
            result.put(formatTime(entry.getKey()), cumulativePower);
        }
        System.out.println(result);
        return result;
    }



    public static String formatTime(LocalTime time) {
        return String.format("%02d:%02d", time.getHour(), time.getMinute());
    }

    @OneToMany(mappedBy = "house", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<Generator> generators = new LinkedHashSet<>();


    @OneToMany(mappedBy = "house", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<Room> rooms = new LinkedHashSet<>();
}