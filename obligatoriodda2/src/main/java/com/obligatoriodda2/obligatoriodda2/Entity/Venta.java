package com.obligatoriodda2.obligatoriodda2.Entity;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.*;

@Entity
public class Venta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @OneToMany(mappedBy = "venta", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LineaVenta> lineasVenta;

    @Column(nullable = false)
    private LocalDate fechaCompra;

    @ManyToOne
    @JoinColumn(name = "administrador_id", nullable = false)
    private UsuarioAdmin administrador;

    // Getters y Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public List<LineaVenta> getLineasVenta() {
        return lineasVenta;
    }

    public void setLineasVenta(List<LineaVenta> lineasVenta) {
        this.lineasVenta = lineasVenta;
    }

    public LocalDate getFechaCompra() {
        return fechaCompra;
    }

    public void setFechaCompra(LocalDate fechaCompra) {
        this.fechaCompra = fechaCompra;
    }

    public UsuarioAdmin getAdministrador() {
        return administrador;
    }

    public void setAdministrador(UsuarioAdmin administrador) {
        this.administrador = administrador;
    }

    // Constructor
    public Venta(Usuario usuario, List<LineaVenta> lineasVenta, LocalDate fechaCompra, UsuarioAdmin administrador) {
        this.usuario = usuario;
        this.lineasVenta = lineasVenta;
        this.fechaCompra = fechaCompra;
        this.administrador = administrador;
    }

    public Venta() {
    }
}
