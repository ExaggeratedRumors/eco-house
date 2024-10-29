package com.example.ecohouse2.dto;

import com.example.ecohouse2.House;
import com.example.ecohouse2.Room;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class RoomRequest implements Serializable {
    private String name;
    private Long id;

    public Room toRoom(){
        Room room = new Room();
        room.setName(this.name);
        return room;
    }
}