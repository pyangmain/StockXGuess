package com.example.demo.sneaker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/sneaker")
@CrossOrigin
public class SneakerController {
    private final SneakerService sneakerService;

    @Autowired
    public SneakerController(SneakerService sneakerService) {
        this.sneakerService = sneakerService;
    }

    @GetMapping("/findall")
    public List<Sneaker> getSneakers() {
        return sneakerService.getSneakers();
    }

    @GetMapping("/getTopTen")
    public List<Sneaker> getTopTen() {
        return sneakerService.getTopTen();
    }
}
