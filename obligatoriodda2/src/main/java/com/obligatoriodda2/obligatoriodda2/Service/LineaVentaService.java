package com.obligatoriodda2.obligatoriodda2.Service;

import java.util.List;
import com.obligatoriodda2.obligatoriodda2.Entity.LineaVenta;

public interface LineaVentaService {
    public LineaVenta agregar(LineaVenta u);
    public boolean eliminar(int id);
    public LineaVenta modificar(LineaVenta u);
    public LineaVenta conseguirLineaVenta(int id);
    public List<LineaVenta> listar();
    public boolean stockSuficiente(LineaVenta lineaVenta);
}

