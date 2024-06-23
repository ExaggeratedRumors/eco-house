package com.example.ecohouse2.controllers;

import com.example.ecohouse2.Owner;
import com.example.ecohouse2.authentication.JwtAuthenticationResponse;
import com.example.ecohouse2.authentication.JwtTokenProvider;
import com.example.ecohouse2.dto.LoginRequest;
import com.example.ecohouse2.dto.OwnerRequest;
import com.example.ecohouse2.repositories.OwnerRepository;
import com.example.ecohouse2.services.OwnerService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private OwnerService ownerService;

/*    @Autowired
    private PasswordEncoder passwordEncoder;*/

    @Autowired
    private JwtTokenProvider tokenProvider;
    @CrossOrigin
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody OwnerRequest owner) {
        if(ownerService.findOwnerByEmail(owner.getEmail()) != null) {
            return ResponseEntity
                    .badRequest()
                    .body("Email address already in use.");
        }
        ownerService.addOwner(owner.toOwner());
        return ResponseEntity.ok("User registered successfully");
    }

    @CrossOrigin
    @PostMapping("/login")
    public JwtAuthenticationResponse login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        Owner owner = ownerService.findOwnerByEmail(loginRequest.getEmail());
        if (owner != null && owner.getPassword().equals(loginRequest.getPassword())) {
            Authentication authentication = new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword());
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = tokenProvider.createToken(loginRequest.getEmail());
            response.setHeader("Authorization", "Bearer " + token);
            return new JwtAuthenticationResponse(token, owner.getOwner_id());
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return null;
        }
    }

    @CrossOrigin
    @PostMapping("/api/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        new SecurityContextLogoutHandler().logout(request, response, SecurityContextHolder.getContext().getAuthentication());
    }
}