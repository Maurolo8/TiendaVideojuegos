package com.obligatoriodda2.obligatoriodda2.Controller;

import java.time.LocalDate;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.obligatoriodda2.obligatoriodda2.Entity.Usuario;
import com.obligatoriodda2.obligatoriodda2.Entity.Venta;
import com.obligatoriodda2.obligatoriodda2.Service.UsuarioService;
import com.obligatoriodda2.obligatoriodda2.Service.VentaService;
import com.obligatoriodda2.obligatoriodda2.Service.VideojuegoService;
import com.obligatoriodda2.obligatoriodda2.Utils.AppException;



@RestController
@RequestMapping("/venta")
@CrossOrigin(origins = "http://localhost:3000")
public class VentaController {
    
    @Autowired
    private VentaService ventaService;
    @Autowired
    private VideojuegoService videojuegoService;
    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<?> crearVenta(@RequestBody @Validated Venta venta) {
        try{
            videojuegoService.reducirStock(venta);
            Venta nuevaVenta = ventaService.guardarVenta(venta);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevaVenta);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarventa(@PathVariable int id){
        return ResponseEntity.status(HttpStatus.OK).body(ventaService.eliminar(id));
    }

    @PutMapping
    public ResponseEntity<?> modificarventa(@RequestBody Venta venta){
        return ResponseEntity.status(HttpStatus.OK).body(ventaService.modificar(venta));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> conseguirVenta(@PathVariable int id){
        return ResponseEntity.status(HttpStatus.OK).body(ventaService.conseguirVenta(id));
    }

    @GetMapping
public ResponseEntity<?> listarventa() {
    try {
        List<Venta> ventas = ventaService.listar();
        return ResponseEntity.ok(ventas);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al listar ventas");
    }
}

    @GetMapping("/ComprasUsuario")
    public ResponseEntity<?> comprasUsuario(@RequestParam int id){
        try {
            Usuario usuario = usuarioService.conseguirUsuario(id);
            return ResponseEntity.status(HttpStatus.OK).body(ventaService.listarVentasUsuario(usuario));
        }
        catch (AppException a){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(a.getMessage());
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
        }
    }

    @GetMapping("/FiltrarPorFecha")
    public ResponseEntity<?> fechaCompra(@RequestParam LocalDate fecha){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(ventaService.listarPorFecha(fecha));
        }
        catch (AppException a){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(a.getMessage());
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
        }
    }
}
