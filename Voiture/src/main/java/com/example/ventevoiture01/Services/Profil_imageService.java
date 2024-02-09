package com.example.ventevoiture01.Services;

import com.example.ventevoiture01.Models.Image;
import com.example.ventevoiture01.Models.Profil_image;
import com.example.ventevoiture01.Repository.Profil_imageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Profil_imageService {
    @Autowired
    private Profil_imageRepository profilImageRepository;
    public List<Profil_image> getAllProfilImages() {
        return profilImageRepository.findAll();
    }

    public Optional<Profil_image> getProfilImageById(String id) {
        return profilImageRepository.findById(id);
    }

    public Profil_image createProfilImage(Profil_image profilImage) {
        return profilImageRepository.save(profilImage);
    }

    public Profil_image updateProfilImage(String id, Profil_image profilImage) {
        if (profilImageRepository.existsById(id)) {
            return profilImageRepository.save(profilImage);
        } else {
            // Gérer le cas où l'image avec l'ID spécifié n'existe pas
            return null;
        }
    }

    public void deleteProfilImage(String id) {
        profilImageRepository.deleteById(id);
    }
    public List<Profil_image> getImagesByIdEmployer(int idEmployer) {
        return profilImageRepository.findByIdEmployer(idEmployer);
    }
}
