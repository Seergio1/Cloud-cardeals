package com.example.ventevoiture01.Controllers;

import com.example.ventevoiture01.Models.Moteur;
import com.example.ventevoiture01.Services.MoteurService;
import org.springframework.http.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("")
public class MoteurController {
    @Autowired
    private MoteurService moteurService;

    @GetMapping("/moteurs")
    public List<Moteur> getAllMoteurs() {
        return moteurService.getAllMoteurs();
    }

    @GetMapping("/moteur/{id}")
    public ResponseEntity<Moteur> getMoteurById(@PathVariable int id) {
        Optional<Moteur> moteur = moteurService.getMoteurById(id);
        return moteur.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/moteur/create")
    public ResponseEntity<Moteur> createMoteur(@RequestBody Moteur moteur) {
        Moteur createdMoteur = moteurService.createMoteur(moteur);
        return new ResponseEntity<>(createdMoteur, HttpStatus.CREATED);
    }

    @PutMapping("/moteur/update/{id}")
    public ResponseEntity<Moteur> updateMoteur(@PathVariable int id, @RequestBody Moteur moteur) {
        Moteur updatedMoteur = moteurService.updateMoteur(id, moteur);
        return updatedMoteur != null ? new ResponseEntity<>(updatedMoteur, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/moteur/delete/{id}")
    public ResponseEntity<Void> deleteMoteur(@PathVariable int id) {
        moteurService.deleteMoteur(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
