package com.example.ventevoiture01.Controllers;

import com.example.ventevoiture01.Models.Couleur;
import com.example.ventevoiture01.Services.CouleurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping
public class CouleurController {

    @Autowired
    private CouleurService couleurService;

    @GetMapping("/couleurs")
    public List<Couleur> getAllCouleurs() {
        return couleurService.getAllCouleurs();
    }

    @GetMapping("/couleur/{id}")
    public ResponseEntity<Couleur> getCouleurById(@PathVariable int id) {
        Optional<Couleur> Couleur = couleurService.getCouleurById(id);
        return Couleur.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/couleur/create")
    public ResponseEntity<Couleur> createCouleur(@RequestBody Couleur Couleur) {
        Couleur createdCouleur = couleurService.createCouleur(Couleur);
        return new ResponseEntity<>(createdCouleur, HttpStatus.CREATED);
    }

    @PutMapping("/couleur/update/{id}")
    public ResponseEntity<Couleur> updateCouleur(@PathVariable int id, @RequestBody Couleur Couleur) {
        Couleur updatedCouleur = couleurService.updateCouleur(id, Couleur);
        return updatedCouleur != null ? new ResponseEntity<>(updatedCouleur, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/couleur/delete/{id}")
    public ResponseEntity<Void> deleteCouleur(@PathVariable int id) {
        couleurService.deleteCouleur(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}