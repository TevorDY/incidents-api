#!/bin/bash

# Script de prueba para la API de Incidentes
# Asegúrate de que la API esté corriendo en http://localhost:3000

API_URL="http://localhost:3000"

echo "Pruebas de la API de Incidentes"
echo "-------------------------------"
echo "API by Yahir (TevD)"

# 1. Health Check
echo "1. Health Check"
curl -s $API_URL/health | jq .
echo ""
echo ""

# 2. Registrar incidente 1
echo "2. Registrar incidente: Servidor caído"
RESPONSE1=$(curl -s -X POST $API_URL/incidents \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Servidor caído",
    "description": "El servidor de producción no responde a solicitudes",
    "severity": "high"
  }')
echo $RESPONSE1 | jq .
ID1=$(echo $RESPONSE1 | jq -r '.id')
echo ""

# 3. Registrar incidente 2
echo "3. Registrar incidente: Base de datos lenta"
RESPONSE2=$(curl -s -X POST $API_URL/incidents \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Base de datos lenta",
    "description": "Las consultas están tardando más de 30 segundos",
    "severity": "medium"
  }')
echo $RESPONSE2 | jq .
ID2=$(echo $RESPONSE2 | jq -r '.id')
echo ""

# 4. Registrar incidente 3
echo "4. Registrar incidente: Fallo de autenticación"
RESPONSE3=$(curl -s -X POST $API_URL/incidents \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Fallo de autenticación",
    "description": "Los usuarios no pueden iniciar sesión",
    "severity": "critical"
  }')
echo $RESPONSE3 | jq .
ID3=$(echo $RESPONSE3 | jq -r '.id')
echo ""

# 5. Listar todos los incidentes
echo "5. Listar todos los incidentes"
curl -s $API_URL/incidents | jq .
echo ""
echo ""

# 6. Consultar incidente específico
echo "6. Consultar incidente específico: $ID1"
curl -s $API_URL/incidents/$ID1 | jq .
echo ""
echo ""

# 7. Actualizar estado de incidente
echo "7. Actualizar estado del incidente $ID1 a 'resolved'"
curl -s -X PATCH $API_URL/incidents/$ID1 \
  -H "Content-Type: application/json" \
  -d '{"status": "resolved"}' | jq .
echo ""
echo ""

# 8. Verificar que se actualizó
echo "8. Verificar estado actualizado"
curl -s $API_URL/incidents/$ID1 | jq .
echo ""
echo ""

echo " Pruebas completadas"
