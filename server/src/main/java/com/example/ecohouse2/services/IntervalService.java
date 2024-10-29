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
        Device device = deviceRepo.findById(intervalRequest.getId()).orElseThrow(
                () -> new EntityNotFoundException("device not found with id " + intervalRequest.getId()));
        Interval newInterval = intervalRequest.toInterval();
        newInterval.setDevice(device);
        System.out.println("Attempt to add interval to device: " + device.getId() + " " + device.getName());
        return intervalRepo.save(newInterval);
    }

    public Boolean deleteInterval(Long id) {
        if(getInterval(id) == null) return false;
        intervalRepo.deleteById(id);
        return true;
    }


    public Interval getInterval(Long index) {
        return intervalRepo.findById(index).orElseThrow(
                () -> new EntityNotFoundException("Interval not found with id " + index)
        );
    }

    public boolean doesIntervalOverlap(IntervalRequest intervalRequest) {
        List<Interval> intervals = intervalRepo.getDeviceIntervals(intervalRequest.getId());
        for(Interval interval : intervals) {
            if(intervalRequest.getTimeStart().isBefore(interval.getTimeEnd()) && intervalRequest.getTimeEnd().isAfter(interval.getTimeStart())) {
                return true;
            }
        }
        return false;
    }

    public boolean isIntervalInvalid(IntervalRequest intervalRequest) {
        return intervalRequest.getTimeStart().isAfter(intervalRequest.getTimeEnd());
    }

    public Interval updateInterval(IntervalRequest intervalRequest) {
        Interval interval = getInterval(intervalRequest.getId());
        if (interval == null) return null;
        interval.setTimeStart(intervalRequest.getTimeStart());
        interval.setTimeEnd(intervalRequest.getTimeEnd());
        return intervalRepo.save(interval);
    }
}
