package com.example.ecohouse2.dto;

import com.example.ecohouse2.Device;
import com.example.ecohouse2.Interval;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalTime;

@Getter
@Setter
public class IntervalRequest implements Serializable {
    private LocalTime timeStart;
    private LocalTime timeEnd;
    private Long deviceId;

    public Interval toInterval(){
        Interval interval = new Interval();
        interval.setTimeStart(this.timeStart);
        interval.setTimeEnd(this.timeEnd);
        return interval;
    }
}