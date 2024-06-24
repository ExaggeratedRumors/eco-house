package com.example.ecohouse2.controllers;

import com.example.ecohouse2.House;
import com.example.ecohouse2.Interval;
import com.example.ecohouse2.Owner;
import com.example.ecohouse2.Room;
import com.example.ecohouse2.dto.IntervalRequest;
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
public class IntervalController {
    @Autowired
    DeviceService deviceService;

    @Autowired
    IntervalService intervalService;


    @CrossOrigin
    @PostMapping("/intervals/add")
    public ResponseEntity<Interval> addInterval(@RequestBody IntervalRequest intervalRequest) {
        System.out.println("Adding interval (start at \"" + intervalRequest.getTimeStart() +")\"");
        if (intervalService.doesIntervalOverlap(intervalRequest) || intervalService.isIntervalInvalid(intervalRequest))
            return new ResponseEntity<>(HttpStatus.CONFLICT);

        Interval result = intervalService.addInterval(intervalRequest);
        if(result == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        System.out.println("Interval added with id " + result.getId() + " to device with id " + result.getDevice().getId());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @CrossOrigin
    @DeleteMapping("/intervals/delete/{id}")
    public ResponseEntity<Long> deleteInterval(@PathVariable Long id) {
        System.out.println("Deleting interval with id " + id);
        Boolean result = intervalService.deleteInterval(id);
        if(!result)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        System.out.println("Interval deleted");
        return new ResponseEntity<>(id, HttpStatus.OK);
    }
}
