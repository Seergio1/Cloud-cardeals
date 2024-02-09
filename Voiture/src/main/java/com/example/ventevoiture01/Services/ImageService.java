package com.example.ventevoiture01.Services;

import com.example.ventevoiture01.Models.Image;
import com.example.ventevoiture01.Repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    public List<Image> getAllImages() {
        return imageRepository.findAll();
    }

    public Optional<Image> getImageById(String id) {
        return imageRepository.findById(id);
    }

    public Image createImage(Image image) {
        return imageRepository.save(image);
    }

    public Image updateImage(String id, Image updatedImage) {
        if (imageRepository.existsById(id)) {
            updatedImage.setId(id);
            return imageRepository.save(updatedImage);
        } else {
            return null;
        }
    }

    public void deleteImage(String id) {
        imageRepository.deleteById(id);
    }

    public List<Image> getImagesByIdAnnonce(int idAnnonce) {
        return imageRepository.findByIdAnnonce(idAnnonce);
    }
}
