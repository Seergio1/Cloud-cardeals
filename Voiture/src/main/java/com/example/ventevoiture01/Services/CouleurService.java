package com.example.ventevoiture01.Services;

import com.example.ventevoiture01.Models.Couleur;
import com.example.ventevoiture01.Repository.CouleurJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CouleurService {
    @Autowired
    private CouleurJPA CouleurRepository;

    public List<Couleur> getAllCouleurs() {
        return CouleurRepository.findAll();
    }

    public Optional<Couleur> getCouleurById(int id) {
        return CouleurRepository.findById(id);
    }

    public Couleur createCouleur(Couleur Couleur) {
        return CouleurRepository.save(Couleur);
    }

    public Couleur updateCouleur(int id, Couleur updatedCouleur) {
        if (CouleurRepository.existsById(id)) {
            updatedCouleur.setId_couleur(id);
            return CouleurRepository.save(updatedCouleur);
        } else {
            // Gérer le cas où la catégorie avec l'ID spécifié n'est pas trouvée
            return null;
        }
    }

    public void deleteCouleur(int id) {
        CouleurRepository.deleteById(id);
    }
}
