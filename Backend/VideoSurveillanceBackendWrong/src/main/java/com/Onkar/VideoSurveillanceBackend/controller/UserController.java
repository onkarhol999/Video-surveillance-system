package com.Onkar.VideoSurveillanceBackend.controller;


import com.Onkar.VideoSurveillanceBackend.model.User;
import com.Onkar.VideoSurveillanceBackend.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:5173/")
public class UserController {

    @Autowired
    private UserRepo repo;

    @Autowired
    PasswordEncoder encoder;

    @PostMapping("/register/user")
    public User createUser(@RequestBody User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return repo.save(user);
    }
}
