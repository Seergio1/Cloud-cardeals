package com.example.ventevoiture01.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.ventevoiture01.Models.Commission_Pourcentage;

@Repository
public interface CommissionPourcentageJPA extends JpaRepository<Commission_Pourcentage, Integer> {
    @Query("SELECT cp FROM Commission_Pourcentage cp WHERE (cp.date, cp.pourcentage) IN (SELECT MAX(cp2.date), cp2.pourcentage FROM Commission_Pourcentage cp2 GROUP BY cp2.pourcentage)")
    Commission_Pourcentage getLatestCommissionPourcentage();

}