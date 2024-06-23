package com.example.ecohouse2;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonGetter;
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

    @JsonGetter("timeStart")
    public String getStart() {
        return removeSeconds(timeStart);
    }
    @JsonGetter("timeEnd")
    public String getEnd() {
        return removeSeconds(timeEnd);
    }

    private String removeSeconds(LocalTime timeStart) {
        return timeStart.toString().substring(0, 5);
    }

    @Column(name = "time_end", nullable = false)
    private LocalTime timeEnd;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "device_id", nullable = false)
    @JsonBackReference
    private Device device;

}