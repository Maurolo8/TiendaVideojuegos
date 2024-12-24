package com.obligatoriodda2.obligatoriodda2.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.obligatoriodda2.obligatoriodda2.Entity.UsuarioPremium;
import com.obligatoriodda2.obligatoriodda2.Repository.UsuarioPremiumRepository;

@Service
public class UsuarioPremiumServiceImpl implements UsuarioPremiumService{
    @Autowired
    private UsuarioPremiumRepository usuarioRepository;

    public UsuarioPremium agregar(UsuarioPremium u){
        return usuarioRepository.save(u);
    }

    public boolean eliminar(int id){
        if(usuarioRepository.existsById(id)){
            usuarioRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public UsuarioPremium modificar(UsuarioPremium u){
        if(usuarioRepository.existsById(u.getId())){
            return usuarioRepository.save(u);
        }
        return null;
    }

    public UsuarioPremium conseguirUsuario(int Id){
        if(usuarioRepository.existsById(Id)){
            return usuarioRepository.findById(Id).get();
        }
        return null;
    }

    public List<UsuarioPremium> listar(){
        return usuarioRepository.findAll();
    }
}
