package com.example.ecohouse2.controllers;

import com.example.ecohouse2.Owner;
import com.example.ecohouse2.authentication.JwtUtil;
import com.example.ecohouse2.repositories.OwnerRepository;
import com.example.ecohouse2.services.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private OwnerService ownerService;

    @Autowired
    private OwnerRepository ownerRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Owner owner) {
        owner.setPassword(passwordEncoder.encode(owner.getPassword()));
        ownerService.addOwner(owner);
        return ResponseEntity.ok(owner);
    }

    @PostMapping("/login")
    public String login() {
        // Spring Security will handle the login automatically
        return "Login successful";
    }
}