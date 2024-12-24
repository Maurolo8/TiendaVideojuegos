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

import com.obligatoriodda2.obligatoriodda2.Entity.UsuarioPremium;
import com.obligatoriodda2.obligatoriodda2.Service.UsuarioPremiumService;


@RestController
@RequestMapping("/usuarioPremium")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioPremiumController {
    
    @Autowired
    private UsuarioPremiumService usuarioService;

    @PostMapping
    public ResponseEntity<?> altaUsuario(@RequestBody UsuarioPremium usuario){
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.agregar(usuario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable int id){
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.eliminar(id));
    }

    @PutMapping
    public ResponseEntity<?> modificarUsuario(@RequestBody UsuarioPremium usuario){
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
}
