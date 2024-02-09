package com.example.ventevoiture01.Controllers;

import com.example.ventevoiture01.Models.Marque;
import com.example.ventevoiture01.Services.MarqueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping
public class MarqueController {

    @Autowired
    private MarqueService marqueService;

    @GetMapping("/marques")
    public List<Marque> getAllMarques() {
        return marqueService.getAllMarques();
    }

    @GetMapping("/marque/{id}")
    public ResponseEntity<Marque> getMarqueById(@PathVariable int id) {
        Optional<Marque> marque = marqueService.getMarqueById(id);
        return marque.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/marque/create")
    public ResponseEntity<Marque> createMarque(@RequestBody Marque marque) {
        Marque createdMarque = marqueService.createMarque(marque);
        return new ResponseEntity<>(createdMarque, HttpStatus.CREATED);
    }

    @PutMapping("/marque/update/{id}")
    public ResponseEntity<Marque> updateMarque(@PathVariable int id, @RequestBody Marque marque) {
        Marque updatedMarque = marqueService.updateMarque(id, marque);
        return updatedMarque != null ? new ResponseEntity<>(updatedMarque, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/marque/delete/{id}")
    public ResponseEntity<Void> deleteMarque(@PathVariable int id) {
        marqueService.deleteMarque(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
