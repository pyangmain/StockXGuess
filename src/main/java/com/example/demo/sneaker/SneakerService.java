package com.example.demo.sneaker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
@Service
public class SneakerService {

    private final SneakerRepository sneakerRepository;

    @Autowired
    public SneakerService(SneakerRepository sneakerRepository) {
        this.sneakerRepository = sneakerRepository;
    }
    @GetMapping
    public List<Sneaker> getSneakers() {
        return sneakerRepository.findAll();
    }

    @GetMapping
    public List<Sneaker> getTopTen() {
        int db_size = (int) sneakerRepository.count();
        Integer[] totalIds = new Integer[db_size];
        for (int i = 0; i < db_size; i++) {
            totalIds[i] = i + 1;
        }
        Collections.shuffle(Arrays.asList(totalIds));
        List<Long> returnedIds = new ArrayList<Long>(10);
        for (int i = 0; i < 10; i++) {
            returnedIds.add(i, Long.valueOf(totalIds[i]));
        }
        return sneakerRepository.findAllById(returnedIds);
    }
}
