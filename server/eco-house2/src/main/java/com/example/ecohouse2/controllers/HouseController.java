package com.example.ecohouse2.controllers;

import com.example.ecohouse2.Device;
import com.example.ecohouse2.House;
import com.example.ecohouse2.services.DeviceService;
import com.example.ecohouse2.services.GeneratorService;
import com.example.ecohouse2.services.HouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

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

    @RequestMapping("/houses")
    public String getCourses(Model model) {
        List<House> houses = houseService.getHouses();
        model.addAttribute("courses", houses);
        return "houses.html";
    }

    @PostMapping("/houses/add/{name}")
    public ResponseEntity<House> addCourse(@PathVariable String name) {
        System.out.println("Adding house \"" + name+"\"");
        House result = houseService.addHouse(name);
        if(result == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        System.out.println("House added with id " + result.getHouseId());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

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
