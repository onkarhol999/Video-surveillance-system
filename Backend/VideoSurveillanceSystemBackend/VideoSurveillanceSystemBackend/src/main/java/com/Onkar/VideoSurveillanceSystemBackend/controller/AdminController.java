package com.Onkar.VideoSurveillanceSystemBackend.controller;

import com.Onkar.VideoSurveillanceSystemBackend.model.Admin;
import com.Onkar.VideoSurveillanceSystemBackend.repo.AdminRepo;
import com.Onkar.VideoSurveillanceSystemBackend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AdminController {

    @Autowired
    private AdminService service;

    @PostMapping("/register")
    public Admin addAdmin(@RequestBody Admin admin){
        return service.addAdmin(admin);
    }

    @GetMapping("/getAdmin")
    public List<Admin> getAllAdmin(){
        return service.getAllAdmin();
    }

    @PostMapping("/AdminLogin")
    public boolean adminPresent(@RequestBody Admin admin){
        System.out.println("Received username: " + admin.getUserName());
        System.out.println("Received password: " + admin.getPassword());
        return service.adminPresent(admin);
    }

}
