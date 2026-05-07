# Pruebas de la API - Incidents Management System (IMS)

Usando Postman

---

## Instalación de Postman

1. Descarga Postman: https://www.postman.com/downloads/
2. Instala siguiendo los pasos
3. Abre Postman

---

## PRUEBA 1: Health Check

Objetivo: Verificar que la API está funcionando

### Pasos en Postman:

1. Click en "+ New" (arriba a la izquierda)
2. Selecciona "HTTP Request"
3. Verifica que esté en "GET" (dropdown arriba a la izquierda)
4. En el campo de URL, escribe: http://localhost:3000/health
5. Click en "Send"

Respuesta esperada:
json
{
"status": "API funcionando correctamente"
}

Código de estado: 200 OK

Que significa: La API está viva y lista para recibir solicitudes.

---

## PRUEBA 2: Registrar Incidente

Objetivo: Crear un nuevo incidente en la base de datos

### Pasos en Postman:

1. Click en "+ New"
2. Selecciona "HTTP Request"
3. Cambia a "POST" (dropdown arriba a la izquierda)
4. URL: http://localhost:3000/incidents
5. Click en pestaña "Body"
6. Selecciona "raw"
7. En el dropdown que dice "Text", selecciona "JSON"
8. Pega este contenido:

json
{
"title": "Servidor web caído",
"description": "El servidor principal no responde desde las 10:30 AM",
"severity": "high"
}

9. Click en "Send"

Respuesta esperada:
json
{
"id": "eb961f42-72fb-44dd-835f-05695316507f",
"title": "Servidor web caído",
"description": "El servidor principal no responde desde las 10:30 AM",
"severity": "high",
"status": "open",
"created_at": "2026-05-07T02:53:20.145Z"
}

Código de estado: 201 Created

Que significa: El incidente fue creado exitosamente. Guarda el "id" que te devuelve (lo necesitarás después).

Validaciones:

- "title" es obligatorio
- "description" es obligatorio
- "severity" es opcional (por defecto: "medium")
- Se asigna automáticamente un UUID único
- El estado inicial es siempre "open"
- Se registra automáticamente la fecha de creación

---

## PRUEBA 3: Listar Todos los Incidentes

Objetivo: Ver todos los incidentes registrados

### Pasos en Postman:

1. Click en "+ New"
2. Selecciona "HTTP Request"
3. Verifica que esté en "GET"
4. URL: http://localhost:3000/incidents
5. Click en "Send"

Respuesta esperada:
json
[
{
"id": "eb961f42-72fb-44dd-835f-05695316507f",
"title": "Servidor web caído",
"description": "El servidor principal no responde desde las 10:30 AM",
"status": "open",
"severity": "high",
"created_at": "2026-05-07T02:53:20.145Z",
"updated_at": "2026-05-07T02:53:20.145Z"
},
{
"id": "660f9511-f39c-52e5-b827-557766551111",
"title": "Base de datos lenta",
"description": "Las consultas están tardando más de 30 segundos",
"status": "open",
"severity": "medium",
"created_at": "2026-05-07T02:54:10.200Z",
"updated_at": "2026-05-07T02:54:10.200Z"
}
]

Código de estado: 200 OK

Que significa: Es un array (lista) con todos los incidentes. Se ordena por fecha de creación (más recientes primero).

Características:

- Retorna array vacío [] si no hay incidentes
- Los incidentes se ordenan por fecha (más recientes primero)
- Incluye todos los campos del incidente

---

## PRUEBA 4: Consultar Incidente por ID

Objetivo: Ver un incidente específico usando su ID

### Pasos en Postman:

1. Click en "+ New"
2. Selecciona "HTTP Request"
3. Verifica que esté en "GET"
4. URL: http://localhost:3000/incidents/eb961f42-72fb-44dd-835f-05695316507f

   IMPORTANTE: Reemplaza "eb961f42-72fb-44dd-835f-05695316507f" con el ID que obtuviste en la PRUEBA 2

5. Click en "Send"

Respuesta esperada (si existe):
json
{
"id": "eb961f42-72fb-44dd-835f-05695316507f",
"title": "Servidor web caído",
"description": "El servidor principal no responde desde las 10:30 AM",
"status": "open",
"severity": "high",
"created_at": "2026-05-07T02:53:20.145Z",
"updated_at": "2026-05-07T02:53:20.145Z"
}

Código de estado: 200 OK

Respuesta esperada (si NO existe):
json
{
"error": "Incidente no encontrado"
}

Código de estado: 404 Not Found

