package com.example.ventevoiture01.Controllers;

import com.example.ventevoiture01.Models.Annonce;
import com.example.ventevoiture01.Models.Annonce_Favoris;
import com.example.ventevoiture01.Models.Employer;
import com.example.ventevoiture01.Models.MeilleureAnnonce;
import com.example.ventevoiture01.Repository.*;
import com.example.ventevoiture01.Services.AnnonceService;
import com.example.ventevoiture01.Services.CaracteristiqueService;
import com.example.ventevoiture01.Services.EmployerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping
public class AnnonceController {

    @Autowired
    private AnnonceService annonceService;
    @Autowired
    AnnonceJPA annonceJPA;

    @GetMapping("/annonces")
    public List<Annonce> getAllAnnonces() {
        return annonceService.getAllAnnonces();
    }

    @GetMapping("/annonces/{page}/{size}")
    public Page<Annonce> getAnnonce(@PathVariable int page,
                                    @PathVariable int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return annonceJPA.findAll(pageRequest);
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

    @GetMapping("/annonces/{mot}")
    public ArrayList<Annonce> getAnnoncesRecherche(@PathVariable String mot) {
        List<Annonce> annonces = annonceService.getAllAnnonces();
        ArrayList<Annonce> result = new ArrayList<Annonce>();
        for (Annonce annonce : annonces) {
            if (annonce.getVoiture().getCategorie().getNom().toLowerCase().contains(mot)
                    || annonce.getVoiture().getMarque().getNom().toLowerCase().contains(mot)
                    || annonce.getVoiture().getModele().getNom().toLowerCase().contains(mot)) {
                result.add(annonce);
            }
        }
        return result;
    }

    @Autowired
    CaracteristiqueService caracteristique;

    @GetMapping("/annonces/select/{modele}/{categorie}/{marque}/{couleur}/{prixmin}/{prixmax}")
    public ArrayList<Annonce> getAnnoncesSelect(@PathVariable String modele, @PathVariable String categorie,
                                                @PathVariable String marque, @PathVariable int couleur, @PathVariable String prixmin,
                                                @PathVariable String prixmax) {
        List<Annonce> annonces = annonceService.getAllAnnonces();
        ArrayList<Annonce> result = new ArrayList<Annonce>();
        ArrayList<Annonce> result2 = new ArrayList<Annonce>();
        ArrayList<Annonce> result3 = new ArrayList<Annonce>();
        ArrayList<Annonce> result4 = new ArrayList<Annonce>();
        ArrayList<Annonce> result5 = new ArrayList<Annonce>();
        if (modele.compareTo("0") != 0) {
            for (Annonce annonce : annonces) {
                if (annonce.getVoiture().getCategorie().getNom().toLowerCase().contains(modele)
                        || annonce.getVoiture().getMarque().getNom().toLowerCase().contains(modele)
                        || annonce.getVoiture().getModele().getNom().toLowerCase().contains(modele)

                ) {
                    result.add(annonce);
                }
            }
        }
        if (modele.compareTo("0") == 0) {
            result.addAll(annonces);
        }

        if (categorie.compareTo("0") != 0) {
            for (Annonce annonce : result) {
                if (annonce.getVoiture().getCategorie().getNom().toLowerCase().contains(categorie)
                        || annonce.getVoiture().getMarque().getNom().toLowerCase().contains(categorie)
                        || annonce.getVoiture().getModele().getNom().toLowerCase().contains(categorie)

                ) {
                    result2.add(annonce);
                }
            }
        }
        if (categorie.compareTo("0") == 0) {
            result2 = result;
        }
        if (marque.compareTo("0") != 0) {
            for (Annonce annonce : result2) {
                if (annonce.getVoiture().getCategorie().getNom().toLowerCase().contains(marque)
                        || annonce.getVoiture().getMarque().getNom().toLowerCase().contains(marque)
                        || annonce.getVoiture().getModele().getNom().toLowerCase().contains(marque)

                ) {
                    result3.add(annonce);
                }
            }
        }
        if (marque.compareTo("0") == 0) {
            result3 = result2;
        }
        if (couleur != 0) {
            for (Annonce a : result3) {
                if (caracteristique.getCaracteristiqueByVoiture(a.getVoiture()).getCouleur()
                        .getId_couleur() == couleur) {
                    result4.add(a);
                }
            }
        }
        if (couleur == 0) {
            result4 = result3;
        }
        if (prixmin.compareTo("x") != 0 && prixmax.compareTo("x") != 0) {
            for (Annonce a : result4) {
                if (a.getVoiture().getPrix() >= Double.valueOf(prixmin)
                        && a.getVoiture().getPrix() <= Double.valueOf(prixmax)) {
                    result5.add(a);
                }
            }
        }
        if (prixmin.compareTo("x") == 0 && prixmax.compareTo("x") == 0) {
            result5 = result4;
        }
        return result5;

    }
}
