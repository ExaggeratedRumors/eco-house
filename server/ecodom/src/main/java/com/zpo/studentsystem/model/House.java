package com.zpo.studentsystem.model;


import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.ArrayList;


//Table(name="courses")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
public class House {

    @Id
    @GeneratedValue
    public Long houseId;

    private String email;
    private String address;
    private String name;
    private String surname;
    private String password;
    private String createdAt;
    private Long nightTariff;
    private Long dayTariff;

    @OneToMany(mappedBy = "house", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Device> devices = new ArrayList<>();

    @OneToMany(mappedBy = "house", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Generator> generators = new ArrayList<>();

}
