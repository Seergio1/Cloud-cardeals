package com.example.ventevoiture01.Models;

import jakarta.persistence.*;

@Entity
public class Voiture {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    int id_voiture;
    @ManyToOne
    @JoinColumn(name = "id_marque")
    Marque marque;
    @ManyToOne
    @JoinColumn(name = "id_categorie")
    Categorie categorie;
    @ManyToOne
    @JoinColumn(name = "id_modele")
    Modele modele;
    int etat;
    double prix;
    String matricule;
    @ManyToOne
    @JoinColumn(name = "id_proprietaire")
    Employer employer;

    public Voiture(int id, Marque marque, Categorie categorie, Modele modele, int etat, double prix, String matricule,
            Employer employer) {
        this.id_voiture = id;
        this.marque = marque;
        this.categorie = categorie;
        this.modele = modele;
        this.etat = etat;
        this.prix = prix;
        this.matricule = matricule;
        this.employer = employer;
    }

    public Voiture() {
    }

    public int getId() {
        return id_voiture;
    }

    public void setId(int id) {
        this.id_voiture = id;
    }

    public Marque getMarque() {
        return marque;
    }

    public void setMarque(Marque marque) {
        this.marque = marque;
    }

    public Categorie getCategorie() {
        return categorie;
    }

    public void setCategorie(Categorie categorie) {
        this.categorie = categorie;
    }

    public Modele getModele() {
        return modele;
    }

    public void setModele(Modele modele) {
        this.modele = modele;
    }

    public int getEtat() {
        return etat;
    }

    public void setEtat(int etat) {
        this.etat = etat;
    }

    public double getPrix() {
        return prix;
    }

    public void setPrix(double prix) {
        this.prix = prix;
    }

    public String getMatricule() {
        return matricule;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public Employer getEmployer() {
        return employer;
    }

    public void setEmployer(Employer employer) {
        this.employer = employer;
    }
}