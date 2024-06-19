package com.example.ecohouse2.dto;

import com.example.ecohouse2.Generator;
import com.example.ecohouse2.House;
import com.example.ecohouse2.Room;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class GeneratorRequest implements Serializable {
    private String name;
    private Long houseId;
    private Double panelSurface;
    private Double effectiveness;
    private Double batteryCapacity;


    public Generator toGenerator(){
        Generator generator = new Generator();
        generator.setName(this.name);
        generator.setPanelSurface(this.panelSurface);
        generator.setEffectiveness(this.effectiveness);
        generator.setBatteryCapacity(this.batteryCapacity);
        return generator;
    }
}