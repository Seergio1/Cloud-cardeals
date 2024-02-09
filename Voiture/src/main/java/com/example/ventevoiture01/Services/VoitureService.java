package com.example.ventevoiture01.Services;

import com.example.ventevoiture01.Models.*;
import com.example.ventevoiture01.Repository.VoitureJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VoitureService {

    @Autowired
    private VoitureJPA voitureRepository;

    public List<Voiture> getAllVoitures() {
        return voitureRepository.findAll();
    }

    public Optional<Voiture> getVoitureById(int id) {
        return voitureRepository.findById(id);
    }

    public Voiture createVoiture(Voiture voiture) {
        return voitureRepository.save(voiture);
    }

    public Voiture updateVoiture(int id, Voiture updatedVoiture) {
        if (voitureRepository.existsById(id)) {
            updatedVoiture.setId(id);
            return voitureRepository.save(updatedVoiture);
        } else {
            // Gérer le cas où la voiture avec l'ID spécifié n'est pas trouvée
            return null;
        }
    }

    public void deleteVoiture(int id) {
        voitureRepository.deleteById(id);
    }

    public List<Voiture> getVoitureByModele(Modele modele) {
        List<Voiture> result = new ArrayList<>();
        List<Voiture> voitures = voitureRepository.findAll();
        for (Voiture voiture : voitures) {
            if (voiture.getModele() == modele) {
                result.add(voiture);
            }
        }
        return result;
    }

    public List<Voiture> getVoitureByCategorie(Categorie categorie) {
        List<Voiture> result = new ArrayList<Voiture>();
        List<Voiture> voitures = voitureRepository.findAll();
        for (Voiture voiture : voitures) {
            if (voiture.getCategorie() == categorie) {
                result.add(voiture);
            }
        }
        return result;
    }

    public List<Voiture> getVoitureByMarque(Marque marque) {
        List<Voiture> result = new ArrayList<Voiture>();
        List<Voiture> voitures = voitureRepository.findAll();
        for (Voiture voiture : voitures) {
            if (voiture.getMarque() == marque) {
                result.add(voiture);
            }
        }
        return result;
    }

    public ArrayList<Voiture> getVoitureByUtilisateur(Employer employer) {
        ArrayList<Voiture> result = new ArrayList<Voiture>();
        List<Voiture> voitures = voitureRepository.findAll();
        for (Voiture voiture : voitures) {
            if (voiture.getEmployer() == employer) {
                result.add(voiture);
            }
        }
        return result;
    }
}
