package com.example.ecohouse2.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class GraphRequest implements Serializable {
    private long houseId;
}