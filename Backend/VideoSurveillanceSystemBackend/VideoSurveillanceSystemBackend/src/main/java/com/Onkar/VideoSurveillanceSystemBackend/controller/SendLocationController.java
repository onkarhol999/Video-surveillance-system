package com.Onkar.VideoSurveillanceSystemBackend.controller;

import com.Onkar.VideoSurveillanceSystemBackend.service.SendLocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class SendLocationController {

    @Autowired
    private SendLocationService service;

    public static class LocationRequest {
        public String latitude;
        public String longitude;
        public List<String> snapshots;
    }

    @PostMapping("/send-location")
    public String sendLocation(@RequestBody LocationRequest request) {
        service.sendLocationAndSnapshots(request.latitude, request.longitude, request.snapshots);
        return "✅ Email sent with location details.";
    }
}
