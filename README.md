# Sistema de Gestión de Incidentes TI - Caja Ica

API REST simple y funcional para registrar y consultar incidentes tecnológicos internos.

## Descripción de la solución

Esta es una API REST permite:
- Registros de nuevos incidentes tecnológicos
- Listar todos los incidentes
- Consultar incidentes por una ID
- Actualizar el estado de un incidente

La solución está en container con Docker y puede ejecutarse con un único comando.

## Tecnologías utilizadas

- **Node.js** (v18) - Runtime de JavaScript
- **Express.js** - Framework web minimalista
- **SQLite3** - Base de datos embebida y sin dependencias externas
- **Docker** - Containerización
- **Docker Compose** - Orquestación de contenedores

## Estructura del proyecto

   
incidents-api/
├── server.js              # Aplicación principal con endpoints
├── package.json           # Dependencias del proyecto
├── Dockerfile             # Configuración de Docker
├── docker-compose.yml     # Configuración de Docker Compose
└── README.md             # Este archivo
   

## Instrucciones de ejecución

### Requisitos previos
- Docker y Docker Compose instalados

### Ejecutar la solución

  bash
  docker compose up --build

Con el comando hace lo siguiente:
1. Construye la imagen Docker
2. Crea un volumen para persistencia de datos
3. Inicia el contenedor en puerto 3000
4. La API estará disponible en "http://localhost:3000"

### Verificar que la API está funcionando

  bash
  curl http://localhost:3000/health


Respuesta esperada:
   json
   {"status": "API funcionando correctamente"}
   

## Endpoints disponibles

### 1. **Registrar incidente**
   
POST /incidents
Content-Type: application/json

{
  "title": "Servidor caído",
  "description": "El servidor de producción no responde",
  "severity": "high"
}
   

**Respuesta (201 Created):**
   json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Servidor caído",
  "description": "El servidor de producción no responde",
  "severity": "high",
  "status": "open",
  "created_at": "2024-01-15T10:30:00.000Z"
}
   

### 2. **Listar incidentes**
   
GET /incidents
   

**Respuesta (200 OK):**
   json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Servidor caído",
    "description": "El servidor de producción no responde",
    "status": "open",
    "severity": "high",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
]
   

### 3. **Consultar incidente por ID**
   
GET /incidents/{id}
   

**Respuesta (200 OK):**
   json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Servidor caído",
  "description": "El servidor de producción no responde",
  "status": "open",
  "severity": "high",
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-01-15T10:30:00.000Z"
}
   

### 4. **Actualizar estado de incidente**
   
PATCH /incidents/{id}
Content-Type: application/json

{
  "status": "resolved"
}
   

**Respuesta (200 OK):**
   json
{
  "message": "Incidente actualizado",
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "resolved"
}
   

## Variables requeridas

- `PORT` (default: 3000) - Puerto en el que escucha la API
- `DB_PATH` (default: /data/incidents.db) - Ubicación de la base de datos SQLite

Estas variables se pueden configurar en el `docker-compose.yml` en la sección `environment`.

## Estructura de la base de datos

La tabla `incidents` contiene los siguientes campos:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | TEXT | Identificador único (UUID) |
| title | TEXT | Título del incidente |
| description | TEXT | Descripción detallada |
| status | TEXT | Estado (open, resolved, closed) |
| severity | TEXT | Severidad (low, medium, high, critical) |
| created_at | TEXT | Fecha de creación (ISO 8601) |
| updated_at | TEXT | Fecha de última actualización |

## Ejemplos de uso

### Registrar un incidente con curl

   bash
curl -X POST http://localhost:3000/incidents \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Base de datos lenta",
    "description": "Consultas tardando más de 30 segundos",
    "severity": "medium"
  }'
   

### Listar todos los incidentes

   bash
curl http://localhost:3000/incidents
   

### Consultar un incidente específico

   bash
curl http://localhost:3000/incidents/550e8400-e29b-41d4-a716-446655440000
   

### Actualizar el estado de un incidente

   bash
curl -X PATCH http://localhost:3000/incidents/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{"status": "resolved"}'
   

## Persistencia de datos

Los datos se almacenan en un volumen Docker denominado `incidents-data`. Esto garantiza que los datos persistan incluso si el contenedor se detiene.

Para ver los volúmenes:
   bash
docker volume ls
   

## Detener la aplicación

   bash
docker compose down
   

Para eliminar también los volúmenes (borra los datos):
   bash
docker compose down -v
   

## Supuestos y limitaciones

### Supuestos
- La API escucha en `0.0.0.0:3000` dentro del contenedor
- SQLite3 es suficiente para las necesidades de este sistema
- No hay autenticación ni autorización (puede agregarse si es necesario)
- Los IDs son generados automáticamente como UUIDs

### Limitaciones
- SQLite3 es apropiado para esta solución simple, pero para alta concurrencia se recomienda PostgreSQL
- No hay validación exhaustiva de datos (puede extenderse según necesidades)
- Los timestamps se almacenan en formato ISO 8601

## Posibles mejoras futuras

- Agregar autenticación JWT
- Implementar validación más robusta con Joi o Yup
- Migrar a PostgreSQL para mayor escalabilidad
- Agregar filtros avanzados en listar incidentes
- Implementar paginación
- Agregar logs estructurados
- Tests unitarios e integración
