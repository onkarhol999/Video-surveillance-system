package com.Onkar.VideoSurveillanceSystemBackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.List;

@Entity
public class AlartRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private double latitude;
    private double longitude;
    private List<String> snapshots;

    public AlartRequest(double latitude, double longitude, List<String> snapshots) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.snapshots = snapshots;
    }

    public AlartRequest() {
    }

    // Getters and Setters

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public List<String> getSnapshots() {
        return snapshots;
    }

    public void setSnapshots(List<String> snapshots) {
        this.snapshots = snapshots;
    }
}
