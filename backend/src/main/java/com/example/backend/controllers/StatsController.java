package com.example.backend.controllers;

import com.example.backend.config.AuthHelper;
import com.example.backend.dto.StatsResponse;
import com.example.backend.services.StatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/stats")
@RequiredArgsConstructor
public class StatsController {

  private final StatsService statsService;
  private final AuthHelper userHelper;

  @GetMapping
  public StatsResponse getStats(Authentication auth) {
    Long userId = userHelper.getUserId(auth);
    boolean isAdmin = userHelper.isAdmin(auth);

    return statsService.getStats(userId, isAdmin);
  }
}
