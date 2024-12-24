package com.obligatoriodda2.obligatoriodda2.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.obligatoriodda2.obligatoriodda2.Entity.Usuario;
import com.obligatoriodda2.obligatoriodda2.Entity.UsuarioAdmin;
import com.obligatoriodda2.obligatoriodda2.Entity.UsuarioPremium;
import com.obligatoriodda2.obligatoriodda2.Repository.UsuarioRepository;

@Service
public class UsuarioServiceImpl implements UsuarioService{
    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario agregar(Usuario u){
        return usuarioRepository.save(u);
    }

    public boolean eliminar(int id){
        if(usuarioRepository.existsById(id)){
            usuarioRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Usuario modificar(Usuario u){
        if(usuarioRepository.existsById(u.getId())){
            return usuarioRepository.save(u);
        }
        return null;
    }

    public Usuario conseguirUsuario(int Id){
        if(usuarioRepository.existsById(Id)){
            return usuarioRepository.findById(Id).get();
        }
        return null;
    }

    public List<Usuario> listar(){
        return usuarioRepository.findAll();
    }

    public List<Usuario> listarPorTipoUsuario(String tipo) {
        switch (tipo.toUpperCase()) {
            case "ADMIN":
                return usuarioRepository.findByTipoUsuario(UsuarioAdmin.class);
            case "PREMIUM":
                return usuarioRepository.findByTipoUsuario(UsuarioPremium.class);
            case "REGULAR":
                return usuarioRepository.findByTipoUsuario(Usuario.class);
            default:
                throw new IllegalArgumentException("Tipo de usuario no válido: " + tipo);
        }
    }
}
