package com.obligatoriodda2.obligatoriodda2.Service;

import java.util.List;
import com.obligatoriodda2.obligatoriodda2.Entity.UsuarioPremium;

public interface UsuarioPremiumService {
    public UsuarioPremium agregar(UsuarioPremium u);
    public boolean eliminar(int id);
    public UsuarioPremium modificar(UsuarioPremium u);
    public UsuarioPremium conseguirUsuario(int id);
    public List<UsuarioPremium> listar();
}

