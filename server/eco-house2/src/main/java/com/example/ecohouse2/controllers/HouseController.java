package com.example.ecohouse2.controllers;

import com.example.ecohouse2.House;
import com.example.ecohouse2.Owner;
import com.example.ecohouse2.services.DeviceService;
import com.example.ecohouse2.services.GeneratorService;
import com.example.ecohouse2.services.HouseService;
import com.example.ecohouse2.services.OwnerService;
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
public class HouseController {
    @Autowired
    HouseService houseService;

    @Autowired
    GeneratorService generatorService;

    @Autowired
    DeviceService deviceService;

    @Autowired
    OwnerService ownerService;

    @CrossOrigin
    @RequestMapping("/houses")
    public String getHouses(Model model) {
        List<House> houses = houseService.getHouses();
        model.addAttribute("houses", houses);
        return "houses.html";
    }

    @CrossOrigin
    @PostMapping("/houses/add")
    public ResponseEntity<House> addHouse(@RequestBody HouseRequest houseRequest) {
        System.out.println("Adding house \"" + houseRequest.getName() +"\"");
        House result = houseService.addHouse(houseRequest);
        if(result == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        System.out.println("House added with id " + result.getHouse_id());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @CrossOrigin
    @DeleteMapping("/houses/delete/{id}")
    public ResponseEntity<Long> deleteHouse(@PathVariable Long id) {
        System.out.println("Deleting house with id " + id);
        Boolean result = houseService.deleteHouse(id);
        if(!result)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        System.out.println("House deleted");
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    //@PostMapping("/courses/grades/add/{deviceName}")
    //public ResponseEntity<Long> addGrade(@PathVariable String deviceName) {
    //     System.out.println("Adding device " + deviceName);
    //     Device result = deviceService.addDevice(deviceName);
    //     if(result == null)
    //         return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    //     System.out.println("Device added");
    //     return new ResponseEntity<>(HttpStatus.OK);
    //}

}
