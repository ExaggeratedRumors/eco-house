package com.zpo.studentsystem;


import lombok.SneakyThrows;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main application class.
 */
@SpringBootApplication
public class StudentSystemApplication {
    @SneakyThrows
    public static void main(String[] args) {
        SpringApplication.run(StudentSystemApplication.class, args);
    }
}
