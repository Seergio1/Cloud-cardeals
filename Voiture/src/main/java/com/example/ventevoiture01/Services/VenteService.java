package com.example.ventevoiture01.Services;

import org.hibernate.mapping.Array;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ventevoiture01.Models.Vente;
import com.example.ventevoiture01.Models.Employer;
import com.example.ventevoiture01.Models.Vente;
import com.example.ventevoiture01.Models.MeilleureVente;
import com.example.ventevoiture01.Repository.*;
import java.util.List;
import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VenteService {
    @Autowired
    private VenteJPA venteRepository;
    @Autowired
    private EmployerRepository employerRepository;
    
    public List<Vente> getAllVentes() {
        return venteRepository.findAll();
    }

    public Optional<Vente> getVenteById(int id) {
        return venteRepository.findById(id);
    }

    public Vente createVente(Vente Vente) {
        return venteRepository.save(Vente);
    }

    public Vente updateVente(int id, Vente updatedVente) {
        if (venteRepository.existsById(id)) {
            updatedVente.setId(id);
            return venteRepository.save(updatedVente);
        } else {
            // Gérer le cas où le Vente avec l'ID spécifié n'est pas trouvé
            return null;
        }
    }

    public void deleteVente(int id) {
        venteRepository.deleteById(id);
    }

    public ArrayList<Vente> getVenteByUtilisateur(Employer employer) {
        ArrayList<Vente> result = new ArrayList<Vente>();
        List<Vente> annonces = venteRepository.findAll();
        for (Vente ann : annonces) {
            if (ann.getVendeur().getId() == employer.getId()) {
                result.add(ann);
            }
        }
        return result;
    }

      public List<MeilleureVente> countVentesParVendeur() {
        List<Object[]> results = venteRepository.countVentesParVendeur();

        return results.stream()
                .map(result -> {
                    Long vendeurId = (Long) result[0];
                    Long nombreVentes = (Long) result[1];

                    Optional<Employer> optionalEmployer = employerRepository.findEmployerById(vendeurId);

                    Employer vendeur = optionalEmployer.orElse(null);

                    return new MeilleureVente(vendeur, nombreVentes);
                })
                .collect(Collectors.toList());
    }
}
