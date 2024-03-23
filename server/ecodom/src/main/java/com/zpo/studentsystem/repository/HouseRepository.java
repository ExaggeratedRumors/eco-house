package com.zpo.studentsystem.repository;

import com.zpo.studentsystem.model.House;
import org.springframework.data.jpa.repository.JpaRepository;


/**
 * Repository of House entities.
 */
public interface HouseRepository extends JpaRepository<House, Long> {
}
