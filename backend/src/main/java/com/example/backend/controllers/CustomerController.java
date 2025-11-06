package com.example.backend.controllers;

import com.example.backend.dto.CustomerCreateRequest;
import com.example.backend.dto.CustomerResponse;
import com.example.backend.entities.Customer;
import com.example.backend.entities.User;
import com.example.backend.mappers.CustomerMapper;
import com.example.backend.repositories.CustomerRepository;
import com.example.backend.repositories.UserRepository;
import com.example.backend.services.CustomerService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customers")
@RequiredArgsConstructor
public class CustomerController {

  private final CustomerService customerService;
  private final UserRepository userRepository;
  private final CustomerRepository customerRepository;

  @PostMapping
  public Customer createCustomer(
    @RequestBody CustomerCreateRequest request,
    Authentication auth
  ) {
    User owner = userRepository
      .findByUsername(auth.getName())
      .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

    Customer customer = new Customer();
    customer.setName(request.getName());
    customer.setEmail(request.getEmail());
    customer.setOwner(owner);

    return customerRepository.save(customer);
  }

  @GetMapping
  public List<CustomerResponse> getAllCustomers(Authentication auth) {
    boolean isAdmin = auth
      .getAuthorities()
      .stream()
      .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

    if (!isAdmin) throw new RuntimeException(
      "Solo ADMIN puede listar todos los clientes"
    );

    return customerService.getAllCustomers();
  }

  @GetMapping("/{id}")
  public CustomerResponse getCustomerById(
    @PathVariable Long id,
    Authentication auth
  ) {
    boolean isAdmin = auth
      .getAuthorities()
      .stream()
      .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

    String username = auth.getName(); // <-- username real del usuario autenticado
    Long currentUserId = userRepository
      .findByUsername(username)
      .orElseThrow(() -> new RuntimeException("Usuario no encontrado"))
      .getId();

    return customerService.getCustomerById(id, currentUserId, isAdmin);
  }

  @GetMapping("/my")
  public List<CustomerResponse> getMyCustomers(Authentication auth) {
    String username = auth.getName();
    User owner = userRepository
      .findByUsername(username)
      .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

    return customerRepository
      .findByOwnerId(owner.getId())
      .stream()
      .map(CustomerMapper::toResponse)
      .toList();
  }
}
