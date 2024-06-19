package com.example.ecohouse2.dto;

import com.example.ecohouse2.Device;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class DeviceRequest implements Serializable {
    private String name;
    private Long roomId;
    private Double powerConsumption;

    public Device toDevice(){
        Device device = new Device();
        device.setName(this.name);
        device.setPowerConsumptionPerHour(this.powerConsumption);
        return device;
    }
}