package com.example.backend.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<Object> handleRuntime(RuntimeException ex) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
      new ErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST.value())
    );
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Object> handleValidation(
    MethodArgumentNotValidException ex
  ) {
    String message = ex
      .getBindingResult()
      .getAllErrors()
      .get(0)
      .getDefaultMessage();
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
      new ErrorResponse(message, HttpStatus.BAD_REQUEST.value())
    );
  }

  record ErrorResponse(String message, int status) {}
}
