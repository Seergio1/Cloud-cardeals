package com.example.ventevoiture01.Controllers;

import com.example.ventevoiture01.Models.Categorie;
import com.example.ventevoiture01.Services.CategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping
public class CategorieController {

    @Autowired
    private CategorieService categorieService;

    @GetMapping("/categories")
    public List<Categorie> getAllCategories() {
        return categorieService.getAllCategories();
    }

    @GetMapping("/categorie/{id}")
    public ResponseEntity<Categorie> getCategorieById(@PathVariable int id) {
        Optional<Categorie> categorie = categorieService.getCategorieById(id);
        return categorie.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/categorie/create")
    public ResponseEntity<Categorie> createCategorie(@RequestBody Categorie categorie) {
        Categorie createdCategorie = categorieService.createCategorie(categorie);
        return new ResponseEntity<>(createdCategorie, HttpStatus.CREATED);
    }

    @PutMapping("/categorie/update/{id}")
    public ResponseEntity<Categorie> updateCategorie(@PathVariable int id, @RequestBody Categorie categorie) {
        Categorie updatedCategorie = categorieService.updateCategorie(id, categorie);
        return updatedCategorie != null ? new ResponseEntity<>(updatedCategorie, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/categorie/delete/{id}")
    public ResponseEntity<Void> deleteCategorie(@PathVariable int id) {
        categorieService.deleteCategorie(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
