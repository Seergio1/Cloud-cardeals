package com.example.ventevoiture01.Controllers;

import com.example.ventevoiture01.Models.Modele;
import com.example.ventevoiture01.Services.ModeleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping
public class ModeleController {

    @Autowired
    private ModeleService modeleService;

    @GetMapping("/modeles")
    public List<Modele> getAllModeles() {
        return modeleService.getAllModeles();
    }

    @GetMapping("/modele/{id}")
    public ResponseEntity<Modele> getModeleById(@PathVariable int id) {
        Optional<Modele> modele = modeleService.getModeleById(id);
        return modele.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/modele/create")
    public ResponseEntity<Modele> createModele(@RequestBody Modele modele) {
        Modele createdModele = modeleService.createModele(modele);
        return new ResponseEntity<>(createdModele, HttpStatus.CREATED);
    }

    @PutMapping("/modele/update/{id}")
    public ResponseEntity<Modele> updateModele(@PathVariable int id, @RequestBody Modele modele) {
        Modele updatedModele = modeleService.updateModele(id, modele);
        return updatedModele != null ? new ResponseEntity<>(updatedModele, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/modele/delete/{id}")
    public ResponseEntity<Void> deleteModele(@PathVariable int id) {
        modeleService.deleteModele(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
