package com.example.ventevoiture01.Controllers;

import com.example.ventevoiture01.Models.Image;
import com.example.ventevoiture01.Services.ImageService;
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
@RequestMapping
public class ImageController {

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

    @PostMapping("/image/string")
    public ResponseEntity<String> upload(@RequestBody String[] urls,
                                                   @RequestParam("idAnnonce") int idAnnonce) {
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
}
