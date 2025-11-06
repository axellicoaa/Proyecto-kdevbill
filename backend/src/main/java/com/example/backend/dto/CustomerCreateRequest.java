package com.example.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CustomerCreateRequest {

  @NotBlank
  private String name;

  @NotBlank
  @Email
  private String email;

  @NotNull
  private Long ownerId; // ID del User dueño del cliente
}
