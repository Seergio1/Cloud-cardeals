package com.example.ventevoiture01.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.ventevoiture01.Models.Annonce;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface AnnonceJPA extends JpaRepository<Annonce, Integer> {
  @Modifying
  @Transactional
  @Query("UPDATE Annonce a SET a.etat_annonce = '1' WHERE a.id_annonce = :id")
  void valider(@Param("id") int id);

  @Modifying
  @Transactional
  @Query("UPDATE Annonce a SET a.validation_annonce = :date WHERE a.id_annonce = :id")
  void date_validation(@Param("id") int id, @Param("date") LocalDateTime date);

  Page<Annonce> findAll(Pageable pageable);

}
