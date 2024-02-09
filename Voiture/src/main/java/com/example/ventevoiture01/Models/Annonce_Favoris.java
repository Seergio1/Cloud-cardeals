package com.example.ventevoiture01.Models;

import jakarta.persistence.*;

@Entity
public class Annonce_Favoris {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    int id_annonce_favoris;
    @ManyToOne
    @JoinColumn(name = "id_annonce")
    Annonce annonce;
    @ManyToOne
    @JoinColumn(name = "id_utilisateur")
    Employer employer;

    public Annonce_Favoris(int id, Annonce annonce, Employer employer) {
        this.id_annonce_favoris = id;
        this.annonce = annonce;
        this.employer = employer;
    }

    public Annonce_Favoris(Annonce annonce, Employer employer) {
        this.annonce = annonce;
        this.employer = employer;
    }

    public Annonce_Favoris() {
    }

    public int getId() {
        return id_annonce_favoris;
    }

    public void setId(int id) {
        this.id_annonce_favoris = id;
    }

    public Annonce getAnnonce() {
        return annonce;
    }

    public void setAnnonce(Annonce annonce) {
        this.annonce = annonce;
    }

    public Employer getEmployer() {
        return employer;
    }

    public void setEmployer(Employer employer) {
        this.employer = employer;
    }
}
