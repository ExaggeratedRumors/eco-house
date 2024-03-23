package com.zpo.studentsystem.service;

import com.zpo.studentsystem.model.House;
import com.zpo.studentsystem.repository.HouseRepository;
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


    public List<House> getHouses() {
        return houseRepo.findAll();
    }


    public House addHouse(String name) {
        House house = new House();
        house.setName(name);
        return houseRepo.save(house);
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
}
