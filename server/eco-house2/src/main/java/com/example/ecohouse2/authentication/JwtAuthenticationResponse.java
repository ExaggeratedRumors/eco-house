package com.example.ecohouse2.authentication;


import lombok.Data;

@Data
public class JwtAuthenticationResponse {
    private String token;
    private Long id;
    public JwtAuthenticationResponse(String token, Long id) {
        this.token = token;
        this.id = id;
    }
}