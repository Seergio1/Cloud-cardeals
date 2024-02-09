package com.example.ventevoiture01.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Commission {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    int id;
    @ManyToOne
    @JoinColumn(name = "id_annonce")
    Annonce annonce;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Commission(Annonce annonce, double montant) {
        this.annonce = annonce;
        this.montant = montant;
    }

    public Commission() {
    }

    public Commission(int id, Annonce annonce, double montant) {
        this.id = id;
        this.annonce = annonce;
        this.montant = montant;
    }

    public Annonce getAnnonce() {
        return annonce;
    }

    public void setAnnonce(Annonce annonce) {
        this.annonce = annonce;
    }

    @Override
    public String toString() {
        return "Commission [id=" + id + ", annonce=" + annonce + ", montant=" + montant + "]";
    }

    public double getMontant() {
        return montant;
    }

    public void setMontant(double montant) {
        this.montant = montant;
    }

    double montant;

}