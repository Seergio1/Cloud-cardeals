package com.example.ventevoiture01.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Vente {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    int id;
    @ManyToOne
    @JoinColumn(name = "id_vendeur")
    Employer vendeur;
    @ManyToOne
    @JoinColumn(name = "id_annonce")
    Annonce annonce;
    @ManyToOne
    @JoinColumn(name = "id_client")
    Employer client;
    double prix;

    public Vente(int id, Employer vendeur, Annonce annonce, Employer client, double prix) {
        this.id = id;
        this.vendeur = vendeur;
        this.annonce = annonce;
        this.client = client;
        this.prix = prix;
    }

    @Override
    public String toString() {
        return "Vente [id=" + id + ", vendeur=" + vendeur + ", annonce=" + annonce + ", client=" + client + ", prix="
                + prix + "]";
    }

    public Vente(Employer vendeur, Annonce annonce, Employer client, double prix) {
        this.vendeur = vendeur;
        this.annonce = annonce;
        this.client = client;
        this.prix = prix;
    }

    public Vente() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Employer getVendeur() {
        return vendeur;
    }

    public void setVendeur(Employer vendeur) {
        this.vendeur = vendeur;
    }

    public Annonce getAnnonce() {
        return annonce;
    }

    public void setAnnonce(Annonce annonce) {
        this.annonce = annonce;
    }

    public Employer getClient() {
        return client;
    }

    public void setClient(Employer client) {
        this.client = client;
    }

    public double getPrix() {
        return prix;
    }

    public void setPrix(double prix) {
        this.prix = prix;
    }

}