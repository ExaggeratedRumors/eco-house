package com.example.ecohouse2;

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
    private String panelSurface;

    @Column(name = "effectiveness", nullable = false)
    private String effectiveness;

    @Column(name = "battery_capacity", nullable = false)
    private String batteryCapacity;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "house_id", nullable = false)
    private House house;

}