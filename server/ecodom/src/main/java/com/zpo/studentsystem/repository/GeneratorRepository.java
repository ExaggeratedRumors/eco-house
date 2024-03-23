package com.zpo.studentsystem.repository;

import com.zpo.studentsystem.model.Generator;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository of Generator entities.
 * Contains methods for finding students directly in the database.
 */
public interface GeneratorRepository extends JpaRepository<Generator, Long> {
}
