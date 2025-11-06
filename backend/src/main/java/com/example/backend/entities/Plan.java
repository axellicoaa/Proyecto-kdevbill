package com.example.backend.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Plan {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;

  private Double priceMonthly; // precio mensual
  private Double priceYearly; // precio anual

  @Enumerated(EnumType.STRING)
  private BillingCycle billingCycle; // puede ser opcional si usas ambas

  private boolean active;
}
