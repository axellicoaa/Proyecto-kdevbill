package com.example.backend.config;

import com.example.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthHelper {

  private final UserRepository userRepository;

  public Long getUserId(Authentication auth) {
    return userRepository
      .findByUsername(auth.getName())
      .orElseThrow(() -> new RuntimeException("Usuario no encontrado"))
      .getId();
  }

  public boolean isAdmin(Authentication auth) {
    return auth
      .getAuthorities()
      .stream()
      .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
  }
}
