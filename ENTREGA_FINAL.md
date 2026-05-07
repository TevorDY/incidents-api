# CASO PRÁCTICO - ENTREGA FINAL

## Sistema de Gestión de Incidentes TI - Caja Ica

Documentacion.

---

## ENTREGABLES OBLIGATORIOS

### 1. Código Fuente Completo
- **server.js** ---- Aplicación principal con todos los endpoints
- **package.json** ---- Configuración de dependencias

### 2. Dockerfile
- Imagen Docker optimizada basada en Node.js Alpine
- Configuración correcta de puertos y variables de entorno
- Buenas prácticas implementadas

### 3.  docker-compose.yml
- Archivo funcional y listo para ejecutar
- Un comando: 'docker compose up --build'
- Volumen persistente para datos
- Configuración correcta de puertos y variables

### 4.  README.md
- Descripción completa de la solución
- Tecnologías utilizadas
- Instrucciones paso a paso de ejecución
- Documentación de todos los endpoints
- Variables requeridas explicadas
- Supuestos y limitaciones documentadas

### 5.  Documentación Adicional
- **INSTALACION.md** - Guía rápida de instalación (3 pasos)
- **PRUEBAS.md** - Ejemplos detallados de todos los endpoints
- Estructura clara y fácil de seguir

---

##  REQUERIMIENTOS FUNCIONALES CUMPLIDOS

###  Endpoints Implementados

 Endpoint  Método  Estado  Descripción 
---------------------------------------
 '/health'  GET    Verificar que la API está funcionando 
 '/incidents'  POST    **Registrar incidente** (Obligatorio) 
 '/incidents'  GET    **Listar incidentes** (Obligatorio) 
 '/incidents/{id}'  GET    **Consultar por ID** (Obligatorio) 
 '/incidents/{id}'  PATCH    Actualizar estado (Bonus) 

---

##  REQUERIMIENTOS TÉCNICOS CUMPLIDOS

###  Lenguaje / Framework
- **Node.js v18** + **Express.js**
- Lenguaje elegido libremente (como lo especifica el caso)
- Implementación simple pero profesional

###  Base de Datos
- **SQLite3** (base de datos embebida)
- Tabla 'incidents' con estructura completa
- Datos persistentes en volumen Docker
- No requiere configuración externa

###  Containerización (OBLIGATORIO)

**Dockerfile:**
-  Imagen base optimizada
-  Dependencias instaladas correctamente
-  Directorio de trabajo configurado
-  Puerto expuesto correctamente
-  Buenas prácticas implementadas

**docker-compose.yml:**
-  Servicio configurado correctamente
-  Puerto mapeado (3000:3000)
-  Variables de entorno definidas
-  Volumen persistente creado
-  Se ejecuta con: 'docker compose up --build'

---

##  ESTRUCTURA DEL PROYECTO

'''
incidents-api/
---- server.js                    # Aplicación principal (3839 bytes)
---- package.json                 # Dependencias (413 bytes)
---- Dockerfile                   # Containerización (500 bytes)
---- docker-compose.yml           # Orquestación (289 bytes)
---- README.md                    # Documentación completa (5970 bytes)
---- PRUEBAS.md                   # Guía de pruebas (7055 bytes)
---- INSTALACION.md               # Instalación rápida (4129 bytes)
---- test-api.sh                  # Script de pruebas (2191 bytes)
---- .gitignore                   # Control de versiones (53 bytes)
'''

**Tamaño total:** 11 KB (sin node_modules)

---

##  EJECUCIÓN RÁPIDA

### Paso 1: Descargar y extraer
'''bash
# Descargar incidents-api.zip
# Extraer en tu máquina
cd incidents-api
'''

### Paso 2: Ejecutar
'''bash
docker compose up --build
'''

### Paso 3: Probar
'''powershell
# Windows PowerShell
curl.exe http://localhost:3000/health

# Linux/Mac
curl http://localhost:3000/health
'''

**¡Listo en 3 pasos! **

---

##  DATOS QUE ALMACENA

### Tabla: 'incidents'

 Campo - Tipo - Descripción 
