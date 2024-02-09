package com.example.ventevoiture01.Models;

import java.sql.Date;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Commission_Pourcentage {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    int id;
    double pourcentage;
    LocalDate date;

    public int getId() {
        return id;
    }

    @Override
    public String toString() {
        return "Commission_Pourcentage [id=" + id + ", pourcentage=" + pourcentage + ", date=" + date + "]";
    }

    public Commission_Pourcentage() {
    }

    public LocalDate getDate() {
        return date;
    }

    public Commission_Pourcentage(int id, double pourcentage, LocalDate date) {
        this.id = id;
        this.pourcentage = pourcentage;
        this.date = date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Commission_Pourcentage(double pourcentage) {
        this.pourcentage = pourcentage;
        this.date = LocalDate.now();
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getPourcentage() {
        return pourcentage;
    }

    public void setPourcentage(double pourcentage) {
        this.pourcentage = pourcentage;
    }

}