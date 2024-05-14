package com.example.ecohouse2.services;

import com.example.ecohouse2.Device;
import com.example.ecohouse2.repositories.DeviceRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class for the Device entity.
 * Contains methods for adding, updating and getting grades.
 */
@Service
@Transactional
public class DeviceService {

    @Autowired
    private DeviceRepository deviceRepo;

    public List<Device> getDevices() {
        return deviceRepo.findAll();
    }

    public Device addDevice(String deviceName) {
        Device device = new Device();
        device.setDeviceName(deviceName);
        return deviceRepo.save(device);
    }

    public Boolean deleteDevice(Long index) {
        if(getDevice(index) == null) return false;
        deviceRepo.deleteById(index);
        return true;
    }

    public Device getDevice(Long index) {
        return deviceRepo.findById(index).orElseThrow(
                () -> new EntityNotFoundException("Device not found with id " + index)
        );
    }
}
