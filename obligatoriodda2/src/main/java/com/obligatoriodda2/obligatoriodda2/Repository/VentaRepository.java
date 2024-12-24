package com.obligatoriodda2.obligatoriodda2.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.obligatoriodda2.obligatoriodda2.Entity.Usuario;
import com.obligatoriodda2.obligatoriodda2.Entity.Venta;
import java.time.LocalDate;


public interface VentaRepository extends JpaRepository<Venta, Integer>{
    List<Venta> findByUsuario(Usuario usuario);
    List<Venta> findByFechaCompra(LocalDate fechaCompra);
}
