package com.example.backend.services.interfaces;

import com.example.backend.dto.AuthenticationResponse;
import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.RegisterRequest;

public interface AuthenticationServiceI {
  /**
   * Autentica un usuario existente.
   *
   * @param request Credenciales de login
   * @return Respuesta con tokens JWT
   * @throws RuntimeException si las credenciales son inválidas
   */
  AuthenticationResponse authenticate(LoginRequest request);

  /**
   * Registra un nuevo usuario con rol USER.
   *
   * @param request Datos de registro
   * @return Respuesta con tokens JWT
   */
  AuthenticationResponse register(RegisterRequest request);
}
