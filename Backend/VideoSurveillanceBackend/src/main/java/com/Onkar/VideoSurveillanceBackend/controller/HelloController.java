package com.Onkar.VideoSurveillanceBackend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class HelloController {

    @GetMapping("/home")
    public String helloController(){
        return "Home";
    }

    @GetMapping("/admin/home")
    public String helloControllerAdmin(){
        return "Home Admin";
    }

    @GetMapping("/user/home")
    public String helloControllerUser(){
        return "Home User";
    }
}
