package com.example.ecohouse2;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "\"interval\"")
public class Interval {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "interval_id", nullable = false)
    private Long id;

    @Column(name = "time_start", nullable = false)
    private LocalTime timeStart;

    @Column(name = "time_end", nullable = false)
    private LocalTime timeEnd;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "device_id", nullable = false)
    @JsonBackReference
    private Device device;

}