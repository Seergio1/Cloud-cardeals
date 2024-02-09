package com.example.ventevoiture01.Models;

public class MeilleureAnnonce {
    private Annonce annonce;
    private Long favorisCount;

    public MeilleureAnnonce() {
    }

    public MeilleureAnnonce(Annonce annonce, Long favorisCount) {
        this.annonce = annonce;
        this.favorisCount = favorisCount;
    }

    public Annonce getAnnonce() {
        return annonce;
    }

    public void setAnnonce(Annonce annonce) {
        this.annonce = annonce;
    }

    public Long getFavorisCount() {
        return favorisCount;
    }

    public void setFavorisCount(Long favorisCount) {
        this.favorisCount = favorisCount;
    }
}
