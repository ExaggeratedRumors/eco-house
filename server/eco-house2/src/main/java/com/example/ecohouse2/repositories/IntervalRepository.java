package com.example.ecohouse2.repositories;

import com.example.ecohouse2.Interval;
import com.example.ecohouse2.Owner;
import com.example.ecohouse2.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IntervalRepository extends JpaRepository<Interval, Long> {
}
