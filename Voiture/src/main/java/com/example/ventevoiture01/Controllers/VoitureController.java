package com.example.ventevoiture01.Controllers;

import com.example.ventevoiture01.Models.*;
import com.example.ventevoiture01.Services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping
public class VoitureController {

    @Autowired
    private VoitureService voitureService;

    @GetMapping("/voitures")
    public List<Voiture> getAllVoitures() {
        return voitureService.getAllVoitures();
    }

    @GetMapping("/voiture/{id}")
    public ResponseEntity<Voiture> getVoitureById(@PathVariable int id) {
        Optional<Voiture> voiture = voitureService.getVoitureById(id);
        return voiture.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/voiture/create")
    public ResponseEntity<Voiture> createVoiture(@RequestBody Voiture voiture) {
        Voiture createdVoiture = voitureService.createVoiture(voiture);
        return new ResponseEntity<>(createdVoiture, HttpStatus.CREATED);
    }

    @PutMapping("/voiture/update/{id}")
    public ResponseEntity<Voiture> updateVoiture(@PathVariable int id, @RequestBody Voiture voiture) {
        Voiture updatedVoiture = voitureService.updateVoiture(id, voiture);
        return updatedVoiture != null ? new ResponseEntity<>(updatedVoiture, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/voiture/delete/{id}")
    public ResponseEntity<Void> deleteVoiture(@PathVariable int id) {
        voitureService.deleteVoiture(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Autowired
    private ModeleService modeleService;

    @GetMapping("/voiture/modele/{modeleId}")
    public ResponseEntity<List<Voiture>> getVoituresByModele(@PathVariable int modeleId) {
        Optional<Modele> modele = modeleService.getModeleById(modeleId);

        if (modele.isPresent()) {
            List<Voiture> voitures = voitureService.getVoitureByModele(modele.get());
            return new ResponseEntity<>(voitures, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Autowired
    private CategorieService categorieService;

    @GetMapping("/voiture/categorie/{categorieId}")
    public ResponseEntity<List<Voiture>> getVoituresByCategorie(@PathVariable int categorieId) {
        Optional<Categorie> categorie = categorieService.getCategorieById(categorieId);

        if (categorie.isPresent()) {
            List<Voiture> voitures = voitureService.getVoitureByCategorie(categorie.get());
            return new ResponseEntity<>(voitures, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Autowired
    private MarqueService marqueService;

    @GetMapping("/voiture/marque/{marqueId}")
    public ResponseEntity<List<Voiture>> getVoituresByMarque(@PathVariable int marqueId) {
        Optional<Marque> marque = marqueService.getMarqueById(marqueId);

        if (marque.isPresent()) {
            List<Voiture> voitures = voitureService.getVoitureByMarque(marque.get());
            return new ResponseEntity<>(voitures, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Autowired
    private EmployerService employerService;

    @GetMapping("/voiture/utilisateur/{utilisateurId}")
    public ResponseEntity<List<Voiture>> getVoituresByUtilisateur(@PathVariable long utilisateurId) {
        Optional<Employer> utilisateur = employerService.getEmployerById(utilisateurId);

        if (utilisateur.isPresent()) {
            List<Voiture> voitures = voitureService.getVoitureByUtilisateur(utilisateur.get());
            return new ResponseEntity<>(voitures, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/voiture/last/utilisateur/{utilisateurId}")
    public ResponseEntity<Voiture> getLastVoitureByUtilisateur(@PathVariable long utilisateurId) {
        Optional<Employer> utilisateur = employerService.getEmployerById(utilisateurId);
        if (utilisateur.isPresent()) {
            List<Voiture> voitures = voitureService.getVoitureByUtilisateur(utilisateur.get());
            return new ResponseEntity<>(voitures.get(voitures.size()-1), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
