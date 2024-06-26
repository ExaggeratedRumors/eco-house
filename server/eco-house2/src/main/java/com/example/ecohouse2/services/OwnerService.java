package com.example.ecohouse2.services;

import com.example.ecohouse2.Owner;
import com.example.ecohouse2.dto.OwnerRequest;
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
/*
    @Autowired
    private PasswordEncoder passwordEncoder;*/

    public Owner addOwner(Owner owner) {
        return userRepo.save(owner);
    }

    public List<Owner> getUsers() {
        return userRepo.findAll();
    }

    public Boolean deleteOwner(Long index) {
        if(getOwner(index) == null) return false;
        userRepo.deleteById(index);
        return true;
    }

    public Owner findOwnerByEmail(String email) {
        return userRepo.findByEmail(email);
    }

/*    public boolean checkPassword(Owner owner, String rawPassword) {
        return passwordEncoder.matches(rawPassword, owner.getPassword());
    }*/

    public Owner getOwner(Long index) {
        return userRepo.findById(index).orElseThrow(
                () -> new EntityNotFoundException("Owner not found with id " + index)
        );
    }

    public Owner updateOwner(OwnerRequest ownerRequest) {
        return null;
//        Owner owner = getOwner(ownerRequest.getId());
//        owner.setName(ownerRequest.getName());
//        owner.setEmail(ownerRequest.getEmail());
//        owner.setPassword(ownerRequest.getPassword());
//        return userRepo.save(owner);
    }
}
