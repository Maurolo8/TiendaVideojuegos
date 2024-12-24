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

import com.obligatoriodda2.obligatoriodda2.Entity.UsuarioAdmin;
import com.obligatoriodda2.obligatoriodda2.Service.UsuarioAdminService;
import com.obligatoriodda2.obligatoriodda2.Utils.AppException;


@RestController
@RequestMapping("/usuarioAdmin")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioAdminController {
    
    @Autowired
    private UsuarioAdminService usuarioService;

    @Autowired
    private UsuarioAdminService usuarioAdminService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String correo, @RequestParam String contrasena) {
        try {
            UsuarioAdmin admin = usuarioAdminService.login(correo, contrasena);
            return ResponseEntity.ok(admin);
             // Devuelve el usuario en caso de éxito
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(401).body(e.getMessage()); // Devuelve un error si fallan las credenciales
        }
    }

    @PostMapping
    public ResponseEntity<?> altaUsuario(@RequestBody UsuarioAdmin usuario){
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.agregar(usuario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable int id){
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.eliminar(id));
    }

    @PutMapping
    public ResponseEntity<?> modificarUsuario(@RequestBody UsuarioAdmin usuario){
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

    // @GetMapping("/login")
    // public ResponseEntity<?> login(@RequestParam String correo, @RequestParam String contrasena) {
    //     try {
    //         usuarioService.existeCorreoContra(correo, contrasena);
    //         // Si las credenciales son válidas, responde con éxito
    //         return ResponseEntity.status(HttpStatus.OK).body("Inicio de sesion exitoso");
    //     } 
    //     catch (AppException a){
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(a.getMessage());
    //     }
    //     catch (Exception e) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
    //     }
    // }
}
