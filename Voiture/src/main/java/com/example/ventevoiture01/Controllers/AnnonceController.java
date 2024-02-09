package com.example.ventevoiture01.Controllers;

import com.example.ventevoiture01.Models.Annonce;
import com.example.ventevoiture01.Models.Annonce_Favoris;
import com.example.ventevoiture01.Models.Employer;
import com.example.ventevoiture01.Models.MeilleureAnnonce;
import com.example.ventevoiture01.Repository.*;
import com.example.ventevoiture01.Services.AnnonceService;
import com.example.ventevoiture01.Services.EmployerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping
public class AnnonceController {

    @Autowired
    private AnnonceService annonceService;

    @GetMapping("/annonces")
    public List<Annonce> getAllAnnonces() {
        return annonceService.getAllAnnonces();
    }

    @GetMapping("/annonce/{id}")
    public ResponseEntity<Annonce> getAnnonceById(@PathVariable int id) {
        Optional<Annonce> annonce = annonceService.getAnnonceById(id);
        return annonce.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/annonce/create")
    public ResponseEntity<Annonce> createAnnonce(@RequestBody Annonce annonce) {
        Annonce createdAnnonce = annonceService.createAnnonce(annonce);
        return new ResponseEntity<>(createdAnnonce, HttpStatus.CREATED);
    }

    @PutMapping("/annonce/update/{id}")
    public ResponseEntity<Annonce> updateAnnonce(@PathVariable int id, @RequestBody Annonce annonce) {
        Annonce updatedAnnonce = annonceService.updateAnnonce(id, annonce);
        return updatedAnnonce != null ? new ResponseEntity<>(updatedAnnonce, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/annonce/delete/{id}")
    public ResponseEntity<Void> deleteAnnonce(@PathVariable int id) {
        annonceService.deleteAnnonce(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/annonce/valider/{id}")
    public ResponseEntity<Annonce> valider(@PathVariable int id){
        annonceService.valider(id);
        Optional<Annonce> annonce = annonceService.getAnnonceById(id);
       return annonce.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @Autowired
    private EmployerService employerService;

    @GetMapping("/annonce/utilisateur/{utilisateurId}")
    public ResponseEntity<List<Annonce>> getAnnoncesByUtilisateur(@PathVariable long utilisateurId) {
        Optional<Employer> employer = employerService.getEmployerById(utilisateurId);

        if (employer.isPresent()) {
            List<Annonce> annonces = annonceService.getAnnonceByUtilisateur(employer.get());
            return new ResponseEntity<>(annonces, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/annonce/favoris/utilisateur/{utilisateurId}")
    public ResponseEntity<List<Annonce>> getAnnonceFavorisByUtilisateur(@PathVariable long utilisateurId) {
        Optional<Employer> utilisateur = employerService.getEmployerById(utilisateurId);

        if (utilisateur.isPresent()) {
            List<Annonce> annoncesFavoris = annonceService.getAnnonceFavorisByUtilisateur(utilisateur.get());
            return new ResponseEntity<>(annoncesFavoris, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @Autowired
    EmployerRepository employeeRepository;
    
    @PostMapping("annonce/favoris/create")
    public void insertAnnonceFavorisByUtilisateur(@RequestBody Annonce_Favoris annonce ) {
        try {
            Annonce_Favoris createdAnnonce = annonceService.createAnnonceFavoris(annonce);
        } catch (Exception e) {
            new Exception("insert failed: " + e.getMessage());
        }

    }

    @GetMapping("/annonce/meilleure")
    public List<MeilleureAnnonce> countFavorisByAnnonce() {
        return annonceService.countFavorisByAnnonce();
    }

    @PutMapping("/annonce/update/status/{id}")
    public ResponseEntity<Annonce> updateStatusVoiture(@PathVariable int id, @RequestBody Annonce annonce) {
        Annonce updatedAnnonce = annonceService.updateStatusVoiture(id, annonce.getStatus_voiture());
        return updatedAnnonce != null ? new ResponseEntity<>(updatedAnnonce, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/annonce/status/{status}")
    public ResponseEntity<List<Annonce>> getAnnoncesByStatus(@PathVariable String status) {
        List<Annonce> annonces = annonceService.getAnnonceByStatus(status);
        return new ResponseEntity<>(annonces, HttpStatus.OK);
    }

    @GetMapping("/annonce/etat/{etat}")
    public ResponseEntity<List<Annonce>> getAnnoncesByEtat(@PathVariable String etat) {
        List<Annonce> annonces = annonceService.getAnnonceByEtat(etat);
        return new ResponseEntity<>(annonces, HttpStatus.OK);
    }

    @GetMapping("/annonce/getVoitureVenduByModele")
    public ResponseEntity<ArrayList> getAnnoncesByModele() {
        ArrayList annonces = annonceService.getVoitureVendusByModele();
        return new ResponseEntity<>(annonces, HttpStatus.OK);
    }
}
