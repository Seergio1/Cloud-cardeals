package com.example.ventevoiture01.Controllers;

import com.example.ventevoiture01.Models.Boite_de_Vitesse;
import com.example.ventevoiture01.Services.Boite_de_vitesseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping
public class Boite_de_vitesseController {

    @Autowired
    private Boite_de_vitesseService boite_de_vitesseService;

    @GetMapping("/boites_de_vitesses")
    public List<Boite_de_Vitesse> getAllBoiteDeVitesse() {
        return boite_de_vitesseService.getAllBoite_de_Vitesses();
    }

    @GetMapping("/boite_de_vitesse/{id}")
    public ResponseEntity<Boite_de_Vitesse> getBoiteDeVitesseById(@PathVariable int id) {
        Optional<Boite_de_Vitesse> boite_de_vitesse = boite_de_vitesseService.getBoite_de_VitesseById(id);
        return boite_de_vitesse.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/boite_de_vitesse/create")
    public ResponseEntity<Boite_de_Vitesse> createBoiteDeVitesse(@RequestBody Boite_de_Vitesse boite_de_Vitesse) {
        Boite_de_Vitesse createdBoite = boite_de_vitesseService.createBoite_de_Vitesse(boite_de_Vitesse);
        return new ResponseEntity<>(createdBoite, HttpStatus.CREATED);
    }

    @PutMapping("/boite_de_vitesse/update/{id}")
    public ResponseEntity<Boite_de_Vitesse> updateBoiteDeVitesse(@PathVariable int id,
            @RequestBody Boite_de_Vitesse boite_de_Vitesse) {
        Boite_de_Vitesse updatedBoite = boite_de_vitesseService.updateBoite_de_Vitesse(id, boite_de_Vitesse);
        return updatedBoite != null ? new ResponseEntity<>(updatedBoite, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/boite_de_vitesse/delete/{id}")
    public ResponseEntity<Void> deleteBoite(@PathVariable int id) {
        boite_de_vitesseService.deleteBoiteDeVitesse(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
