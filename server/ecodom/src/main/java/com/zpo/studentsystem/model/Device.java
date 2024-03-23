package com.zpo.studentsystem.model;

import com.zpo.studentsystem.config.Utils;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Represents a grade of a generator in a house.
 * A grade is a many-to-many relationship between a generator and a house, as a generator can have many grades and a house can have many grades.
 * A grade is also a composite primary key, as it cannot exist without a generator or a house.
 */
@Table(name="devices")
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Device implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long deviceId;

    public String deviceName;

    @ManyToOne
    private House house;

    @Getter
    private Double powerConsumptionPerHour;

    @OneToMany(mappedBy = "device", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Interval> intervals = new ArrayList<>();

}
