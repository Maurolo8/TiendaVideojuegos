package com.obligatoriodda2.obligatoriodda2.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.obligatoriodda2.obligatoriodda2.Entity.UsuarioAdmin;
import com.obligatoriodda2.obligatoriodda2.Repository.UsuarioAdminRepository;
import com.obligatoriodda2.obligatoriodda2.Utils.AppException;

@Service
public class UsuarioAdminServiceImpl implements UsuarioAdminService{
    @Autowired
    private UsuarioAdminRepository usuarioRepository;

    public UsuarioAdmin login(String correo, String contrasena) {
        // Busca el usuario por correo y contraseña
        UsuarioAdmin admin = usuarioRepository.findByCorreoAndContrasena(correo, contrasena);
        if (admin == null) {
            throw new IllegalArgumentException("Credenciales incorrectas");
        }
        return admin;
    }

    public UsuarioAdmin agregar(UsuarioAdmin u){
        return usuarioRepository.save(u);
    }

    public boolean eliminar(int id){
        if(usuarioRepository.existsById(id)){
            usuarioRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public UsuarioAdmin modificar(UsuarioAdmin u){
        if(usuarioRepository.existsById(u.getId())){
            return usuarioRepository.save(u);
        }
        return null;
    }

    public UsuarioAdmin conseguirUsuario(int Id){
        if(usuarioRepository.existsById(Id)){
            return usuarioRepository.findById(Id).get();
        }
        return null;
    }

    public List<UsuarioAdmin> listar(){
        return usuarioRepository.findAll();
    }

    // public boolean existeCorreoContra(String correo, String contrasena) throws AppException{
    //         if(usuarioRepository.existsByCorreoAndContrasena(correo, contrasena)){
    //             return true;
    //         }
    //         else{
    //             throw new AppException("Combinacion de usuario y contraseña no encontrados");
    //         }
    // }
}
