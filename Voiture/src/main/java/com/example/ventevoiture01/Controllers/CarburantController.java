package com.example.ventevoiture01.Controllers;

import com.example.ventevoiture01.Models.Carburant;
import com.example.ventevoiture01.Services.CarburantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping
public class CarburantController {

    @Autowired
    private CarburantService carburantService;

    @GetMapping("/carburants")
    public List<Carburant> getAllCarburants() {
        return carburantService.getAllCarburants();
    }

    @GetMapping("/carburant/{id}")
    public ResponseEntity<Carburant> getCarburantById(@PathVariable int id) {
        Optional<Carburant> carburant = carburantService.getCarburantById(id);
        return carburant.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/carburant/create")
    public ResponseEntity<Carburant> createCarburant(@RequestBody Carburant carburant) {
        Carburant createdCarburant = carburantService.createCarburant(carburant);
        return new ResponseEntity<>(createdCarburant, HttpStatus.CREATED);
    }

    @PutMapping("/carburant/update/{id}")
    public ResponseEntity<Carburant> updateCarburant(@PathVariable int id, @RequestBody Carburant carburant) {
        Carburant updatedCarburant = carburantService.updateCarburant(id, carburant);
        return updatedCarburant != null ? new ResponseEntity<>(updatedCarburant, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/carburant/delete/{id}")
    public ResponseEntity<Void> deleteCarburant(@PathVariable int id) {
        carburantService.deleteCarburant(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
