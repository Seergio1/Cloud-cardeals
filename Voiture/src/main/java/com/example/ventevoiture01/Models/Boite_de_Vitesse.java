package com.example.ventevoiture01.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Boite_de_Vitesse {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    int id_boite_de_vitesse;
    String nom;

    public int getId() {
        return id_boite_de_vitesse;
    }

    public Boite_de_Vitesse(String nom) {
        this.nom = nom;
    }

    public Boite_de_Vitesse(int id, String nom) {
        this.id_boite_de_vitesse = id;
        this.nom = nom;
    }

    @Override
    public String toString() {
        return "Boite_de_Vitesse [id=" + id_boite_de_vitesse + ", nom=" + nom + "]";
    }

    public void setId(int id) {
        this.id_boite_de_vitesse = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Boite_de_Vitesse() {
    }

}