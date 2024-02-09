package com.example.ventevoiture01.Controllers;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ventevoiture01.Models.Employer;
import com.example.ventevoiture01.Services.EmployerService;

@RestController
@RequestMapping
public class EmployerController {
    @Autowired
    EmployerService employerservice;

    @PostMapping("/employer/create")
    public void insertemployer(@RequestBody Employer employer) {
        employerservice.insertemployer(employer);
    }

    @GetMapping("/employer/{id}")
    public Employer getVoitureById(@PathVariable Long id) {
        return employerservice.getEmployerByid(id);
    }

    @GetMapping("/employer/email/{token}")
    public Employer getEmployerByEmail(@PathVariable String token) {
        return employerservice.getEmployerByEmail(token);
    }

}