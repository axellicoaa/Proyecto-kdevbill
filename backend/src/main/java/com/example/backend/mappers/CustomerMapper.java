package com.example.backend.mappers;

import com.example.backend.dto.CustomerResponse;
import com.example.backend.entities.Customer;

public class CustomerMapper {

  public static CustomerResponse toResponse(Customer customer) {
    return CustomerResponse.builder()
      .id(customer.getId())
      .name(customer.getName())
      .email(customer.getEmail())
      .ownerUsername(customer.getOwner().getUsername())
      .build();
  }
}
