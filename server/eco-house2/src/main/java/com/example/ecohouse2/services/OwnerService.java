package com.example.ecohouse2.services;

import com.example.ecohouse2.Owner;
import com.example.ecohouse2.repositories.OwnerRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class OwnerService {

    @Autowired
    private OwnerRepository userRepo;

    public Owner addUser(String name, String email, String password) {
        Owner owner = new Owner();
        owner.setName(name);
        owner.setEmail(email);
        owner.setPassword(password);
        return userRepo.save(owner);
    }

    public List<Owner> getUsers() {
        return userRepo.findAll();
    }

    public Boolean deleteUser(Long index) {
        if(getDevice(index) == null) return false;
        userRepo.deleteById(index);
        return true;
    }


    public Owner getDevice(Long index) {
        return userRepo.findById(index).orElseThrow(
                () -> new EntityNotFoundException("Owner not found with id " + index)
        );
    }
}
