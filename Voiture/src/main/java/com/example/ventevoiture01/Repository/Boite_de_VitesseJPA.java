package com.example.ventevoiture01.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ventevoiture01.Models.Boite_de_Vitesse;

@Repository
public interface Boite_de_VitesseJPA extends JpaRepository<Boite_de_Vitesse, Integer> {

}