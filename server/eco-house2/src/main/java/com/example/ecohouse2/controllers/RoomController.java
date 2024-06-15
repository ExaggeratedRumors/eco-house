package com.example.ecohouse2.controllers;

import com.example.ecohouse2.House;
import com.example.ecohouse2.Owner;
import com.example.ecohouse2.Room;
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
public class RoomController {
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


    @PostMapping("/rooms/add")
    public ResponseEntity<Room> addRoom(@RequestBody RoomRequest roomRequest) {
        System.out.println("Adding room \"" + roomRequest.getName() +"\"");
        Room result = roomService.addRoom(roomRequest);
        if(result == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        System.out.println("Room added with id " + result.getId() + " to house with id " + result.getHouse().getHouse_id());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
