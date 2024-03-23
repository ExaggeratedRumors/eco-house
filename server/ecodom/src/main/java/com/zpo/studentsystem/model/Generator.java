package com.zpo.studentsystem.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Entity class representing a student.
 * A student can have many devices - a one-to-many relationship.
 * Upon deletion of a student, all of their devices are also deleted.
 */
@Table(name="generators")
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Setter
@Getter
public class Generator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long generatorID;

    public String deviceName;

    public Double panelSurfaceArea;

    public Double BatteryCapacity;

    //Generowanie prądu w ciągu doby

    @ManyToOne
    private House house;

    private String name;

    public Long getGeneratorId(){
        return generatorID;
    }
}
