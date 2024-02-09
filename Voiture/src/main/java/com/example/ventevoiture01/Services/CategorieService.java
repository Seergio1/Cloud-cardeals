package com.example.ventevoiture01.Services;

import com.example.ventevoiture01.Models.Categorie;
import com.example.ventevoiture01.Repository.CategorieJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategorieService {

    @Autowired
    private CategorieJPA categorieRepository;

    public List<Categorie> getAllCategories() {
        return categorieRepository.findAll();
    }

    public Optional<Categorie> getCategorieById(int id) {
        return categorieRepository.findById(id);
    }

    public Categorie createCategorie(Categorie categorie) {
        return categorieRepository.save(categorie);
    }

    public Categorie updateCategorie(int id, Categorie updatedCategorie) {
        if (categorieRepository.existsById(id)) {
            updatedCategorie.setId(id);
            return categorieRepository.save(updatedCategorie);
        } else {
            // Gérer le cas où la catégorie avec l'ID spécifié n'est pas trouvée
            return null;
        }
    }

    public void deleteCategorie(int id) {
        categorieRepository.deleteById(id);
    }
}
