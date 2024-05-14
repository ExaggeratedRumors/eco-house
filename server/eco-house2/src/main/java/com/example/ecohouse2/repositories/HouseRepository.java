package com.example.ecohouse2.repositories;


import com.example.ecohouse2.House;
import org.springframework.data.jpa.repository.JpaRepository;


/**
 * Repository of House entities.
 */
public interface HouseRepository extends JpaRepository<House, Long> {
}
