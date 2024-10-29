package com.example.ecohouse2;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "owner")
public class Owner implements Serializable{

    public Owner() {
        this.password = "";
        this.email = "";
        this.name = "";
        this.surname = "";

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "owner_id", nullable = false)
    private Long owner_id;

    @Column(name = "email", nullable = false, length = Integer.MAX_VALUE)
    private String email;

    @Column(name = "name", nullable = false, length = Integer.MAX_VALUE)
    private String name;

    @Column(name = "surname", nullable = false, length = Integer.MAX_VALUE)
    private String surname;

    @Column(name = "password", nullable = false, length = Integer.MAX_VALUE)
    @JsonIgnore
    private String password;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private Set<House> houses = new LinkedHashSet<>();

}