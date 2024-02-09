package com.example.ventevoiture01.Services;

import java.util.Optional;
import com.example.ventevoiture01.Config.JwtService;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.ventevoiture01.Models.Employer;
import com.example.ventevoiture01.Repository.EmployerRepository;
import org.springframework.stereotype.Service;

@Service
public class EmployerService {
    @Autowired
    EmployerRepository employeeRepository;

    public void insertemployer(Employer employer) {
        employeeRepository.save(employer);
    }

    public Optional<Employer> getEmployerById(Long id) {
        return employeeRepository.findEmployerById(id);
    }

    public Employer getEmployerByid(Long id) {
        return employeeRepository.getEmployerById(id);
    }

    public Employer getEmployerByEmail(String token) {
        JwtService tokenService = new JwtService();

        String email = tokenService.extractUsername(token);
        return employeeRepository.getEmployerByEmail(email);
    }
}