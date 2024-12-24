package com.obligatoriodda2.obligatoriodda2.Service;

import java.time.LocalDate;
import java.util.List;

import com.obligatoriodda2.obligatoriodda2.Entity.Usuario;
import com.obligatoriodda2.obligatoriodda2.Entity.Venta;
import com.obligatoriodda2.obligatoriodda2.Utils.AppException;

public interface VentaService {
    public Venta guardarVenta(Venta u);
    public boolean eliminar(int id);
    public Venta modificar(Venta u);
    public Venta conseguirVenta(int id);
    public List<Venta> listar();
    public List<Venta> listarVentasUsuario(Usuario usuario) throws AppException;
    public List<Venta> listarPorFecha(LocalDate fecha) throws AppException;
}

