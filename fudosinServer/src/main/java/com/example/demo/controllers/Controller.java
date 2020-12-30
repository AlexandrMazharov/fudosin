package com.example.demo.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
    @GetMapping("/main")
    public ResponseEntity<String> main() {
        return ResponseEntity.ok("fudosin start");
    }

}
