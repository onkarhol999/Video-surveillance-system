package com.Onkar.VideoSurveillanceSystemBackend.model;

import java.util.List;

public class LocationRequest {
    private String latitude;
    private String longitude;
    private List<String> snapshots; // List of base64 encoded snapshots

    // Getters and Setters
    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public List<String> getSnapshots() {
        return snapshots;
    }

    public void setSnapshots(List<String> snapshots) {
        this.snapshots = snapshots;
    }
}