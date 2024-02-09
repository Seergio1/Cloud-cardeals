package com.example.ventevoiture01.Models;

public class MeilleureVente {
    private Employer vendeur;
    private Long nombreVentes;

    public MeilleureVente() {
    }

    public MeilleureVente(Employer vendeur, Long nombreVentes) {
        this.vendeur = vendeur;
        this.nombreVentes = nombreVentes;
    }

    public Employer getVendeur() {
        return vendeur;
    }

    public void setVendeur(Employer vendeur) {
        this.vendeur = vendeur;
    }

    public Long getNombreVentes() {
        return nombreVentes;
    }

    public void setNombreVentes(Long nombreVentes) {
        this.nombreVentes = nombreVentes;
    }
}
