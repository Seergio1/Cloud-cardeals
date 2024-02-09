package com.example.ventevoiture01.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.ventevoiture01.Models.Vente;

@Repository
public interface VenteJPA extends JpaRepository<Vente, Integer> {
    @Query(value = "SELECT v.id, COUNT(*) AS nombre_ventes " +
            "FROM vente " +
            "JOIN employer v ON vente.id_vendeur = v.id " +
            "GROUP BY v.id " +
            "ORDER BY nombre_ventes DESC LIMIT 3", nativeQuery = true)

    List<Object[]> countVentesParVendeur();
}

