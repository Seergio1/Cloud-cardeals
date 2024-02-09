package com.example.ventevoiture01.Repository;

import com.example.ventevoiture01.Models.Image;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ImageRepository extends MongoRepository<Image, String> {
    List<Image> findByIdAnnonce(int idAnnonce);

}
