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
        House house = houseRepo.findById(roomRequest.getId()).orElseThrow(
                () -> new EntityNotFoundException("House not found with id " + roomRequest.getId()));
        Room newRoom = roomRequest.toRoom();
        newRoom.setHouse(house);
        System.out.println("Attempt to add room to house: " + house.getHouse_id() + " " + house.getName());
        return roomRepo.save(newRoom);
    }


    public Boolean deleteRoom(Long id) {
        if(getRoom(id) == null) return false;
        roomRepo.deleteById(id);
        return true;
    }


    public Room getRoom(Long houseID) {
        return roomRepo.findById(houseID).orElseThrow(
                () -> new EntityNotFoundException("Room not found with id " + houseID)
        );
    }


    public boolean doesRoomExist(RoomRequest room) {
        String name = room.getName();
        Long houseID = room.getId();
        return roomRepo.doesRoomExist(name, houseID);
    }

    public Room updateRoom(RoomRequest roomRequest) {
        Room room = getRoom(roomRequest.getId());
        if (room == null) return null;
        room.setName(roomRequest.getName());
        return roomRepo.save(room);
    }

}
