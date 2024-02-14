package com.example.ventevoiture01.Controllers;

import com.example.ventevoiture01.Models.Image;
import com.example.ventevoiture01.Models.Profil_image;
import com.example.ventevoiture01.Services.ImageService;
import com.example.ventevoiture01.Services.Profil_imageService;
import com.example.ventevoiture01.Utils.FileHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("unauthenticated")
public class ImageControllerAll {

    @Autowired
    private ImageService imageService;

    @GetMapping("/images")
    public List<Image> getAllImages() {
        return imageService.getAllImages();
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<Image> getImageById(@PathVariable String id) {
        Optional<Image> image = imageService.getImageById(id);
        return image.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/image/create")
    public ResponseEntity<Image> createImage(@RequestBody Image image) {
        Image createdImage = imageService.createImage(image);
        return new ResponseEntity<>(createdImage, HttpStatus.CREATED);
    }

    @PutMapping("/image/update/{id}")
    public ResponseEntity<Image> updateImage(@PathVariable String id, @RequestBody Image updatedImage) {
        Image updated = imageService.updateImage(id, updatedImage);
        return updated != null ? new ResponseEntity<>(updated, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/image/delete/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable String id) {
        imageService.deleteImage(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/image/annonce/{idAnnonce}")
    public ResponseEntity<List<Image>> getImagesByIdAnnonce(@PathVariable int idAnnonce) {
        List<Image> images = imageService.getImagesByIdAnnonce(idAnnonce);
        return new ResponseEntity<>(images, HttpStatus.OK);
    }

    @PostMapping("/image/file")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file,
                                                   @RequestParam("idAnnonce") int idAnnonce) {
        try {
            FileHelper fileHelper = new FileHelper();
            String base64 = Base64.getEncoder().encodeToString(file.getBytes());
            String url = fileHelper.uploadOnline(base64);
            System.out.println("url : " + url);
            System.out.println("id_annonce : " + idAnnonce);
            Image image = Image.builder()
                    .idAnnonce(idAnnonce)
                    .url(url)
                    .build();
            Image createdImage = imageService.createImage(image);
            return ResponseEntity.ok("Fichier reçu avec succès!");
        } catch (IOException e) {
            e.getMessage();
        }
        return null;
    }

    @PostMapping("/image/string/{idAnnonce}")
    public ResponseEntity<String> upload(@RequestBody String[] urls,
                                         @PathVariable int idAnnonce) {
        FileHelper fileHelper = new FileHelper();
        RestTemplate restTemplate = new RestTemplate();

        for (int i = 0; i < urls.length; i++) {
            ResponseEntity<byte[]> response = restTemplate.exchange(
                    urls[i], HttpMethod.GET, null, byte[].class);
            String base64 = Base64.getEncoder().encodeToString(response.getBody());
            String url = fileHelper.uploadOnline(base64);
            System.out.println("url : " + url);

            System.out.println("id_annonce : " + idAnnonce);
            Image image = Image.builder()
                    .idAnnonce(idAnnonce)
                    .url(url)
                    .build();
            Image createdImage = imageService.createImage(image);

        }

        return ResponseEntity.ok("Fichier reçu avec succès!");
    }

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
    public ResponseEntity<String> handleFileUploadprofil(@RequestParam("file") MultipartFile file,
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
