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
    private Double daytimeTariff;

    @Column(name = "night_tariff", nullable = false)
    private Double nightTariff;

    private LocalTime dayStart = LocalTime.of(6, 0);
    private LocalTime dayEnd = LocalTime.of(22, 0);

    public boolean isDay(LocalTime time) {
        return !time.isBefore(dayStart) && !time.isAfter(dayEnd);
    }

    @ManyToOne(fetch = FetchType.LAZY)
    //@MapsId("owner_id")
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

    private ArrayList<Pair<LocalTime, Double>> getIntervals() {
        double energyProduced = calculateDailyEnergyProduced();
        ArrayList<Pair<LocalTime, Double>> intervals = new ArrayList<>();
        for (Room room : rooms){
            for (Device device : room.getDevices()) {
                for (Interval interval : device.getIntervals()) {
                    intervals.add(Pair.of(interval.getTimeStart(), device.getPowerConsumptionPerHour() - energyProduced));
                    intervals.add(Pair.of(interval.getTimeEnd(), -device.getPowerConsumptionPerHour() - energyProduced));
                }
            }
        }
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