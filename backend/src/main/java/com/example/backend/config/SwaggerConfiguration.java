package com.example.backend.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfiguration {

  @Bean
  public OpenAPI customOpenAPI() {
    return new OpenAPI()
      .info(
        new Info()
          .title("JWT Authentication API")
          .description(
            "API REST para autenticación con JWT usando Spring Boot y Spring Security"
          )
          .version("1.0")
          .contact(
            new Contact()
              .name("SASF Team")
              .email("contact@sasf.com")
              .url("https://sasf.com")
          )
          .license(
            new License()
              .name("MIT License")
              .url("https://opensource.org/licenses/MIT")
          )
      )
      .addSecurityItem(
        new SecurityRequirement().addList("Bearer Authentication")
      )
      .components(
        new Components()
          .addSecuritySchemes("Bearer Authentication", createAPIKeyScheme())
      );
  }

  private SecurityScheme createAPIKeyScheme() {
    return new SecurityScheme()
      .type(SecurityScheme.Type.HTTP)
      .bearerFormat("JWT")
      .scheme("bearer");
  }
}
