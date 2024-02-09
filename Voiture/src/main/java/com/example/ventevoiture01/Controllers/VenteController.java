package com.example.ventevoiture01.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ventevoiture01.Models.Vente;
import com.example.ventevoiture01.Models.Employer;
import com.example.ventevoiture01.Models.MeilleureVente;
import com.example.ventevoiture01.Services.VenteService;
import com.example.ventevoiture01.Services.EmployerService;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping
public class VenteController {

    @Autowired
    private VenteService VenteService;

    @GetMapping("/ventes")
    public List<Vente> getAllVentes() {
        return VenteService.getAllVentes();
    }

    @GetMapping("/vente/{id}")
    public ResponseEntity<Vente> getVenteById(@PathVariable int id) {
        Optional<Vente> Vente = VenteService.getVenteById(id);
        return Vente.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/vente/create")
    public ResponseEntity<Vente> createVente(@RequestBody Vente Vente) {
        Vente createdVente = VenteService.createVente(Vente);
        return new ResponseEntity<>(createdVente, HttpStatus.CREATED);
    }

    @PutMapping("/vente/update/{id}")
    public ResponseEntity<Vente> updateVente(@PathVariable int id, @RequestBody Vente Vente) {
        Vente updatedVente = VenteService.updateVente(id, Vente);
        return updatedVente != null ? new ResponseEntity<>(updatedVente, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/vente/delete/{id}")
    public ResponseEntity<Void> deleteVente(@PathVariable int id) {
        VenteService.deleteVente(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Autowired
    private EmployerService employerService;

    @GetMapping("/vente/utilisateur/{utilisateurId}")
    public ResponseEntity<List<Vente>> getVentesByUtilisateur(@PathVariable long utilisateurId) {
        Optional<Employer> employer = employerService.getEmployerById(utilisateurId);

        if (employer.isPresent()) {
            List<Vente> Ventes = VenteService.getVenteByUtilisateur(employer.get());
            return new ResponseEntity<>(Ventes, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/vente/meilleurvendeur")
    public List<MeilleureVente> countVentesParVendeur() {
        return VenteService.countVentesParVendeur();
    }
}
