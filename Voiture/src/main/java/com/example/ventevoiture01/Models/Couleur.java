package com.example.ventevoiture01.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Couleur {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    int id_couleur;
    String nom;

    public int getId_couleur() {
        return id_couleur;
    }

    public void setId_couleur(int id_couleur) {
        this.id_couleur = id_couleur;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }
}
