package com.obligatoriodda2.obligatoriodda2.Entity;

import java.time.LocalDate;
import java.util.ArrayList;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("ADMIN")
public class UsuarioAdmin extends Usuario{
    private int descuento;
    private String contrasena;
    
    public int getDescuento() {
        return descuento;
    }
    public void setDescuento(int descuento) {
        this.descuento = descuento;
    }
    public String getContrasena() {
        return contrasena;
    }
    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
    public UsuarioAdmin(String nombre, String correo, LocalDate registro, ArrayList<Integer> historial, int descuento,
            String contrasena) {
        super(nombre, correo, registro, historial);
        this.descuento = descuento;
        this.contrasena = contrasena;
    }
    public UsuarioAdmin() {

    }

    
}
