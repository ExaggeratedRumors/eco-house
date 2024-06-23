package com.example.ecohouse2;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "generator")
public class Generator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "generator_id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false, length = Integer.MAX_VALUE)
    private String name;

    @Column(name = "effectiveness", nullable = false)
    private Double effectiveness;

    @Column(name = "battery_capacity", nullable = false)
    private Double batteryCapacity;

    @Column(name = "wattage", nullable = false)
    private Double wattage;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "house_id", nullable = false)
    @JsonBackReference
    private House house;


    //calculate energy produced by generator in one day
    //@JsonGetter("energyProduced")
    public double dailyEnergyProduced_kWh() {
        double hoursOfSunlight = 5.0;
        return (hoursOfSunlight * this.wattage) * this.effectiveness / 1000.0;
    }
}