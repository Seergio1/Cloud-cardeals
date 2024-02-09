package com.example.ventevoiture01.Services;

import com.example.ventevoiture01.Models.Marque;
import com.example.ventevoiture01.Repository.MarqueJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MarqueService {

    @Autowired
    private MarqueJPA marqueRepository;

    public List<Marque> getAllMarques() {
        return marqueRepository.findAll();
    }

    public Optional<Marque> getMarqueById(int id) {
        return marqueRepository.findById(id);
    }

    public Marque createMarque(Marque marque) {
        return marqueRepository.save(marque);
    }

    public Marque updateMarque(int id, Marque updatedMarque) {
        if (marqueRepository.existsById(id)) {
            updatedMarque.setId(id);
            return marqueRepository.save(updatedMarque);
        } else {
            // Gérer le cas où la marque avec l'ID spécifié n'est pas trouvée
            return null;
        }
    }

    public void deleteMarque(int id) {
        marqueRepository.deleteById(id);
    }
}
