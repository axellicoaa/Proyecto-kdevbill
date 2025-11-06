package com.example.backend.services;

import com.example.backend.dto.StatsResponse;

public interface StatsServiceI {
  StatsResponse getStats(Long userId, boolean isAdmin);
}
