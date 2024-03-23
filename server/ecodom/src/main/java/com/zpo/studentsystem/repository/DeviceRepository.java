package com.zpo.studentsystem.repository;

import com.zpo.studentsystem.model.Device;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository of Device entities.
 * Contains methods for finding and updating grades directly in the database.
 */
public interface DeviceRepository extends JpaRepository<Device, Long> {
}
