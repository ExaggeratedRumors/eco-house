package com.example.ecohouse2.repositories;

import com.example.ecohouse2.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Repository of Device entities.
 * Contains methods for finding and updating grades directly in the database.
 */
public interface DeviceRepository extends JpaRepository<Device, Long> {
    @Query("SELECT CASE WHEN COUNT(d) > 0 THEN true ELSE false END FROM Device d WHERE d.name = :name AND d.room.id = :room_id")
    boolean doesDeviceExist(@Param("name") String name, @Param("room_id") Long roomId);
}
