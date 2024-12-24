package com.obligatoriodda2.obligatoriodda2.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.obligatoriodda2.obligatoriodda2.Entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    @Query("SELECT u FROM Usuario u WHERE TYPE(u) = :tipo")
    List<Usuario> findByTipoUsuario(@Param("tipo") Class<? extends Usuario> tipo);
}