--------------------------
 'id' - TEXT - UUID único (generado automáticamente) 
 'title' - TEXT - Título del incidente 
 'description' - TEXT - Descripción detallada 
 'status' - TEXT - Estado: open, resolved, closed 
 'severity' - TEXT - Severidad: low, medium, high, critical 
 'created_at' - TEXT - Fecha de creación (ISO 8601) 
 'updated_at' - TEXT - Fecha de última actualización 

---

##  PRUEBAS REALIZADAS

 **Health Check** - API responde correctamente
 **Registrar Incidente** - Crea registro con UUID único
 **Listar Incidentes** - Retorna array de incidentes
 **Consultar por ID** - Encuentra incidente específico
 **Actualizar Estado** - Modifica status correctamente
 **Validaciones** - Valida campos obligatorios
 **Códigos HTTP** - Respuestas con códigos correctos
 **Persistencia** - Datos guardados en volumen Docker
 **Containerización** - Docker y Docker Compose funcionan
 **Reproducibilidad** - Se ejecuta en cualquier máquina con Docker

---

##  CARACTERÍSTICAS IMPLEMENTADAS

### Funcionalidades Básicas 
- Registrar nuevos incidentes
- Listar todos los incidentes
- Consultar incidente por ID
- Validación de campos obligatorios

### Características Adicionales 
- Actualizar estado de incidente
- IDs únicos (UUID v4) automáticos
- Timestamps de creación y actualización
- Endpoints de health check
- Manejo de errores con códigos HTTP correctos
- Respuestas en formato JSON

### Buenas Prácticas 
- Código limpio y estructurado
- Comentarios explicativos
- Manejo de errores robusto
- Variables de entorno configurables
- Documentación completa
- Docker Compose para facilitar despliegue

---

##  SUPUESTOS Y LIMITACIONES

### Supuestos
- La API escucha en '0.0.0.0:3000' dentro del contenedor
- SQLite3 es suficiente para esta solución simple
- No hay autenticación (puede agregarse si es necesario)
- Los IDs se generan automáticamente como UUIDs

### Limitaciones
- SQLite3 es apropiado para este volumen, pero para alta concurrencia se recomienda PostgreSQL
- No hay validación exhaustiva de datos (puede extenderse)
- Tokens y sesiones no están implementados
- No hay paginación en listados (puede agregarse fácilmente)

### Mejoras Futuras Posibles
- Autenticación JWT
- Validación más robusta con Joi
- Migración a PostgreSQL
- Filtros avanzados
- Paginación
- Tests automatizados
- Logs estructurados

---

##  DOCUMENTACIÓN INCLUIDA

1. **README.md** - Documentación técnica completa
2. **INSTALACION.md** - Guía rápida de instalación
3. **PRUEBAS.md** - Ejemplos detallados de todos los endpoints
4. **Este documento** - Resumen ejecutivo de entrega

---

##  REQUERIMIENTOS DEL CASO

### Requerimientos Funcionales Mínimos 
-  Registrar incidente (POST /incidents)
-  Listar incidentes (GET /incidents)
-  Consultar por ID (GET /incidents/{id})

### Requerimientos Técnicos 
-  Lenguaje: Node.js (libremente elegido)
-  Base de datos: SQLite3
-  Framework: Express.js (REST API)

### Containerización Obligatoria 
-  Dockerfile funcional
-  Imagen Docker correctamente configurada
-  Puerto expuesto correctamente
-  Buenas prácticas Docker
-  docker-compose.yml funcional
-  Se ejecuta con: docker compose up --build

### Entregables Obligatorios 
-  Código fuente completo
-  Dockerfile
-  docker-compose.yml
-  README.md con toda la información requerida
  -  Descripción de la solución
  -  Tecnologías utilizadas
  -  Instrucciones de ejecución
  -  Variables requeridas
  -  Endpoints disponibles
  -  Supuestos y limitaciones

### Documentación Adicional 
-  INSTALACION.md - Instalación paso a paso
-  PRUEBAS.md - Ejemplos de uso de todos los endpoints
-  .gitignore - Para control de versiones
-  test-api.sh - Script de pruebas automatizadas

