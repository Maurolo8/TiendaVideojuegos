package com.obligatoriodda2.obligatoriodda2.Service;

import java.util.List;

import com.obligatoriodda2.obligatoriodda2.Entity.Venta;
import com.obligatoriodda2.obligatoriodda2.Entity.Videojuego;
import com.obligatoriodda2.obligatoriodda2.Utils.AppException;

public interface VideojuegoService {
    public Videojuego agregar(Videojuego v);
    public boolean eliminar(int id);
    public Videojuego modificar(Videojuego v);
    public Videojuego conseguirVideojuego(int id);
    public List<Videojuego> listar();
    public void reducirStock(Venta venta);
    public List<Videojuego> listarPorCantidad(int cantidad) throws AppException;
}

