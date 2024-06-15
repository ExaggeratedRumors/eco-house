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

    @Column(name = "panel_surface", nullable = false)
    private Double panelSurface;

    @Column(name = "effectiveness", nullable = false)
    private Double effectiveness;

    @Column(name = "battery_capacity", nullable = false)
    private Double batteryCapacity;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "house_id", nullable = false)
    @JsonBackReference
    private House house;

}