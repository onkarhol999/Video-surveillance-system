package com.Onkar.VideoSurveillanceSystemBackend.service;

import com.Onkar.VideoSurveillanceSystemBackend.model.Admin;
import com.Onkar.VideoSurveillanceSystemBackend.repo.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepo repo;

    public Admin addAdmin(Admin admin) {
        return repo.save(admin);
    }

    public List<Admin> getAllAdmin() {
        return repo.findAll();
    }

    public boolean adminPresent(Admin admin) {
        List<Admin> list = repo.findAll();

        for(Admin adm : list){
            if(adm.getPassword().equals(admin.getPassword()) && adm.getUserName().equals(admin.getUserName())){
                return true;
            }
        }
        return false;
    }
}
