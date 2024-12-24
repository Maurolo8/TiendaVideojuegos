package com.obligatoriodda2.obligatoriodda2.Service;

import java.util.List;
import com.obligatoriodda2.obligatoriodda2.Entity.Usuario;

public interface UsuarioService {
    public Usuario agregar(Usuario u);
    public boolean eliminar(int id);
    public Usuario modificar(Usuario u);
    public Usuario conseguirUsuario(int id);
    public List<Usuario> listar();
    public List<Usuario> listarPorTipoUsuario(String tipo);
}

