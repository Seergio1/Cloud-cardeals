
package com.example.ventevoiture01.Services;

import com.example.ventevoiture01.Models.Annonce;
import com.example.ventevoiture01.Models.Modele;
import com.example.ventevoiture01.Models.Annonce_Favoris;
import com.example.ventevoiture01.Models.Employer;
import com.example.ventevoiture01.Models.Voiture;
import com.example.ventevoiture01.Models.MeilleureAnnonce;
import com.example.ventevoiture01.Repository.AnnonceFavorisJPA;
import com.example.ventevoiture01.Repository.AnnonceJPA;
import com.example.ventevoiture01.Repository.ModeleJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class AnnonceService {

    @Autowired
    private AnnonceJPA annonceRepository;

    public List<Annonce> getAllAnnonces() {
        return annonceRepository.findAll();
    }

    public Optional<Annonce> getAnnonceById(int id) {
        return annonceRepository.findById(id);
    }

    public Annonce createAnnonce(Annonce annonce) {
        return annonceRepository.save(annonce);
    }

    public Annonce updateAnnonce(int id, Annonce updatedAnnonce) {
        if (annonceRepository.existsById(id)) {
            updatedAnnonce.setId_annonce(id);
            return annonceRepository.save(updatedAnnonce);
        } else {
            
            return null;
        }
    }

    public void deleteAnnonce(int id) {
        annonceRepository.deleteById(id);
    }

    public List<Annonce> getAnnonceByUtilisateur(Employer employer) {
        List<Annonce> result = new ArrayList<Annonce>();
        List<Annonce> annonces = annonceRepository.findAll();
        for (Annonce ann : annonces) {
            if (ann.getEmployer().getId() == employer.getId()) {
                result.add(ann);
            }
        }
        return result;
    }

    public List<Annonce> getAnnonceByStatus(String employer) {
        List<Annonce> result = new ArrayList<Annonce>();
        List<Annonce> annonces = annonceRepository.findAll();
        for (Annonce ann : annonces) {
            if (ann.getStatus_voiture().compareTo(employer) == 0) {
                result.add(ann);
            }
        }
        return result;
    }

    public List<Annonce> getAnnonceByEtat(String employer) {
        List<Annonce> result = new ArrayList<Annonce>();
        List<Annonce> annonces = annonceRepository.findAll();
        for (Annonce ann : annonces) {
            if (ann.getEtat_annonce().compareTo(employer) == 0) {
                result.add(ann);
            }
        }
        return result;
    }

    @Autowired
    ModeleJPA modeleJPA;

    public ArrayList getVoitureVendusByModele() {
        ArrayList<Voiture> vendu = new ArrayList<Voiture>();
        ArrayList result = new ArrayList<>();
        List<Annonce> temp;
        List<Annonce> annonces = annonceRepository.findAll();
        List<Modele> models = modeleJPA.findAll();
        for (Modele model : models) {
            temp = new ArrayList<Annonce>();
            for (Annonce ann : annonces) {
                if (ann.getStatus_voiture().compareTo("1") == 0
                        && ann.getVoiture().getMarque().getNom().compareTo(model.getNom()) == 0) {
                    temp.add(ann);
                }
            }
            result.add(temp);
        }
        return result;
    }
    
    @Autowired
    AnnonceFavorisJPA annonceFavorisJPA;

    public List<Annonce> getAnnonceFavorisByUtilisateur(Employer employer) {
        List<Annonce> result = new ArrayList();
        List<Annonce_Favoris> annonces = annonceFavorisJPA.findAll();
        for (Annonce_Favoris ann : annonces) {
            if (ann.getEmployer().getId() == employer.getId()) {
                result.add(ann.getAnnonce());
            }
        }
        return result;
    }

    public List<MeilleureAnnonce> countFavorisByAnnonce() {
        List<Object[]> results = annonceFavorisJPA.countFavorisByAnnonce();
        return results.stream()
                .map(result -> new MeilleureAnnonce((Annonce) result[0], (Long) result[1]))
                .collect(Collectors.toList());
    }

    public Annonce_Favoris createAnnonceFavoris(Annonce_Favoris annonce) {
        return annonceFavorisJPA.save(annonce);
    }

    public Annonce updateStatusVoiture(int id, String statusVoiture) {
        Optional<Annonce> existingAnnonce = annonceRepository.findById(id);

        if (existingAnnonce.isPresent()) {
            Annonce annonce = existingAnnonce.get();
            annonce.setStatus_voiture(statusVoiture);
            return annonceRepository.save(annonce);
        } else {
            return null;
        }
    }

    public void valider(int id) {
            annonceRepository.valider(id);
      }
}
