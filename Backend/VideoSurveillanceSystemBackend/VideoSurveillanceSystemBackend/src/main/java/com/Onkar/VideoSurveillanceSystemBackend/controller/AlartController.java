package com.Onkar.VideoSurveillanceSystemBackend.controller;


import com.Onkar.VideoSurveillanceSystemBackend.model.AlartRequest;
import com.Onkar.VideoSurveillanceSystemBackend.service.AlertRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AlartController {

    @Autowired
    private AlertRequestService service;

    @PostMapping("/snedAlert")
    public String sendAlert(@RequestBody AlartRequest alart){
        service.sendAlert(alart);
        return "Send......";
    }


}
