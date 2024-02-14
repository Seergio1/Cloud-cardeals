package com.example.ventevoiture01.Controllers;

import com.example.ventevoiture01.Models.Caracteristique;
import com.example.ventevoiture01.Models.Voiture;
import com.example.ventevoiture01.Services.CaracteristiqueService;
import com.example.ventevoiture01.Services.VoitureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("unauthenticated")
public class CaracteristiqueControllerAll {

    @Autowired
    private CaracteristiqueService caracteristiqueService;

    @GetMapping("/caracteristiques")
    public List<Caracteristique> getAllCaracteristiques() {
        return caracteristiqueService.getAllCaracteristiques();
    }

    @GetMapping("/caracteristique/{id}")
    public ResponseEntity<Caracteristique> getCaracteristiqueById(@PathVariable int id) {
        Optional<Caracteristique> caracteristique = caracteristiqueService.getCaracteristiqueById(id);
        return caracteristique.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/caracteristique/create")
    public ResponseEntity<Caracteristique> createCaracteristique(@RequestBody Caracteristique caracteristique) {
        Caracteristique createdCaracteristique = caracteristiqueService.createCaracteristique(caracteristique);
        return new ResponseEntity<>(createdCaracteristique, HttpStatus.CREATED);
    }

    @PutMapping("/caracteristique/update/{id}")
    public ResponseEntity<Caracteristique> updateCaracteristique(@PathVariable int id,
                                                                 @RequestBody Caracteristique caracteristique) {
        Caracteristique updatedCaracteristique = caracteristiqueService.updateCaracteristique(id, caracteristique);
        return updatedCaracteristique != null ? new ResponseEntity<>(updatedCaracteristique, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/caracteristique/delete/{id}")
    public ResponseEntity<Void> deleteCaracteristique(@PathVariable int id) {
        caracteristiqueService.deleteCaracteristique(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Autowired
    private VoitureService voitureService;

    @GetMapping("/caracteristique/voiture/{voitureId}")
    public ResponseEntity<Caracteristique> getCaracteristiqueByVoiture(@PathVariable int voitureId) {
        Optional<Voiture> voiture = voitureService.getVoitureById(voitureId);

        if (voiture.isPresent()) {
            Caracteristique caracteristique = caracteristiqueService.getCaracteristiqueByVoiture(voiture.get());
            return new ResponseEntity<>(caracteristique, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
