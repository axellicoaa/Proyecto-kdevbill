package com.example.backend.entities;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Invoice {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Double amount;

  @Enumerated(EnumType.STRING)
  private InvoiceStatus status;

  private LocalDate dueDate;
  private LocalDateTime issuedAt;

  @ManyToOne
  @JoinColumn(name = "subscription_id")
  private Subscription subscription;

  @OneToMany(mappedBy = "invoice")
  private List<Payment> payments;
}
