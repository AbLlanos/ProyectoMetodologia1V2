import { Router } from "express";
import conexion from "../config/conexion.js";

const router = Router();

// Ruta para obtener las prácticas de una unidad de vinculación
router.get("/practicasPreprofesionales/:idUnidad", (req, res) => {
    const idUnidad = req.params.idUnidad;

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

        res.json(results); 
    });
});

export default router;
