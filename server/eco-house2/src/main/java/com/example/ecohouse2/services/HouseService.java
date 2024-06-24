package com.example.ecohouse2.services;

import com.example.ecohouse2.House;
import com.example.ecohouse2.Owner;
import com.example.ecohouse2.dto.HouseRequest;
import com.example.ecohouse2.repositories.HouseRepository;
import com.example.ecohouse2.repositories.OwnerRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class for the House entity.
 * Contains methods for adding, deleting and getting courses.
 */
@Service
@Transactional
public class HouseService {

    @Autowired
    private HouseRepository houseRepo;

    @Autowired
    private OwnerRepository ownerRepo;

    public List<House> getHouses() {
        return houseRepo.findAll();
    }


    public House addHouse(HouseRequest houseRequest) {
        Owner houseOwner = ownerRepo.findById((long)houseRequest.getOwnerId()).orElseThrow(
                () -> new EntityNotFoundException("Owner not found with id " + houseRequest.getOwnerId()));
        House newHouse = houseRequest.toHouse();
        newHouse.setOwner(houseOwner);
        System.out.println("Attempt to add house with owner: " + houseOwner.getOwner_id() + " " + houseOwner.getName());
        return houseRepo.save(newHouse);
    }


    public Boolean deleteHouse(Long id) {
        if(getHouse(id) == null) return false;
        houseRepo.deleteById(id);
        return true;
    }


    public House getHouse(Long houseID) {
        return houseRepo.findById(houseID).orElseThrow(
                () -> new EntityNotFoundException("House not found with id " + houseID)
        );
    }

    public boolean doesHouseExist(HouseRequest houseRequest) {
        String name = houseRequest.getName();
        int ownerId = houseRequest.getOwnerId();
        return houseRepo.doesHouseExist(name, (long)ownerId);
    }
}
