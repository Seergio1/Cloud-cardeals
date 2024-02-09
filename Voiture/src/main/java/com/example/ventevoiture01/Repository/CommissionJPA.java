package com.example.ventevoiture01.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.ventevoiture01.Models.Commission;

@Repository
public interface CommissionJPA extends JpaRepository<Commission, Integer> {
    @Query("SELECT c FROM Commission c WHERE c.annonce.id_annonce = :annonceId")
    Commission getCommissionByIdAnnonce(@Param("annonceId") int annonceId);
}