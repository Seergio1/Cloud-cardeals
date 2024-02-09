package com.example.ventevoiture01.Services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.ventevoiture01.Models.Commission;
import com.example.ventevoiture01.Repository.CommissionJPA;

@Service
public class CommissionService {
    @Autowired
    private CommissionJPA CommissionRepository;

    public List<Commission> getAllCommissions() {
        return CommissionRepository.findAll();
    }

    public Optional<Commission> getCommissionById(int id) {
        return CommissionRepository.findById(id);
    }

    public Commission createCommission(Commission Commission) {
        return CommissionRepository.save(Commission);
    }

    public Commission updateCommission(int id, Commission updatedCommission) {
        if (CommissionRepository.existsById(id)) {
            updatedCommission.setId(id);
            return CommissionRepository.save(updatedCommission);
        } else {
            // Gérer le cas où le Commission avec l'ID spécifié n'est pas trouvé
            return null;
        }
    }

    public void deleteCommission(int id) {
        CommissionRepository.deleteById(id);
    }

}