---

## PRUEBA 5: Actualizar Estado de Incidente

Objetivo: Cambiar el estado de un incidente (ej: de "open" a "resolved")

### Pasos en Postman:

1. Click en "+ New"
2. Selecciona "HTTP Request"
3. Cambia a "PATCH" (dropdown arriba a la izquierda)
4. URL: http://localhost:3000/incidents/eb961f42-72fb-44dd-835f-05695316507f

   IMPORTANTE: Reemplaza el ID con el de la PRUEBA 2

5. Click en pestaña "Body"
6. Selecciona "raw"
7. En el dropdown, selecciona "JSON"
8. Pega:

json
{
"status": "resolved"
}

9. Click en "Send"

Respuesta esperada (éxito):
json
{
"message": "Incidente actualizado",
"id": "eb961f42-72fb-44dd-835f-05695316507f",
"status": "resolved"
}

Código de estado: 200 OK

Que significa: El estado del incidente fue actualizado a "resolved".

Respuesta esperada (si el ID no existe):
json
{
"error": "Incidente no encontrado"
}

Código de estado: 404 Not Found

Respuesta esperada (si falta el campo status):
json
{
"error": "El campo status es requerido"
}

Código de estado: 400 Bad Request

---

## Caso de Uso Completo: Ciclo Completo de un Incidente

Escenario: Un usuario reporta un problema, lo escalamos, y después lo resolvemos.

### Paso 1: Crear un incidente

En Postman:

- POST > http://localhost:3000/incidents
- Body (JSON):

json
{
"title": "Fallo de autenticación",
"description": "Los usuarios no pueden iniciar sesión en la aplicación",
"severity": "critical"
}

Respuesta:
json
{
"id": "abc12345-6789-...",
"title": "Fallo de autenticación",
"description": "Los usuarios no pueden iniciar sesión en la aplicación",
"severity": "critical",
"status": "open",
"created_at": "2026-05-07T03:00:00.000Z"
}

Incidente creado. Guarda el ID.

---

### Paso 2: Verificar que aparece en la lista

En Postman:

- GET > http://localhost:3000/incidents

Respuesta:
Veras un array con el incidente que acabas de crear (y otros si existen).

Incidente visible en la lista.

---

### Paso 3: Ver detalles del incidente

En Postman:

- GET > http://localhost:3000/incidents/abc12345-6789-...

Respuesta:
Información completa del incidente.

Detalles verificados.

---

### Paso 4: Resolver el incidente

En Postman:

- PATCH > http://localhost:3000/incidents/abc12345-6789-...
- Body (JSON):

json
{
"status": "resolved"
}

Respuesta:
json
{
"message": "Incidente actualizado",
"id": "abc12345-6789-...",
"status": "resolved"
}

Incidente marcado como resuelto.

---

### Paso 5: Verificar que se actualizo

En Postman:

- GET > http://localhost:3000/incidents/abc12345-6789-...

Respuesta:
json
{
"id": "abc12345-6789-...",
"title": "Fallo de autenticación",
"description": "Los usuarios no pueden iniciar sesión en la aplicación",
"status": "resolved",
"severity": "critical",
"created_at": "2026-05-07T03:00:00.000Z",
"updated_at": "2026-05-07T03:05:30.000Z"
}

Estado actualizado correctamente. Ciclo completo terminado.

---

## Validaciones Implementadas

- Validacion - Descripcion - Codigo -

---

- Title requerido - Si no se envia "title", retorna error - 400 -
- Description requerido - Si no se envia "description", retorna error - 400 -
- Status requerido (PATCH) - Si no se envia "status" en actualizacion, retorna error - 400 -
- Incidente no encontrado - Si el ID no existe, retorna error - 404 -
- UUID unico - Cada incidente tiene un ID unico generado automaticamente - - -
- Timestamps automaticos - Se registran fechas de creacion y actualizacion - - -

---

## Estructura de la Base de Datos

Tabla: incidents

sql
CREATE TABLE incidents (
id TEXT PRIMARY KEY, -- UUID unico
title TEXT NOT NULL, -- Titulo del incidente
description TEXT NOT NULL, -- Descripcion detallada
status TEXT DEFAULT 'open', -- Estado: open, resolved, closed
severity TEXT DEFAULT 'medium', -- Severidad: low, medium, high, critical
created_at TEXT DEFAULT CURRENT_TIMESTAMP, -- Fecha de creacion
updated_at TEXT DEFAULT CURRENT_TIMESTAMP -- Fecha de ultima actualizacion
)

---
