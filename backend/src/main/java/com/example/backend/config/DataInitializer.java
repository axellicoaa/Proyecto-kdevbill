package com.example.backend.config;

import com.example.backend.entities.Role;
import com.example.backend.entities.User;
import com.example.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @Override
  public void run(String... args) throws Exception {
    if (!userRepository.existsByUsername("admin")) {
      User admin = User.builder()
        .username("admin")
        .email("admin@example.com")
        .password(passwordEncoder.encode("admin123"))
        .role(Role.ADMIN)
        .build();
      userRepository.save(admin);
    }

    if (!userRepository.existsByUsername("user")) {
      User user = User.builder()
        .username("user")
        .email("user@example.com")
        .password(passwordEncoder.encode("user123"))
        .role(Role.USER)
        .build();
      userRepository.save(user);
    }
  }
}
