package com.example.backend.services;

import com.example.backend.dto.CustomerCreateRequest;
import com.example.backend.dto.CustomerResponse;
import com.example.backend.entities.Customer;
import com.example.backend.entities.User;
import com.example.backend.mappers.CustomerMapper;
import com.example.backend.repositories.CustomerRepository;
import com.example.backend.repositories.UserRepository;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerService {

  private final CustomerRepository customerRepository;
  private final UserRepository userRepository;

  public CustomerResponse createCustomer(CustomerCreateRequest request) {
    User owner = userRepository
      .findById(request.getOwnerId())
      .orElseThrow(() -> new RuntimeException("Owner (User) no encontrado"));

    Customer customer = Customer.builder()
      .name(request.getName())
      .email(request.getEmail())
      .createdAt(LocalDateTime.now())
      .owner(owner)
      .build();

    customerRepository.save(customer);
    return CustomerMapper.toResponse(customer);
  }

  public List<CustomerResponse> getAllCustomers() {
    return customerRepository
      .findAll()
      .stream()
      .map(CustomerMapper::toResponse)
      .toList();
  }

  public CustomerResponse getCustomerById(
    Long id,
    Long authUserId,
    boolean isAdmin
  ) {
    Customer customer = customerRepository
      .findById(id)
      .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

    // Si no es admin, solo puede ver clientes propios
    if (!isAdmin && !customer.getOwner().getId().equals(authUserId)) {
      throw new RuntimeException("No autorizado");
    }

    return CustomerMapper.toResponse(customer);
  }
}
