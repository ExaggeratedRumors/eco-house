package com.example.ecohouse2.services;


import com.example.ecohouse2.Device;
import com.example.ecohouse2.Generator;
import com.example.ecohouse2.House;
import com.example.ecohouse2.Room;
import com.example.ecohouse2.dto.DeviceRequest;
import com.example.ecohouse2.dto.GeneratorRequest;
import com.example.ecohouse2.dto.RoomRequest;
import com.example.ecohouse2.repositories.GeneratorRepository;
import com.example.ecohouse2.repositories.HouseRepository;
import com.example.ecohouse2.repositories.RoomRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Service class for the Generator entity.
 * Contains methods for adding, deleting and getting students.
 */
@Service
@Transactional
public class GeneratorService {

    @Autowired
    private GeneratorRepository generatorRepo;

    @Autowired
    private HouseRepository houseRepository;

    public List<Generator> getGenerators() {
        return generatorRepo.findAll();
    }

    public Generator addGenerator(GeneratorRequest generatorRequest) {
        House house = houseRepository.findById(generatorRequest.getHouseId()).orElseThrow(
                () -> new EntityNotFoundException("House not found with id " + generatorRequest.getHouseId()));
        Generator newGenerator = generatorRequest.toGenerator();
        newGenerator.setHouse(house);
        System.out.println("Attempt to add generator to house: " + house.getHouse_id() + " " + house.getName());
        return generatorRepo.save(newGenerator);
    }

    public boolean doesGeneratorExist(GeneratorRequest generatorRequest) {
        String name = generatorRequest.getName();
        Long houseID = generatorRequest.getHouseId();
        return generatorRepo.doesGeneratorExist(name, houseID);
    }

    public Boolean deleteGenerator(Long index) {
        if(getGenerator(index) == null) return false;
        generatorRepo.deleteById(index);
        return true;
    }

    public Generator getGenerator(Long index) {
        return generatorRepo.findById(index).orElseThrow(
                () -> new EntityNotFoundException("Generator not found with id " + index)
        );
    }
}
