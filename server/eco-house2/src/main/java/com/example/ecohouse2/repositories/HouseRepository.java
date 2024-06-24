package com.example.ecohouse2.repositories;


import com.example.ecohouse2.House;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


/**
 * Repository of House entities.
 */
public interface HouseRepository extends JpaRepository<House, Long> {
    @Query("SELECT CASE WHEN COUNT(h) > 0 THEN true ELSE false END FROM House h WHERE h.name = :name AND h.owner.owner_id = :owner_id")
    boolean doesHouseExist(@Param("name") String name, @Param("owner_id") Long ownerId);
}
