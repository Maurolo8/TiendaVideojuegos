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

import com.obligatoriodda2.obligatoriodda2.Entity.LineaVenta;
import com.obligatoriodda2.obligatoriodda2.Service.LineaVentaService;
import com.obligatoriodda2.obligatoriodda2.Utils.AppException;


@RestController
@RequestMapping("/lineaVenta")
@CrossOrigin(origins = "http://localhost:3000")
public class LineaVentaController {
    
    @Autowired
    private LineaVentaService lineaVentaService;

    @PostMapping
    public ResponseEntity<?> altalineaVenta(@RequestBody LineaVenta lineaVenta){
        try{
            if(lineaVentaService.stockSuficiente(lineaVenta)){
                return ResponseEntity.status(HttpStatus.OK).body(lineaVentaService.agregar(lineaVenta));
            }
            else{
                throw new AppException("Stock insuficiente");
            }
        }
        catch(AppException a){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(a.getMessage());
        } 
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarlineaVenta(@PathVariable int id){
        return ResponseEntity.status(HttpStatus.OK).body(lineaVentaService.eliminar(id));
    }

    @PutMapping
    public ResponseEntity<?> modificarlineaVenta(@RequestBody LineaVenta lineaVenta){
        return ResponseEntity.status(HttpStatus.OK).body(lineaVentaService.modificar(lineaVenta));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> conseguirlineaVenta(@PathVariable int id){
        return ResponseEntity.status(HttpStatus.OK).body(lineaVentaService.conseguirLineaVenta(id));
    }

    @GetMapping
    public ResponseEntity<?> listarlineaVenta(){
        return ResponseEntity.status(HttpStatus.OK).body(lineaVentaService.listar());
    }
}
