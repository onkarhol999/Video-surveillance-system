package com.Onkar.VideoSurveillanceSystemBackend.repo;

import com.Onkar.VideoSurveillanceSystemBackend.model.AlartRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlertRequestRepository extends JpaRepository<AlartRequest, Integer> {
}
