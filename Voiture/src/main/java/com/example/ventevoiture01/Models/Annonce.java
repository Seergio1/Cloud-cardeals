package com.example.ventevoiture01.Models;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
public class Annonce {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    int id_annonce;
    @ManyToOne
    @JoinColumn(name = "id_voiture")
    Voiture voiture;
    @ManyToOne
    @JoinColumn(name = "id_employer")
    Employer employer;
    String description;
    String etat_annonce;
    LocalDateTime validation_annonce;
    String status_voiture;
    LocalDateTime date_de_vente;

    public LocalDateTime getDate_de_vente() {
        return date_de_vente;
    }

    public void setDate_de_vente(LocalDateTime date_de_vente) {
        this.date_de_vente = date_de_vente;
    }

    Date date;

    public void valider_annonce() {
        this.validation_annonce = LocalDateTime.now();
    }

    public Annonce(int id_annonce, Voiture voiture, Employer employer, String description, String etat_annonce,
            String status_voiture, Date date) {
        this.id_annonce = id_annonce;
        this.voiture = voiture;
        this.employer = employer;
        this.description = description;
        this.etat_annonce = etat_annonce;
        this.status_voiture = status_voiture;
        this.date = date;
    }

    public Annonce(Voiture voiture, Employer employer, String description, String etat_annonce, String status_voiture,
            Date date) {
        this.voiture = voiture;
        this.employer = employer;
        this.description = description;
        this.etat_annonce = etat_annonce;
        this.status_voiture = status_voiture;
        this.date = date;
    }

    public Annonce() {
    }

    public int getId_annonce() {
        return id_annonce;
    }

    public void setId_annonce(int id_annonce) {
        this.id_annonce = id_annonce;
    }

    public Voiture getVoiture() {
        return voiture;
    }

    public void setVoiture(Voiture voiture) {
        this.voiture = voiture;
    }

    public Employer getEmployer() {
        return employer;
    }

    public void setEmployer(Employer employer) {
        this.employer = employer;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEtat_annonce() {
        return etat_annonce;
    }

    public void setEtat_annonce(String etat_annonce) {
        this.etat_annonce = etat_annonce;
    }

    public String getStatus_voiture() {
        return status_voiture;
    }

    public void setStatus_voiture(String status_voiture) {
        this.status_voiture = status_voiture;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public LocalDateTime getValidation_annonce() {
        return validation_annonce;
    }

    public void setValidation_annonce(LocalDateTime validation_annonce) {
        this.validation_annonce = validation_annonce;
    }
}
