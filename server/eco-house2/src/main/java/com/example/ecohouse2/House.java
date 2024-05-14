package com.example.ecohouse2;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "house")
public class House {

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
    private Long id;

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
    @JoinColumn(name = "user_id", nullable = false)
    private Owner owner;

    @OneToMany(mappedBy = "house")
    private Set<Generator> generators = new LinkedHashSet<>();

    @OneToMany(mappedBy = "house")
    private Set<Room> rooms = new LinkedHashSet<>();

    public Long getHouseId() {
        return id;
    }
}