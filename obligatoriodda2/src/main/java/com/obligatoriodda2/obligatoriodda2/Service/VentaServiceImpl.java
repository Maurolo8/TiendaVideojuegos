package com.obligatoriodda2.obligatoriodda2.Service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.obligatoriodda2.obligatoriodda2.Entity.LineaVenta;
import com.obligatoriodda2.obligatoriodda2.Entity.Usuario;
import com.obligatoriodda2.obligatoriodda2.Entity.Venta;
import com.obligatoriodda2.obligatoriodda2.Repository.VentaRepository;
import com.obligatoriodda2.obligatoriodda2.Utils.AppException;

@Service
public class VentaServiceImpl implements VentaService{
    @Autowired
    private VentaRepository ventaRepository;

    public Venta guardarVenta(Venta venta) {
        // Configurar relaciones (si necesario)
        for (LineaVenta linea : venta.getLineasVenta()) {
            linea.setVenta(venta); // Relación bidireccional
        }
        return ventaRepository.save(venta);
    }

    public boolean eliminar(int id){
        if(ventaRepository.existsById(id)){
            ventaRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Venta modificar(Venta u){
        if(ventaRepository.existsById(u.getId())){
            return ventaRepository.save(u);
        }
        return null;
    }

    public Venta conseguirVenta(int Id){
        if(ventaRepository.existsById(Id)){
            return ventaRepository.findById(Id).get();
        }
        return null;
    }

    public List<Venta> listar(){
        return ventaRepository.findAll();
    }

    public List<Venta> listarVentasUsuario(Usuario usuario) throws AppException{
        try{
            return ventaRepository.findByUsuario(usuario);
        }   
        catch(Exception e){
            throw new AppException("Fallo al buscar usuario por id");
        } 
    }

    public List<Venta> listarPorFecha(LocalDate fecha) throws AppException{
        try{
            return ventaRepository.findByFechaCompra(fecha);
        }
        catch(Exception e ){
            throw new AppException("Error al filtrar por fecha de compra");
        }
    }
}
