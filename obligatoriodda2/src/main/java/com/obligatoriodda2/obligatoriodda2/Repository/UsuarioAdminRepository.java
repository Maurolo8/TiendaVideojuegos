package com.obligatoriodda2.obligatoriodda2.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.obligatoriodda2.obligatoriodda2.Entity.UsuarioAdmin;

public interface UsuarioAdminRepository extends JpaRepository<UsuarioAdmin, Integer>{
    UsuarioAdmin findByCorreoAndContrasena(String correo, String contrasena);
}
