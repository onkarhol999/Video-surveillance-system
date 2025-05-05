package com.Onkar.VideoSurveillanceSystemBackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SendLocationService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${email.receiver}")
    private String toEmail;

    public void sendLocationAndSnapshots(String latitude, String longitude, List<String> snapshots) {
        String subject = "🚨 Suspicious Activity Detected - Location Info";

        StringBuilder body = new StringBuilder();
        body.append("Suspicious activity has been detected.\n\n");
        body.append("📍 Location:\n");
        body.append("Latitude: ").append(latitude).append("\n");
        body.append("Longitude: ").append(longitude).append("\n\n");

        if (snapshots != null && !snapshots.isEmpty()) {
            body.append("🖼️ Snapshots received:\n");
            for (int i = 0; i < snapshots.size(); i++) {
                body.append("Snapshot ").append(i + 1).append(": [base64 string, not shown here]\n");
            }
        } else {
            body.append("No snapshots were attached.\n");
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body.toString());
        message.setFrom(fromEmail);

        mailSender.send(message);
        System.out.println("Email sent successfully to " + toEmail);
    }
}
