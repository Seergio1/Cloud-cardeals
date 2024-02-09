package com.example.ventevoiture01.Models;

import jakarta.persistence.*;

@Entity
public class Modele {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    int id_modele;
    String nom;

    public int getId() {
        return id_modele;
    }

    public void setId(int id) {
        this.id_modele = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Modele() {
    }

}