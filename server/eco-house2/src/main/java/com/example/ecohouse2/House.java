package com.example.ecohouse2;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonGetter;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.OffsetDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

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

    @ManyToOne(fetch = FetchType.LAZY)
    //@MapsId("owner_id")
    @JoinColumn(name = "owner_id", nullable = false)
    @JsonBackReference
    private Owner owner;

    @JsonGetter("dailyEnergyProduced_kWh")
    public double calculateDailyEnergyProduced() {
        return generators.stream().mapToDouble(Generator::dailyEnergyProduced_kWh).sum();
    }

    @JsonGetter("dailyEnergyConsumedGraph_kWh")
    public double calculateDailyEnergyConsumed() {
        return 0.0;
    }

    @OneToMany(mappedBy = "house", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<Generator> generators = new LinkedHashSet<>();


    @OneToMany(mappedBy = "house", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<Room> rooms = new LinkedHashSet<>();
}