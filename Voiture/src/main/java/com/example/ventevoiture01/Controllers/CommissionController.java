package com.example.ventevoiture01.Controllers;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ventevoiture01.Models.Commission;
import com.example.ventevoiture01.Repository.AnnonceJPA;
import com.example.ventevoiture01.Services.CommissionService;

@RestController
@RequestMapping
public class CommissionController {
    @Autowired
    private CommissionService CommissionService;

    @GetMapping("/commissions")
    public List<Commission> getAllCommissions() {
        return CommissionService.getAllCommissions();
    }

    @GetMapping("/commission/{id}")
    public ResponseEntity<Commission> getCommissionById(@PathVariable int id) {
        Optional<Commission> Commission = CommissionService.getCommissionById(id);
        return Commission.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/commission/create")
    public ResponseEntity<Commission> createCommission(@RequestBody Commission Commission) {
        Commission createdCommission = CommissionService.createCommission(Commission);
        return new ResponseEntity<>(createdCommission, HttpStatus.CREATED);
    }

    @PutMapping("/commission/update/{id}")
    public ResponseEntity<Commission> updateCommission(@PathVariable int id, @RequestBody Commission Commission) {
        Commission updatedCommission = CommissionService.updateCommission(id, Commission);
        return updatedCommission != null ? new ResponseEntity<>(updatedCommission, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/commission/delete/{id}")
    public ResponseEntity<Void> deleteCommission(@PathVariable int id) {
        CommissionService.deleteCommission(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Autowired
    AnnonceJPA annonceJPA;
    @Autowired
    com.example.ventevoiture01.Repository.CommissionJPA commissionJPA;

    @GetMapping("/commission/annonce/{id_annonce}")
    public ResponseEntity<Commission> getCommissionByAnnonceId(@PathVariable("id_annonce") int id_annonce) {
        Commission coms = commissionJPA.getCommissionByIdAnnonce(id_annonce);

        return new ResponseEntity<>(coms, HttpStatus.OK);
    }

}