import { Router } from "express";
import conexion from "../config/conexion.js";

const router = Router();

router.get("/visitas/:nombre_docente", (req, res) => {
    const nombreDocente = req.params.nombre_docente;

    const query = `
        SELECT 
            id_visita,
            nombre_empresa,
            descripcion,
            fecha_visita,
            observaciones,
            fecha_registro
        FROM visitas_tecnicas
        WHERE nombre_docente = ?;
    `;

    conexion.query(query, [nombreDocente], (error, results) => {
        if (error) {
            console.error("Error al obtener las visitas técnicas:", error);
            res.status(500).json({ error: "Error al obtener las visitas técnicas" });
            return;
        }
        res.json(results);  // Enviamos los resultados al frontend
    });
});

export default router;
