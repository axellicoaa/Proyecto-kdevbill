/* package com.example.backend.config;

import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class GlobalExceptionHandler {
  /* // Manejo de RuntimeException (errores custom)
  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<ErrorResponse> handleRuntime(RuntimeException ex) {
    ErrorResponse response = ErrorResponse.builder()
      .message(ex.getMessage())
      .status(HttpStatus.BAD_REQUEST.value())
      .timestamp(LocalDateTime.now())
      .build();

    return ResponseEntity.badRequest().body(response);
  }

  // Manejo de validaciones @Valid
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ErrorResponse> handleValidation(
    MethodArgumentNotValidException ex
  ) {
    String errorMessage = ex
      .getBindingResult()
      .getFieldErrors()
      .stream()
      .map(error -> error.getField() + " " + error.getDefaultMessage())
      .findFirst()
      .orElse("Datos inválidos");

    ErrorResponse response = ErrorResponse.builder()
      .message(errorMessage)
      .status(HttpStatus.BAD_REQUEST.value())
      .timestamp(LocalDateTime.now())
      .build();

    return ResponseEntity.badRequest().body(response);
  }

  // Manejo general (fallback)
  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorResponse> handleGeneral(Exception ex) {
    ErrorResponse response = ErrorResponse.builder()
      .message("Ha ocurrido un error inesperado.")
      .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
      .timestamp(LocalDateTime.now())
      .build();

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
      response
    );
  } */
