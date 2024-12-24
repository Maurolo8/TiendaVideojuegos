package com.obligatoriodda2.obligatoriodda2.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.obligatoriodda2.obligatoriodda2.Entity.Videojuego;
import java.util.List;


public interface VideojuegoRepository extends JpaRepository<Videojuego, Integer>{
    List<Videojuego> findByCantidadStockLessThanEqual(int cantidad);
}
