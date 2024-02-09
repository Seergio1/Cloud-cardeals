package com.example.ventevoiture01.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Carburant {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    int id_carburant;
    String nom;

    public int getId() {
        return id_carburant;
    }

    public void setId(int id) {
        this.id_carburant = id;
    }
    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }
    public Carburant(int id, String nom) {
        this.id_carburant = id;
        this.nom = nom;
    }

    public Carburant() {
    }

    public Carburant(String nom) {
        this.nom = nom;
    }

    @Override
    public String toString() {
        return "Carburant [id=" + id_carburant + ", nom=" + nom + "]";
    }




}