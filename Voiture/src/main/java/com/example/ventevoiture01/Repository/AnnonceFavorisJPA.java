package com.example.ventevoiture01.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ventevoiture01.Models.Annonce_Favoris;
import com.example.ventevoiture01.Models.MeilleureAnnonce;

import org.springframework.data.jpa.repository.Query;

import java.util.List;

@Repository
public interface AnnonceFavorisJPA extends JpaRepository<Annonce_Favoris, Integer> {
  @Query(value = "SELECT a, COUNT(*) AS favorisCount " +
            "FROM Annonce_Favoris af " +
            "JOIN af.annonce a " +
            "GROUP BY a " +
            "ORDER BY favorisCount DESC LIMIT 3")
    List<Object[]> countFavorisByAnnonce();
}
