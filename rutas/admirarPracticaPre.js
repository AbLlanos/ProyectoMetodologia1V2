import { Router } from "express";
import conexion from "../config/conexion.js";

const router = Router();


router.get("/practicas/:id_estudiante", (req, res) => {
    const idEstudiante = req.params.id_estudiante;

    // Consulta SQL para obtener las prácticas del estudiante con el nombre del docente
    const query = `
SELECT 
    p.id_practica,
    u.nombre AS nombre_docente,
    u.apellido AS apellido_docente,  -- Agregar apellido
    p.empresa,
    p.materia,
    p.fecha_inicio,
    p.fecha_fin,
    p.calificacion,
    p.estado
FROM practicas_preprofesionales p
JOIN usuarios u ON p.id_docente = u.id_usuario
WHERE p.nombre_estudiante = ?;
`;

    conexion.query(query, [idEstudiante], (error, results) => {
        if (error) {
            console.error("Error al obtener las prácticas:", error);
            res.status(500).json({ message: "Error en el servidor" });
            return;
        }
        res.json(results);  // Enviamos los resultados al frontend
    });
});
export default router;
