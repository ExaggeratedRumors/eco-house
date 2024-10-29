package com.example.ecohouse2.repositories;


import com.example.ecohouse2.Generator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Repository of Generator entities.
 * Contains methods for finding students directly in the database.
 */
public interface GeneratorRepository extends JpaRepository<Generator, Long> {
    @Query("SELECT CASE WHEN COUNT(g) > 0 THEN true ELSE false END FROM Generator g WHERE g.name = :name AND g.house.house_id = :house_id")
    boolean doesGeneratorExist(@Param("name") String name, @Param("house_id") Long houseId);
}
