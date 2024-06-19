package com.example.ecohouse2.dto;

import com.example.ecohouse2.Owner;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class OwnerRequest implements Serializable {
    private String password;
    private String email;
    private String name;
    private String surname;

    public Owner toOwner(){
        Owner owner = new Owner();
        owner.setPassword(this.password);
        owner.setEmail(this.email);
        owner.setName(this.name);
        owner.setSurname(this.surname);
        return owner;
    }
}