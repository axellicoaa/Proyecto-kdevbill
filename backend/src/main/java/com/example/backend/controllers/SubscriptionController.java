package com.example.backend.controllers;

import com.example.backend.config.AuthHelper;
import com.example.backend.dto.SubscriptionCreateRequest;
import com.example.backend.dto.SubscriptionResponse;
import com.example.backend.dto.SubscriptionUpdateRequest;
import com.example.backend.services.SubscriptionService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/subscriptions")
@RequiredArgsConstructor
public class SubscriptionController {

  private final SubscriptionService subscriptionService;
  private final AuthHelper auth;

  @PostMapping
  public SubscriptionResponse create(
    @RequestBody SubscriptionCreateRequest request,
    Authentication authentication
  ) {
    return subscriptionService.createSubscription(
      request,
      auth.getUserId(authentication),
      auth.isAdmin(authentication)
    );
  }

  @GetMapping
  public List<SubscriptionResponse> listMine(Authentication authentication) {
    return subscriptionService.getMySubscriptions(
      auth.getUserId(authentication),
      auth.isAdmin(authentication)
    );
  }

  @GetMapping("/customer/{customerId}")
  public List<SubscriptionResponse> listByCustomer(
    @PathVariable Long customerId,
    Authentication authentication
  ) {
    return subscriptionService.getSubscriptionsByCustomer(
      customerId,
      auth.getUserId(authentication),
      auth.isAdmin(authentication)
    );
  }

  @PutMapping("/{id}")
  public SubscriptionResponse update(
    @PathVariable Long id,
    @RequestBody SubscriptionUpdateRequest request,
    Authentication authentication
  ) {
    return subscriptionService.updateSubscription(
      id,
      request,
      auth.getUserId(authentication),
      auth.isAdmin(authentication)
    );
  }

  @PostMapping("/{id}/renew")
  public SubscriptionResponse renew(
    @PathVariable Long id,
    Authentication authentication
  ) {
    return subscriptionService.renewSubscription(
      id,
      auth.getUserId(authentication),
      auth.isAdmin(authentication)
    );
  }
}
