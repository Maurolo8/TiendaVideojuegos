package com.obligatoriodda2.obligatoriodda2.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.obligatoriodda2.obligatoriodda2.Entity.Videojuego;
import com.obligatoriodda2.obligatoriodda2.Service.VideojuegoService;
import com.obligatoriodda2.obligatoriodda2.Utils.AppException;

import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/videojuego")
@CrossOrigin(origins = "http://localhost:3000")
public class VideojuegoController {
    
    @Autowired
    private VideojuegoService videojuegoService;

    @PostMapping
    public ResponseEntity<?> altavideojuego(@RequestBody Videojuego videojuego){
        return ResponseEntity.status(HttpStatus.OK).body(videojuegoService.agregar(videojuego));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarvideojuego(@PathVariable int id){
        return ResponseEntity.status(HttpStatus.OK).body(videojuegoService.eliminar(id));
    }

    @PutMapping
    public ResponseEntity<?> modificarvideojuego(@RequestBody Videojuego videojuego){
        return ResponseEntity.status(HttpStatus.OK).body(videojuegoService.modificar(videojuego));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> conseguirVideojuego(@PathVariable int id){
        return ResponseEntity.status(HttpStatus.OK).body(videojuegoService.conseguirVideojuego(id));
    }

    @GetMapping
    public ResponseEntity<?> listarvideojuego(){
        return ResponseEntity.status(HttpStatus.OK).body(videojuegoService.listar());
    }

    @GetMapping("/filtrarCantidad")
    public ResponseEntity<?> filtrarPorCantidad(@RequestParam int cantidad){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(videojuegoService.listarPorCantidad(cantidad));
        }
        catch (AppException a){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(a.getMessage());
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
        }
    }
    
}
