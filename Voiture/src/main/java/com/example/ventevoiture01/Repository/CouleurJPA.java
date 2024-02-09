package com.example.ventevoiture01.Repository;

import com.example.ventevoiture01.Models.Couleur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CouleurJPA extends JpaRepository<Couleur, Integer> {
}
