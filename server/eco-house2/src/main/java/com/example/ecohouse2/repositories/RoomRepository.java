package com.example.ecohouse2.repositories;

import com.example.ecohouse2.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RoomRepository extends JpaRepository<Room, Long> {
    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END FROM Room r WHERE r.name = :name AND r.house.house_id = :house_id")
    boolean doesRoomExist(@Param("name") String name, @Param("house_id") Long houseId);
}
