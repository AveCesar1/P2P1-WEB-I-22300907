import express from "express";
import cors from "cors";
import connection from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// Crear POST
app.post("/api/alumnos", (req, res) => {
    const { nombre, edad, curso } = req.body;
    const query = "INSERT INTO alumnos (nombre, edad, curso) VALUES (?, ?, ?)";
    connection.query(query, [nombre, edad, curso], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ mensaje: "Alumno agregado correctamente", id: results.insertId });
    });
});

// Mostrar GET
app.get("/api/alumnos", (req, res) => {
    connection.query("SELECT * FROM alumnos", (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Crear UPDATE
app.put("/api/alumnos/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, edad, curso } = req.body;
    const query = "UPDATE alumnos SET nombre = ?, edad = ?, curso = ? WHERE id = ?";
    connection.query(query, [nombre, edad, curso, id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ mensaje: "Alumno actualizado correctamente" });
    });
});

// Crear DELETE
app.delete("/api/alumnos/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM alumnos WHERE id = ?";
    connection.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ mensaje: "Alumno eliminado correctamente" });
    });
});

app.use(express.static("public"));

// Puerto
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});