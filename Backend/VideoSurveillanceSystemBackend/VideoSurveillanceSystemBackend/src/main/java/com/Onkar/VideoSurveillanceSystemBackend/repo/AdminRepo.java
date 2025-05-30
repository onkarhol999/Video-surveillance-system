package com.Onkar.VideoSurveillanceSystemBackend.repo;

import com.Onkar.VideoSurveillanceSystemBackend.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepo extends JpaRepository<Admin, Integer> {
}
