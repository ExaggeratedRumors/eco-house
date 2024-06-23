package com.example.ecohouse2.dto;

import com.example.ecohouse2.Interval;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalTime;

@Getter
@Setter
public class IntervalRequest implements Serializable {
    private String timeStart;
    private String timeEnd;
    private Long deviceId;

    public Interval toInterval(){
        int startHour = Integer.parseInt(timeStart.split(":")[0]);
        int startMinute = Integer.parseInt(timeStart.split(":")[1]);
        int endHour = Integer.parseInt(timeEnd.split(":")[0]);
        int endMinute = Integer.parseInt(timeEnd.split(":")[1]);

        Interval interval = new Interval();
        interval.setId(deviceId);
        interval.setTimeStart(LocalTime.of(startHour, startMinute));
        interval.setTimeEnd(LocalTime.of(endHour, endMinute));
        return interval;
    }
}