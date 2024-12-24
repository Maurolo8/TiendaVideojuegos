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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.obligatoriodda2.obligatoriodda2.Entity.Usuario;
import com.obligatoriodda2.obligatoriodda2.Service.UsuarioService;


@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {
    
    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<?> altaUsuario(@RequestBody Usuario usuario){
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.agregar(usuario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable int id){
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.eliminar(id));
    }

    @PutMapping
    public ResponseEntity<?> modificarUsuario(@RequestBody Usuario usuario){
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.modificar(usuario));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> conseguirUsuario(@PathVariable int id){
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.conseguirUsuario(id));
    }

    @GetMapping
    public ResponseEntity<?> listarUsuario(){
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.listar());
    }

    @GetMapping("/filtrarPorTipo")
    public ResponseEntity<?> filtrarPorTipo(@RequestParam String tipo) {
        try {
            return ResponseEntity.ok(usuarioService.listarPorTipoUsuario(tipo));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error interno del servidor");
        }
    }
}
