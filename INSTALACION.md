# Guía de Instalación Rápida

## Requisitos Previos

- **Docker Desktop** instalado ([Descargar](https://www.docker.com/products/docker-desktop))
- **Git** instalado (opcional, para clonar repositorio)
- Puerto **3000** disponible en tu máquina

---

## Instalación en 3 Pasos

### Paso 1: Descargar el proyecto

#### Opción A: Descargar ZIP


1. Descargar incidents-api.zip
2. Extraer la carpeta
3. Abrir terminal en esa carpeta


#### Opción B: Clonar con Git

bash
git clone <URL_DEL_REPOSITORIO>
cd incidents-api


---

### Paso 2: Iniciar Docker

bash
docker compose up --build


**Lo que verás:**


 Building 10.2s
 Running 1/1
 incidents-api 1 layer 0s
Starting incidents-api ...
 Servidor corriendo en puerto 3000
 Base de datos: /data/incidents.db


**Presiona 'Ctrl + C' para detener cuando termines.**

---

### Paso 3: Probar que funciona

Abre **otra terminal** (sin cerrar la anterior) y ejecuta:

powershell
# Windows PowerShell
curl.exe http://localhost:3000/health

# Linux/Mac
curl http://localhost:3000/health


**Deberías ver:**

json
{ "status": "API funcionando correctamente" }


---

## Pruebas Rápidas

### 1. Registrar un incidente

bash
curl.exe -X POST http://localhost:3000/incidents '
  -H "Content-Type: application/json" '
  -d '{
    "title": "Problema de rendimiento",
    "description": "La aplicación va lenta",
    "severity": "medium"
  }'


**Respuesta:**

json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Problema de rendimiento",
  "description": "La aplicación va lenta",
  "severity": "medium",
  "status": "open",
  "created_at": "2024-01-15T10:30:00.000Z"
}


### 2. Listar todos los incidentes

bash
curl.exe http://localhost:3000/incidents


### 3. Consultar un incidente específico

bash
# Reemplaza el ID con el que obtuviste en el paso 1
curl.exe http://localhost:3000/incidents/550e8400-e29b-41d4-a716-446655440000


---

## Estructura del Proyecto


incidents-api/
--- server.js              # Aplicación principal
--- package.json           # Dependencias
--- Dockerfile             # Containerización
--- docker-compose.yml     # Configuración Docker
--- README.md              # Documentación completa
--- PRUEBAS.md            # Ejemplos de pruebas
--- .gitignore            # Archivos a ignorar en Git
--- test-api.sh           # Script de pruebas automatizadas


---

## Detener la API

En la terminal donde está corriendo Docker:

bash
Ctrl + C


O en otra terminal:

bash
docker compose down


---

## Limpiar Datos (Opcional)

Para eliminar la base de datos y volúmenes:

bash
docker compose down -v


**Advertencia:** Esto eliminará todos los incidentes guardados.

---

## 🐛 Solución de Problemas

### Error: "Port 3000 is already in use"

bash
# Ver qué está usando el puerto 3000
netstat -ano | findstr :3000

# Si quieres usar otro puerto, edita docker-compose.yml:
# Cambia "3000:3000" a "3001:3000" (o el puerto que prefieras)


### Error: "Docker daemon is not running"

bash
# Abre Docker Desktop desde el menú de inicio
# Espera a que cargue completamente
# Vuelve a ejecutar: docker compose up --build


### Error: "docker: command not found"

bash
# Docker no está instalado o no está en el PATH
# Descarga e instala Docker Desktop: https://www.docker.com/products/docker-desktop


---


