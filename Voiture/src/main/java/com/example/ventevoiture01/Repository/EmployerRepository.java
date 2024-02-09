package com.example.ventevoiture01.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ventevoiture01.Models.Employer;

@Repository
public interface EmployerRepository extends JpaRepository<Employer, Long> {

    Optional<Employer> findEmployerById(Long id);

    Employer getEmployerById(Long id);

    Optional<Employer> findEmployerByEmail(String email);

    Employer getEmployerByEmail(String email);

}
