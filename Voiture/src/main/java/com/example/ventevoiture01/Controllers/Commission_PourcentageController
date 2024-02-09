package com.example.ventevoiture01.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ventevoiture01.Models.Commission_Pourcentage;
import com.example.ventevoiture01.Repository.CommissionPourcentageJPA;
import com.example.ventevoiture01.Services.Commission_PourcentageService;

@RestController
@RequestMapping
public class Commission_PourcentageController {
    @Autowired
    CommissionPourcentageJPA commissionPourcentageJPA;
    @Autowired
    Commission_PourcentageService commission_PourcentageService;

    @GetMapping("/commissions_pourcentage")
    public Commission_Pourcentage getLatestCommission_Pourcentage() {
        return commissionPourcentageJPA.getLatestCommissionPourcentage();
    }

    @PostMapping("/commissions_pourcentage/Create")
    public ResponseEntity<Commission_Pourcentage> createCommission(@RequestBody Commission_Pourcentage Commission) {
        Commission_Pourcentage createdCommission = commission_PourcentageService
                .createCommissionPourcentage(Commission);
        return new ResponseEntity<>(createdCommission, HttpStatus.CREATED);
    }
}
