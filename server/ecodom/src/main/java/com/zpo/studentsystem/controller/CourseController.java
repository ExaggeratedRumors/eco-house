package com.zpo.studentsystem.controller;

import com.zpo.studentsystem.config.Utils;
import com.zpo.studentsystem.model.*;
import com.zpo.studentsystem.service.*;
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
public class CourseController {
    @Autowired
    HouseService houseService;

    @Autowired
    GeneratorService generatorService;

    @Autowired
    DeviceService deviceService;

    @RequestMapping("/courses")
    public String getCourses(Model model) {
        List<House> houses = houseService.getHouses();
        model.addAttribute("courses", houses);
        return "houses.html";
    }

    @PostMapping("/courses/add/{name}")
    public ResponseEntity<House> addCourse(@PathVariable String name) {
        if(Utils.DEBUG) System.out.println("Adding course \"" + name+"\"");
        House result = houseService.addHouse(name);
        if(result == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        if(Utils.DEBUG) System.out.println("House added with id " + result.getHouseId());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping("/courses/delete/{id}")
    public ResponseEntity<Long> deleteCourse(@PathVariable Long id) {
        if(Utils.DEBUG) System.out.println("Deleting course with id " + id);
        Boolean result = houseService.deleteHouse(id);
        if(!result) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        if(Utils.DEBUG) System.out.println("House deleted");
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @PostMapping("/courses/grades/add/{deviceName}")
    public ResponseEntity<Long> addGrade(@PathVariable String deviceName) {
         if(Utils.DEBUG) System.out.println("Adding device " + deviceName);
         Device result = deviceService.addDevice(deviceName);
         if(result == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
         if(Utils.DEBUG) System.out.println("Device added");
         return new ResponseEntity<>(HttpStatus.OK);
    }

}
