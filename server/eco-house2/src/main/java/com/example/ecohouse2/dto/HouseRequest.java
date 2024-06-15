package com.example.ecohouse2.dto;

import com.example.ecohouse2.House;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.OffsetDateTime;

@Getter
@Setter
public class HouseRequest implements Serializable {
    private int ownerId;
    private String address;
    private String name;
    private double daytimeTariff;
    private double nightTariff;

    public HouseRequest() {
        this.ownerId = 0;
        this.address = "";
        this.name = "";
        this.daytimeTariff = 0.0;
        this.nightTariff = 0.0;
    }

    public House toHouse(){
        House house = new House();
        house.setAddress(this.address);
        house.setName(this.name);
        house.setDaytimeTariff(this.daytimeTariff);
        house.setNightTariff(this.nightTariff);
        return house;
    }
}