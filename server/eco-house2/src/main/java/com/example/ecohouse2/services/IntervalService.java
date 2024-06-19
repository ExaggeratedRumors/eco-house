package com.example.ecohouse2.services;

import com.example.ecohouse2.*;
import com.example.ecohouse2.dto.DeviceRequest;
import com.example.ecohouse2.dto.HouseRequest;
import com.example.ecohouse2.dto.IntervalRequest;
import com.example.ecohouse2.repositories.DeviceRepository;
import com.example.ecohouse2.repositories.IntervalRepository;
import com.example.ecohouse2.repositories.RoomRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class IntervalService {

    @Autowired
    private DeviceRepository deviceRepo;

    @Autowired
    private IntervalRepository intervalRepo;


    public Interval addInterval(IntervalRequest intervalRequest) {
        Device device = deviceRepo.findById(intervalRequest.getDeviceId()).orElseThrow(
                () -> new EntityNotFoundException("device not found with id " + intervalRequest.getDeviceId()));
        Interval newInterval = intervalRequest.toInterval();
        newInterval.setDevice(device);
        System.out.println("Attempt to add interval to device: " + device.getId() + " " + device.getName());
        return intervalRepo.save(newInterval);
    }


    public Interval getInterval(Long index) {
        return intervalRepo.findById(index).orElseThrow(
                () -> new EntityNotFoundException("Interval not found with id " + index)
        );
    }
}