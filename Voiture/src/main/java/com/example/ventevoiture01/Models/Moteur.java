package com.example.ventevoiture01.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Moteur {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    int id;
    String nom;

    public int getId() {
        return id;
    }

    @Override
    public String toString() {
        return "Moteur [id=" + id + ", nom=" + nom + "]";
    }

    public void setId(int id) {
        this.id = id;
    }

    public Moteur() {
    }

    public String getNom() {
        return nom;
    }

    public Moteur(String nom) {
        this.nom = nom;
    }

    public Moteur(int id, String nom) {
        this.id = id;
        this.nom = nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

}