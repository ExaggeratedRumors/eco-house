package com.example.ecohouse2.services;

import com.example.ecohouse2.Device;
import com.example.ecohouse2.House;
import com.example.ecohouse2.Owner;
import com.example.ecohouse2.Room;
import com.example.ecohouse2.dto.DeviceRequest;
import com.example.ecohouse2.dto.HouseRequest;
import com.example.ecohouse2.repositories.DeviceRepository;
import com.example.ecohouse2.repositories.RoomRepository;
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
    @Autowired
    private RoomRepository roomRepo;

    public List<Device> getDevices() {
        return deviceRepo.findAll();
    }

    public Device addDevice(DeviceRequest deviceRequest) {
        Room room = roomRepo.findById(deviceRequest.getRoomId()).orElseThrow(
                () -> new EntityNotFoundException("room not found with id " + deviceRequest.getRoomId()));
        Device newDevice = deviceRequest.toDevice();
        newDevice.setRoom(room);
        System.out.println("Attempt to add device with room: " + room.getId() + " " + room.getName());
        return deviceRepo.save(newDevice);
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

    public boolean doesDeviceExist(DeviceRequest deviceRequest) {
        String name = deviceRequest.getName();
        Long roomId = deviceRequest.getRoomId();
        return deviceRepo.doesDeviceExist(name, roomId);
    }
}
