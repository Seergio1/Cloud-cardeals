package com.example.ventevoiture01.Controllers;

import com.example.ventevoiture01.Models.Profil_image;
import com.example.ventevoiture01.Services.Profil_imageService;
import com.example.ventevoiture01.Utils.FileHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping
public class Profil_imageController {

    @Autowired
    private Profil_imageService profil_imageService;


    @GetMapping("profil/images")
    public List<Profil_image> getAllProfilImages() {
        return profil_imageService.getAllProfilImages();

    }

    @GetMapping("profil/image/{id}")
    public ResponseEntity<Profil_image> getProfilImageById(@PathVariable String id) {
        Optional<Profil_image> profilImage = profil_imageService.getProfilImageById(id);
        return profilImage.map(image -> new ResponseEntity<>(image, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("profil/image/create")
    public ResponseEntity<Profil_image> createProfilImage(@RequestBody Profil_image profilImage) {
        Profil_image createdProfilImage = profil_imageService.createProfilImage(profilImage);
        return new ResponseEntity<>(createdProfilImage, HttpStatus.CREATED);
    }

    @PutMapping("profil/image/update/{id}")
    public ResponseEntity<Profil_image> updateProfilImage(@PathVariable String id, @RequestBody Profil_image profilImage) {
        Profil_image updatedProfilImage = profil_imageService.updateProfilImage(id, profilImage);
        return updatedProfilImage != null ?
                new ResponseEntity<>(updatedProfilImage, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("profil/image/delete/{id}")
    public ResponseEntity<Void> deleteProfilImage(@PathVariable String id) {
        profil_imageService.deleteProfilImage(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("profil/image/utilisateur/{idUtilisateur}")
    public ResponseEntity<List<Profil_image>> getImagesByIdEmployer(@PathVariable int idUtilisateur) {
        List<Profil_image> images = profil_imageService.getImagesByIdEmployer(idUtilisateur);
        return new ResponseEntity<>(images, HttpStatus.OK);
    }

    @PostMapping("profil/image/file")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file,
                                                   @RequestParam("idUtilisateur") int idEmployer) {
        try {
            FileHelper fileHelper = new FileHelper();
            String base64 = Base64.getEncoder().encodeToString(file.getBytes());
            String url = fileHelper.uploadOnline(base64);
            System.out.println("url : " + url);
            System.out.println("idEmployer : " + idEmployer);
            Profil_image image = Profil_image.builder()
                    .idEmployer(idEmployer)
                    .url(url)
                    .build();
            Profil_image createdImage = profil_imageService.createProfilImage(image);
            if (createdImage != null) {
                return ResponseEntity.ok(url); // Retourne l'URL de l'image
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de la création de l'image");
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de la manipulation du fichier: " + e.getMessage());
        }
    }
}
