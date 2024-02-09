package com.example.ventevoiture01.Services;

import com.example.ventevoiture01.Models.Moteur;
import com.example.ventevoiture01.Repository.MoteurJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MoteurService {

    @Autowired
    private MoteurJPA moteurJPA;

    public List<Moteur> getAllMoteurs() {
        return moteurJPA.findAll();
    }

    public Optional<Moteur> getMoteurById(int id) {
        return moteurJPA.findById(id);
    }

    public Moteur createMoteur(Moteur moteur) {
        return moteurJPA.save(moteur);
    }

    public Moteur updateMoteur(int id, Moteur updatedMoteur) {
        if (moteurJPA.existsById(id)) {
            updatedMoteur.setId(id);
            return moteurJPA.save(updatedMoteur);
        } else {
            // Gérer le cas où le moteur avec l'ID spécifié n'est pas trouvé
            return null;
        }
    }

    public void deleteMoteur(int id) {
        moteurJPA.deleteById(id);
    }
}
