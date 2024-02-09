package com.example.ventevoiture01.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Marque {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    int id_marque;
    String nom;

    public int getId() {
        return id_marque;
    }

    public void setId(int id) {
        this.id_marque = id;
    }

    @Override
    public String toString() {
        return "MarqueJPA [id=" + id_marque + ", nom=" + nom + "]";
    }


    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Marque(String nom) {
        this.nom = nom;
    }

    public Marque() {
    }
    public Marque(int id, String nom) {
        this.id_marque = id;
        this.nom = nom;
    }

}