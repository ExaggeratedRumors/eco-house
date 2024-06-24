package com.example.ecohouse2.controllers;

import com.example.ecohouse2.Device;
import com.example.ecohouse2.House;
import com.example.ecohouse2.Owner;
import com.example.ecohouse2.Room;
import com.example.ecohouse2.dto.DeviceRequest;
import com.example.ecohouse2.dto.RoomRequest;
import com.example.ecohouse2.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.example.ecohouse2.dto.HouseRequest;

/**
 * Controller for the House entity.
 * Contains methods for handling HTTP requests related to courses.
 */
@Controller
public class DeviceController {
    @Autowired
    HouseService houseService;

    @Autowired
    GeneratorService generatorService;

    @Autowired
    DeviceService deviceService;

    @Autowired
    OwnerService ownerService;

    @Autowired
    RoomService roomService;


    @CrossOrigin
    @PostMapping("/devices/add")
    public ResponseEntity<Device> addDevice(@RequestBody DeviceRequest deviceRequest) {
        System.out.println("Adding device \"" + deviceRequest.getName() +"\"");
        Device result = deviceService.addDevice(deviceRequest);
        if(result == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        System.out.println("House added with id " + result.getId());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @CrossOrigin
    @DeleteMapping("/devices/delete/{id}")
    public ResponseEntity<Long> deleteDevice(@PathVariable Long id) {
        System.out.println("Deleting device with id " + id);
        Boolean result = deviceService.deleteDevice(id);
        if(!result)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        System.out.println("Device deleted");
        return new ResponseEntity<>(id, HttpStatus.OK);
    }
}
