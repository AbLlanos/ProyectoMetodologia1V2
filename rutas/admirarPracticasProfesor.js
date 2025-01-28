import { Router } from "express";
import conexion from "../config/conexion.js";

const router = Router();

// Ruta para obtener las prácticas de una unidad de vinculación
router.get("/practicasPreprofesionales/:idUnidad", (req, res) => {
    const idUnidad = req.params.idUnidad; // ID de la unidad de vinculación

    // Consulta para obtener las prácticas relacionadas con una unidad de vinculación
    const query = `
        SELECT * 
        FROM registro_practicas
        WHERE id_unidadvinculacion = ?;
    `;

    conexion.query(query, [idUnidad], (error, results) => {
        if (error) {
            console.error("Error al obtener las prácticas:", error);
            return res.status(500).json({ error: "Error al obtener las prácticas." });
        }

        if (results.length > 0) {
            res.json(results); // Devolver todos los registros de prácticas de esa unidad de vinculación
        } else {
            res.status(404).json({ error: "No se encontraron prácticas preprofesionales." });
        }
    });
});

export default router;
