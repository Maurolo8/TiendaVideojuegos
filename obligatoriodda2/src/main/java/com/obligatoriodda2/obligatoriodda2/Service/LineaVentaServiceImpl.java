package com.obligatoriodda2.obligatoriodda2.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.obligatoriodda2.obligatoriodda2.Entity.LineaVenta;
import com.obligatoriodda2.obligatoriodda2.Repository.LineaVentaRepository;

@Service
public class LineaVentaServiceImpl implements LineaVentaService{
    @Autowired
    private LineaVentaRepository lineaVentaRepository;

    public LineaVenta agregar(LineaVenta u){
        return lineaVentaRepository.save(u);
    }

    public boolean eliminar(int id){
        if(lineaVentaRepository.existsById(id)){
            lineaVentaRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public LineaVenta modificar(LineaVenta u){
        if(lineaVentaRepository.existsById(u.getId())){
            return lineaVentaRepository.save(u);
        }
        return null;
    }

    public LineaVenta conseguirLineaVenta(int Id){
        if(lineaVentaRepository.existsById(Id)){
            return lineaVentaRepository.findById(Id).get();
        }
        return null;
    }

    public List<LineaVenta> listar(){
        return lineaVentaRepository.findAll();
    }

    public boolean stockSuficiente(LineaVenta lineaVenta){
        int cantCompra = lineaVenta.getCantidad();
        int cantExist = lineaVenta.getVideojuego().getCantidadStock();
        if (cantCompra <= cantExist) {
            return true;
        }
        return false;
    }
}
