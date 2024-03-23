package com.zpo.studentsystem.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Table(name="intervals")
@Entity
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Interval {
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long intervalID;

    @ManyToOne
    private Device device;

}
