# KdevBill - Sistema de Gestión de Clientes, Suscripciones y Facturación

KdevBill es una aplicación **Fullstack** diseñada para gestionar clientes, planes de suscripción, pagos y facturas, con roles de acceso diferenciados entre **ADMIN** y **USER**.

## 🚀 Tecnologías

### Backend
- Java 17+
- Spring Boot 3
- Spring Security + JWT
- JPA / Hibernate
- PostgreSQL
- Lombok
- Swagger UI (Documentación automática)

### Frontend
- Next.js (App Router)
- React 18
- Tailwind CSS
- Cookies + AuthContext
- Fetch API con token JWT

---

## 👥 Roles y Permisos

| Módulo | Usuario (USER) | Administrador (ADMIN) |
|-------|:--------------:|:---------------------:|
| Clientes | Ver solo sus clientes | CRUD de todos los clientes |
| Suscripciones | Crear y gestionar sus propias suscripciones | Gestionar todas |
| Planes | Solo ver catálogo | CRUD completo |
| Facturas | Ver y pagar sus facturas | Ver todas las facturas |
| Pagos | Ver solo sus pagos | Ver todos los pagos |

---

## 🗄️ Estructura General del Backend

backend/
├── config/ # Seguridad y JWT
├── controllers/ # Endpoints REST
├── dto/ # Request & Response DTOs
├── entities/ # Entidades JPA
├── mappers/ # Conversión Entidad <-> DTO
├── repositories/ # Repositorios JPA
└── services/ # Lógica de negocio

markdown
Copiar código

### Endpoints principales

| Módulo | Método | Endpoint | Descripción |
|--------|--------|---------|-------------|
| Auth | POST | `/auth/login` | Iniciar sesión y obtener token |
| Clientes | GET | `/customers/my` | Ver clientes del usuario |
| Clientes (ADMIN) | POST | `/customers` | Crear cliente |
| Suscripciones | GET | `/subscriptions` | Ver suscripciones |
| Suscripciones | POST | `/subscriptions` | Crear suscripción |
| Suscripciones | POST | `/subscriptions/{id}/renew` | Renovar y generar factura |
| Planes | GET | `/plans` | Listar planes |
| Planes (ADMIN) | POST/PUT/DELETE | `/plans` | CRUD completo |
| Facturas | GET | `/invoices` | Listar facturas |
| Facturas | POST | `/invoices/{id}/pay` | Pagar factura |
| Pagos | GET | `/payments` | Ver historial de pagos |

---

## 🎨 Funcionalidades del Frontend

- **Autenticación con JWT** guardado en cookies
- **Protección de rutas**
- **Dashboard personal**
- Gestión visual de:
  - Clientes
  - Suscripciones (con renovar, cambiar plan y estado)
  - Planes
  - Facturas (con detalle y botón pagar)
  - Pagos
- **Buscadores y filtros avanzados**

---

## ⚙️ Instalación y Ejecución

### Backend

1. Configurar base de datos PostgreSQL
```sql
CREATE DATABASE kdevbill;
Configurar application.properties:

properties
Copiar código
spring.datasource.url=jdbc:postgresql://localhost:5432/kdevbill
spring.datasource.username=postgres
spring.datasource.password=tu_clave
Ejecutar aplicación:

bash
Copiar código
mvn spring-boot:run
Swagger Docs:
➡️ http://localhost:8080/swagger-ui/index.html

Frontend
Instalar dependencias:

bash
Copiar código
npm install
Ejecutar:

bash
Copiar código
npm run dev
UI:
➡️ http://localhost:3000

✅ Estado del Proyecto
Componente	Estado
Autenticación JWT	✅
Gestión de Clientes	✅
Suscripciones + Renovaciones	✅
Facturas + Pagos	✅
Panel Administrativo	✅
Filtros, búsquedas y ordenamiento	✅

📌 Autor
Axel Licoa
Desarrollador FullStack
💻 Java · Spring · Next.js · PostgreSQL

💙 Licencia
Este proyecto se distribuye bajo licencia MIT.



