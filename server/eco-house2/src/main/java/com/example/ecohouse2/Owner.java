package com.example.ecohouse2;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "\"owner\"")
public class Owner {

    public Owner() {
        this.password = "";
        this.email = "";
        this.name = "";
        this.surname = "";

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "owner_id", nullable = false)
    private Long id;

    @Column(name = "email", nullable = false, length = Integer.MAX_VALUE)
    private String email;

    @Column(name = "name", nullable = false, length = Integer.MAX_VALUE)
    private String name;

    @Column(name = "surname", nullable = false, length = Integer.MAX_VALUE)
    private String surname;

    @Column(name = "password", nullable = false, length = Integer.MAX_VALUE)
    private String password;

    @OneToMany(mappedBy = "owner")
    private Set<House> houses = new LinkedHashSet<>();

}