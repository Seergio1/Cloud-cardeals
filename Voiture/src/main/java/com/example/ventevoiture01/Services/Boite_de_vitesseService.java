package com.example.ventevoiture01.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ventevoiture01.Repository.Boite_de_VitesseJPA;
import com.example.ventevoiture01.Models.Boite_de_Vitesse;
import java.util.List;
import java.util.Optional;

@Service
public class Boite_de_vitesseService {

    @Autowired
    private Boite_de_VitesseJPA Boite_de_VitesseRepository;

    public List<Boite_de_Vitesse> getAllBoite_de_Vitesses() {
        return Boite_de_VitesseRepository.findAll();
    }

    public Optional<Boite_de_Vitesse> getBoite_de_VitesseById(int id) {
        return Boite_de_VitesseRepository.findById(id);
    }

    public Boite_de_Vitesse createBoite_de_Vitesse(Boite_de_Vitesse Boite_de_Vitesse) {
        return Boite_de_VitesseRepository.save(Boite_de_Vitesse);
    }

    public void deleteBoiteDeVitesse(int id) {
        Boite_de_VitesseRepository.deleteById(id);
    }

    public Boite_de_Vitesse updateBoite_de_Vitesse(int id, Boite_de_Vitesse updatedBoite_de_Vitesse) {
        if (Boite_de_VitesseRepository.existsById(id)) {
            updatedBoite_de_Vitesse.setId(id);
            return Boite_de_VitesseRepository.save(updatedBoite_de_Vitesse);
        } else {
            // Gérer le cas où le Boite_de_Vitesse avec l'ID spécifié n'est pas trouvé
            return null;
        }
    }
}