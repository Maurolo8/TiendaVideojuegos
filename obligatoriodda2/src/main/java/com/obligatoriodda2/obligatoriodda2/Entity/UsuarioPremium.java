package com.obligatoriodda2.obligatoriodda2.Entity;

import java.time.LocalDate;
import java.util.ArrayList;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("PREMIUM")
public class UsuarioPremium extends Usuario{
    private int descuento;
    private LocalDate suscripto;
    
    public int getDescuento() {
        return descuento;
    }
    public void setDescuento(int descuento) {
        this.descuento = descuento;
    }
    public LocalDate getSuscripto() {
        return suscripto;
    }
    public void setSuscripto(LocalDate suscripto) {
        this.suscripto = suscripto;
    }
    public UsuarioPremium(String nombre, String correo, LocalDate registro, ArrayList<Integer> historial, int descuento,
            LocalDate suscripto) {
        super(nombre, correo, registro, historial);
        this.descuento = descuento;
        this.suscripto = suscripto;
    }
    public UsuarioPremium() {

    }

    
}
