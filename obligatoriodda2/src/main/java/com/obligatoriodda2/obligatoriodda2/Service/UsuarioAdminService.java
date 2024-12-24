package com.obligatoriodda2.obligatoriodda2.Service;

import java.util.List;
import com.obligatoriodda2.obligatoriodda2.Entity.UsuarioAdmin;
import com.obligatoriodda2.obligatoriodda2.Utils.AppException;

public interface UsuarioAdminService {
    public UsuarioAdmin agregar(UsuarioAdmin u);
    public boolean eliminar(int id);
    public UsuarioAdmin modificar(UsuarioAdmin u);
    public UsuarioAdmin conseguirUsuario(int id);
    public List<UsuarioAdmin> listar();
    public UsuarioAdmin login(String correo, String contrasena);
}

