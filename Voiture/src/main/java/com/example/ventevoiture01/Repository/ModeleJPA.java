package com.example.ventevoiture01.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ventevoiture01.Models.Modele;

@Repository
public interface ModeleJPA extends JpaRepository<Modele, Integer> {

}