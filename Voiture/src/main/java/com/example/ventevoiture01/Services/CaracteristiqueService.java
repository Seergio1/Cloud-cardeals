package com.example.ventevoiture01.Services;

import com.example.ventevoiture01.Models.Caracteristique;
import com.example.ventevoiture01.Models.Voiture;
import com.example.ventevoiture01.Repository.CaracteristiqueJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CaracteristiqueService {

    @Autowired
    private CaracteristiqueJPA caracteristiqueRepository;

    public List<Caracteristique> getAllCaracteristiques() {
        return caracteristiqueRepository.findAll();
    }

    public Optional<Caracteristique> getCaracteristiqueById(int id) {
        return caracteristiqueRepository.findById(id);
    }

    public Caracteristique createCaracteristique(Caracteristique caracteristique) {
        return caracteristiqueRepository.save(caracteristique);
    }

    public Caracteristique updateCaracteristique(int id, Caracteristique updatedCaracteristique) {
        if (caracteristiqueRepository.existsById(id)) {
            updatedCaracteristique.setId_caracteristique(id);
            return caracteristiqueRepository.save(updatedCaracteristique);
        } else {
            // Gérer le cas où la caractéristique avec l'ID spécifié n'est pas trouvée
            return null;
        }
    }

    public void deleteCaracteristique(int id) {
        caracteristiqueRepository.deleteById(id);
    }

    public Caracteristique getCaracteristiqueByVoiture(Voiture voiture) {
        List<Caracteristique> caracteristiques = caracteristiqueRepository.findAll();
        Caracteristique cr = new Caracteristique();
        for (Caracteristique c : caracteristiques) {
            if (c.getVoiture() == voiture) {
                cr = c;
            }
        }
        return cr;
    }
}
