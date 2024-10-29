package com.example.ecohouse2.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/register", "/api/login").permitAll()
                        .requestMatchers("/owners/**").permitAll()
                        .requestMatchers("/owners/add/**", "/houses/add/**", "/devices/add/**", "/generators/add/**", "/rooms/add/**", "/intervals/add/**").permitAll()
                        .requestMatchers("/owners/update/**", "/houses/update/**", "/devices/update/**", "/generators/update/**", "/rooms/update/**", "/intervals/update/**").permitAll()
                        .requestMatchers("/owners/remove/**", "/houses/remove/**", "/devices/remove/**", "/generators/remove/**", "/rooms/remove/**", "/intervals/remove/**").permitAll()
                        .requestMatchers("/dailyCost/**", "/dailyCostsGraph/**", "/dailyPowerGraph/**", "/dailyEnergyProduced/**").permitAll()
                        .anyRequest().authenticated()
                );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}