package com.example.backend.controllers;

import com.example.backend.dto.PlanCreateRequest;
import com.example.backend.dto.PlanResponse;
import com.example.backend.dto.PlanUpdateRequest;
import com.example.backend.services.PlanService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/plans")
@RequiredArgsConstructor
public class PlanController {

  private final PlanService planService;

  private boolean isAdmin(Authentication auth) {
    return auth
      .getAuthorities()
      .stream()
      .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
  }

  @PostMapping
  public PlanResponse createPlan(
    @RequestBody PlanCreateRequest request,
    Authentication auth
  ) {
    if (!isAdmin(auth)) throw new RuntimeException(
      "Solo ADMIN puede crear planes"
    );
    return planService.createPlan(request);
  }

  @GetMapping
  public List<PlanResponse> getPlans() {
    return planService.getAllPlans();
  }

  @PutMapping("/{id}")
  public PlanResponse updatePlan(
    @PathVariable Long id,
    @RequestBody PlanUpdateRequest request,
    Authentication auth
  ) {
    if (!isAdmin(auth)) throw new RuntimeException(
      "Solo ADMIN puede editar planes"
    );
    return planService.updatePlan(id, request);
  }

  @DeleteMapping("/{id}")
  public void disablePlan(@PathVariable Long id, Authentication auth) {
    if (!isAdmin(auth)) throw new RuntimeException(
      "Solo ADMIN puede deshabilitar planes"
    );
    planService.disablePlan(id);
  }
}
