package com.example.backend.controllers;

import com.example.backend.config.AuthHelper;
import com.example.backend.dto.InvoiceResponse;
import com.example.backend.services.InvoiceService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/invoices")
@RequiredArgsConstructor
public class InvoiceController {

  private final InvoiceService invoiceService;
  private final AuthHelper auth;

  @GetMapping
  public List<InvoiceResponse> getMyInvoices(Authentication authentication) {
    Long userId = auth.getUserId(authentication);
    boolean isAdmin = auth.isAdmin(authentication);
    return invoiceService.getInvoices(userId, isAdmin);
  }

  @GetMapping("/{id}")
  public InvoiceResponse getInvoiceById(
    @PathVariable Long id,
    Authentication authentication
  ) {
    Long userId = auth.getUserId(authentication);
    boolean isAdmin = auth.isAdmin(authentication);
    return invoiceService.getInvoice(id, userId, isAdmin);
  }

  @PostMapping("/{id}/pay")
  public InvoiceResponse payInvoice(
    @PathVariable Long id,
    Authentication authentication
  ) {
    Long userId = auth.getUserId(authentication);
    boolean isAdmin = auth.isAdmin(authentication);
    return invoiceService.payInvoice(id, userId, isAdmin);
  }
}
