package com.example.ventevoiture01.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ventevoiture01.Models.Commission_Pourcentage;
import com.example.ventevoiture01.Repository.CommissionPourcentageJPA;

@Service
public class Commission_PourcentageService {
    @Autowired
    CommissionPourcentageJPA commissionPourcentageJPA;

    public List<Commission_Pourcentage> getAllCommissionPourcentage() {
        return commissionPourcentageJPA.findAll();
    }

    public Optional<Commission_Pourcentage> getCommissionPourcentageById(int id) {
        return commissionPourcentageJPA.findById(id);
    }

    public Commission_Pourcentage createCommissionPourcentage(Commission_Pourcentage commission_Pourcentage) {
        return commissionPourcentageJPA.save(commission_Pourcentage);
    }

    public Commission_Pourcentage updateCommission(int id, Commission_Pourcentage updatedCommission) {
        if (commissionPourcentageJPA.existsById(id)) {
            updatedCommission.setId(id);
            return commissionPourcentageJPA.save(updatedCommission);
        } else {
            // Gérer le cas où le Commission avec l'ID spécifié n'est pas trouvé
            return null;
        }
    }

    public void deleteCommission(int id) {
        commissionPourcentageJPA.deleteById(id);
    }
}
