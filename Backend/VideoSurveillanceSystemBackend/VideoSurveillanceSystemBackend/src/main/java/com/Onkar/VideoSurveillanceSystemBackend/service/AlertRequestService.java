package com.Onkar.VideoSurveillanceSystemBackend.service;

import com.Onkar.VideoSurveillanceSystemBackend.model.AlartRequest;
import com.Onkar.VideoSurveillanceSystemBackend.repo.AlertRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AlertRequestService {

    @Autowired
    private AlertRequestRepository repo;

    public void sendAlert(AlartRequest alart) {

    }
}
