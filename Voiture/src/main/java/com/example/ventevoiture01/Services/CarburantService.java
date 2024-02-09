package com.example.ventevoiture01.Services;

import com.example.ventevoiture01.Models.Carburant;
import com.example.ventevoiture01.Repository.CarburantJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarburantService {

    @Autowired
    private CarburantJPA carburantRepository;

    public List<Carburant> getAllCarburants() {
        return carburantRepository.findAll();
    }

    public Optional<Carburant> getCarburantById(int id) {
        return carburantRepository.findById(id);
    }

    public Carburant createCarburant(Carburant carburant) {
        return carburantRepository.save(carburant);
    }

    public Carburant updateCarburant(int id, Carburant updatedCarburant) {
        if (carburantRepository.existsById(id)) {
            updatedCarburant.setId(id);
            return carburantRepository.save(updatedCarburant);
        } else {
            // Gérer le cas où le carburant avec l'ID spécifié n'est pas trouvé
            return null;
        }
    }

    public void deleteCarburant(int id) {
        carburantRepository.deleteById(id);
    }
}
