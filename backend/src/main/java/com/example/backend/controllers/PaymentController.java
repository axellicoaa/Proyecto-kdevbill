package com.example.backend.controllers;

import com.example.backend.dto.PaymentResponse;
import com.example.backend.repositories.UserRepository;
import com.example.backend.services.PaymentService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

  private final PaymentService paymentService;
  private final UserRepository userRepository;

  private Long getUserId(Authentication auth) {
    return userRepository
      .findByUsername(auth.getName())
      .orElseThrow(() -> new RuntimeException("Usuario no encontrado"))
      .getId();
  }

  private boolean isAdmin(Authentication auth) {
    return auth
      .getAuthorities()
      .stream()
      .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
  }

  @GetMapping
  public List<PaymentResponse> getPayments(Authentication auth) {
    return paymentService.getPayments(getUserId(auth), isAdmin(auth));
  }

  @GetMapping("/{id}")
  public PaymentResponse getPaymentById(
    @PathVariable Long id,
    Authentication auth
  ) {
    return paymentService.getPaymentById(id, getUserId(auth), isAdmin(auth));
  }
}
