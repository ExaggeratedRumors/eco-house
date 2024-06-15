package com.example.ecohouse2.services;

import com.example.ecohouse2.House;
import com.example.ecohouse2.Room;
import com.example.ecohouse2.dto.RoomRequest;
import com.example.ecohouse2.repositories.HouseRepository;
import com.example.ecohouse2.repositories.RoomRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@Transactional
public class RoomService {

    @Autowired
    private RoomRepository roomRepo;

    @Autowired
    private HouseRepository houseRepo;

    public Room addRoom(RoomRequest roomRequest) {
        House house = houseRepo.findById(roomRequest.getHouseId()).orElseThrow(
                () -> new EntityNotFoundException("House not found with id " + roomRequest.getHouseId()));
        Room newRoom = roomRequest.toRoom();
        newRoom.setHouse(house);
        System.out.println("Attempt to add room to house: " + house.getHouse_id() + " " + house.getName());
        return roomRepo.save(newRoom);
    }
}
