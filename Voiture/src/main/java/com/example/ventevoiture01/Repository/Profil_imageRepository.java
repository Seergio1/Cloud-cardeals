package com.example.ventevoiture01.Repository;

import com.example.ventevoiture01.Models.Image;
import com.example.ventevoiture01.Models.Profil_image;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface Profil_imageRepository  extends MongoRepository<Profil_image, String> {
    List<Profil_image> findByIdEmployer(int id_Employer);
}
