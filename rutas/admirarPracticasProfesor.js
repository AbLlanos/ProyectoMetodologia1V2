// rutas/practicas.js
import { Router } from "express";
import conexion from "../config/conexion.js"; // Asegúrate de que la conexión a la base de datos está bien configurada

const router = Router();

// Ruta para obtener las prácticas preprofesionales por el id del docente
router.get("/practicasPreprofesionales/:id_docente", (req, res) => {
    const idDocente = req.params.id_docente; // Obtener el id del docente de la URL

    // Consulta SQL para obtener las prácticas preprofesionales
    const query = `
        SELECT 
            id_practica,
            nombre_estudiante,
            cedula_estudiante,
            empresa,
            materia,
            fecha_inicio,
            fecha_fin,
            calificacion,
            estado
        FROM practicas_preprofesionales
        WHERE id_docente = ?; -- Filtra por el id del docente
    `;

    // Ejecutar la consulta
    conexion.query(query, [idDocente], (error, results) => {
        if (error) {
            console.error("Error al obtener las prácticas:", error);
            res.redirect("/errorGeneral.html");
            return;
        }

        // Responder con los datos obtenidos
        res.json(results);
    });
});

export default router;
