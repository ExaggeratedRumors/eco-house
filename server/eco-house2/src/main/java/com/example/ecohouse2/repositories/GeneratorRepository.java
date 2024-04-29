package com.example.ecohouse2.repositories;


import com.example.ecohouse2.Generator;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository of Generator entities.
 * Contains methods for finding students directly in the database.
 */
public interface GeneratorRepository extends JpaRepository<Generator, Long> {
}
