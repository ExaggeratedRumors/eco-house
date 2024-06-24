package com.example.ecohouse2.repositories;

import com.example.ecohouse2.Interval;
import com.example.ecohouse2.Owner;
import com.example.ecohouse2.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IntervalRepository extends JpaRepository<Interval, Long> {
    @Query("SELECT i FROM Interval i WHERE i.device.id = :deviceId")
    List<Interval> getDeviceIntervals(@Param("deviceId") Long deviceId);
}
