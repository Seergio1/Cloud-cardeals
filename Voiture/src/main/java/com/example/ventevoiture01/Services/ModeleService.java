package com.example.ventevoiture01.Services;

import com.example.ventevoiture01.Models.Modele;
import com.example.ventevoiture01.Repository.ModeleJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ModeleService {

    @Autowired
    private ModeleJPA modeleRepository;

    public List<Modele> getAllModeles() {
        return modeleRepository.findAll();
    }

    public Optional<Modele> getModeleById(int id) {
        return modeleRepository.findById(id);
    }

    public Modele createModele(Modele modele) {
        return modeleRepository.save(modele);
    }

    public Modele updateModele(int id, Modele updatedModele) {
        if (modeleRepository.existsById(id)) {
            updatedModele.setId(id);
            return modeleRepository.save(updatedModele);
        } else {
            // Gérer le cas où le modèle avec l'ID spécifié n'est pas trouvé
            return null;
        }
    }

    public void deleteModele(int id) {
        modeleRepository.deleteById(id);
    }
}
