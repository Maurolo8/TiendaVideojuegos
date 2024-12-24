package com.obligatoriodda2.obligatoriodda2.Entity;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipo_usuario", discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue("USUARIO")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nombre;
    private String correo;
    private LocalDate registro;
    @ElementCollection
    private List<Integer> historial = new ArrayList<>();

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getCorreo() {
        return correo;
    }
    public void setCorreo(String correo) {
        this.correo = correo;
    }
    public LocalDate getRegistro() {
        return registro;
    }
    public void setRegistro(LocalDate registro) {
        this.registro = registro;
    }
    
    
    public Usuario(String nombre, String correo, LocalDate registro, ArrayList<Integer> historial) {
        this.nombre = nombre;
        this.correo = correo;
        this.registro = registro;
        this.historial = historial;
    }
    public Usuario(){
        //Constructor vacio
    }
    public List<Integer> getHistorial() {
        return historial;
    }
    public void setHistorial(List<Integer> historial) {
        this.historial = historial;
    }
    
}