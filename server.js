const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = process.env.DB_PATH || "/data/incidents.db";

// Middleware
app.use(express.json());

// Inicio de la base de datos
let db;

function initDatabase() {
  db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
      console.error("Error al conectar la BD:", err);
    } else {
      console.log("Conectado a SQLite");

      // Crear tabla si no existe
      db.run(
        `
        CREATE TABLE IF NOT EXISTS incidents (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          status TEXT DEFAULT 'open',
          severity TEXT DEFAULT 'medium',
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
      `,
        (err) => {
          if (err) {
            console.error("Error al crear tabla:", err);
          } else {
            console.log("Tabla de incidentes lista");
          }
        },
      );
    }
  });
}

// Rutas
// Health check
// Usar  curl.exe http://localhost:3000/health para comprobar si la API está funcionando correctamente
app.get("/health", (req, res) => {
  res.status(200).json({ status: "API funcionando correctamente" });
});

// Registrar incidente (POST /incidents)
app.post("/incidents", (req, res) => {
  const { title, description, severity } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      error: "Los campos title y description son requeridos",
    });
  }

  const id = uuidv4();
  const now = new Date().toISOString();
  const incidentSeverity = severity || "medium";

  const sql = `
    INSERT INTO incidents (id, title, description, severity, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, 'open', ?, ?)
  `;

  db.run(sql, [id, title, description, incidentSeverity, now, now], (err) => {
    if (err) {
      return res.status(500).json({ error: "Error al registrar incidente" });
    }
    res.status(201).json({
      id,
      title,
      description,
      severity: incidentSeverity,
      status: "open",
      created_at: now,
    });
  });
});

// Listar incidentes (GET /incidents)
app.get("/incidents", (req, res) => {
  const sql = `SELECT * FROM incidents ORDER BY created_at DESC`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Error al listar incidentes" });
    }
    res.status(200).json(rows || []);
  });
});

// Consultar incidente por ID (GET /incidents/:id)
app.get("/incidents/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM incidents WHERE id = ?`;

  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Error al consultar incidente" });
    }
    if (!row) {
      return res.status(404).json({ error: "Incidente no encontrado" });
    }
    res.status(200).json(row);
  });
});

// Actualizar estado de incidente (PATCH /incidents/:id)
app.patch("/incidents/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "El campo status es requerido" });
  }

  const now = new Date().toISOString();
  const sql = `UPDATE incidents SET status = ?, updated_at = ? WHERE id = ?`;

  db.run(sql, [status, now, id], function (err) {
    if (err) {
      return res.status(500).json({ error: "Error al actualizar incidente" });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Incidente no encontrado" });
    }
    res.status(200).json({ message: "Incidente actualizado", id, status });
  });
});

// Iniciar servidor
initDatabase();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Base de datos: ${DB_PATH}`);
});
