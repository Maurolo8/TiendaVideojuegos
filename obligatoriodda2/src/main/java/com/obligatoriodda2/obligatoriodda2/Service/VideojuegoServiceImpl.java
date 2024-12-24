package com.obligatoriodda2.obligatoriodda2.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.obligatoriodda2.obligatoriodda2.Entity.LineaVenta;
import com.obligatoriodda2.obligatoriodda2.Entity.Venta;
import com.obligatoriodda2.obligatoriodda2.Entity.Videojuego;
import com.obligatoriodda2.obligatoriodda2.Repository.VideojuegoRepository;
import com.obligatoriodda2.obligatoriodda2.Utils.AppException;

@Service
public class VideojuegoServiceImpl implements VideojuegoService{
    @Autowired
    private VideojuegoRepository videojuegoRepository;

    public Videojuego agregar(Videojuego u){
        return videojuegoRepository.save(u);
    }

    public boolean eliminar(int id){
        if(videojuegoRepository.existsById(id)){
            videojuegoRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Videojuego modificar(Videojuego u){
        if(videojuegoRepository.existsById(u.getId())){
            return videojuegoRepository.save(u);
        }
        return null;
    }

    public Videojuego conseguirVideojuego(int Id){
        if(videojuegoRepository.existsById(Id)){
            return videojuegoRepository.findById(Id).get();
        }
        return null;
    }

    public List<Videojuego> listar(){
        return videojuegoRepository.findAll();
    }

    public void reducirStock(Venta venta) {
        List<LineaVenta> lineas = venta.getLineasVenta();
    
        for (LineaVenta linea : lineas) {
            
            Videojuego videojuego = videojuegoRepository.findById(linea.getVideojuego().getId())
                                    .orElseThrow(() -> new IllegalArgumentException("Videojuego no encontrado con ID: " + linea.getVideojuego().getId()));
    
            
            int nuevoStock = videojuego.getCantidadStock() - linea.getCantidad();
    
            
            if (nuevoStock < 0) {
                throw new IllegalArgumentException("No hay suficiente stock para el videojuego: " + videojuego.getNombre());
            }
    
          
            videojuego.setCantidadStock(nuevoStock);
    
            
            videojuegoRepository.save(videojuego);
        }
    }

    public List<Videojuego> listarPorCantidad(int cantidad) throws AppException{
        try{
            return videojuegoRepository.findByCantidadStockLessThanEqual(cantidad);
        }
        catch(Exception e){
            throw new AppException("Error al buscar una cantidad menor a la asignada");
        }
    }
}
