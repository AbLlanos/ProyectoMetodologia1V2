import { Router } from "express";
import conexion from "../config/conexion.js";

const router = Router();

router.get("/practicas/:id_estudiante", (req, res) => {
    const idEstudiante = req.params.id_estudiante;

    // Consulta SQL para obtener las prácticas del estudiante
    const query = `
        SELECT 
            rp.id_registro,
            rp.usuario_estudiante,
            rp.cedula_estudiante,
            rp.entidad_beneficiaria,
            rp.nombre_unidadvinculacion,
            rp.hora_inicio,
            rp.ubicacion_inicio,
            rp.hora_final,
            rp.ubicacion_final,
            rp.hora_total_visita,
            rp.calificacion,
            rp.estado
        FROM registro_practicas rp
        WHERE rp.usuario_estudiante = ?;
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
