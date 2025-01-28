import { Router } from "express";
import conexion from "../config/conexion.js";

const router = Router();

// Ruta para actualizar los datos de una práctica preprofesional
router.post("/actualizarPractica/:id", (req, res) => {
    const idRegistro = req.params.id;
    const { horaInicio, ubicacionInicio, horaFin, ubicacionFinal, entidadBeneficiaria, cedulaEstudiante, usuarioEstudiante, idUnidadVinculacion, nombreUnidadVinculacion, calificacion, estado } = req.body;

    const query = `
        UPDATE registro_practicas SET
            hora_inicio = ?, ubicacion_inicio = ?, hora_final = ?, ubicacion_final = ?, entidad_beneficiaria = ?, 
            cedula_estudiante = ?, usuario_estudiante = ?, id_unidadvinculacion = ?, nombre_unidadvinculacion = ?, 
            calificacion = ?, estado = ?
        WHERE id_registro = ?
    `;

    conexion.query(query, [horaInicio, ubicacionInicio, horaFin, ubicacionFinal, entidadBeneficiaria, cedulaEstudiante, usuarioEstudiante, idUnidadVinculacion, nombreUnidadVinculacion, calificacion, estado, idRegistro], (error, results) => {
        if (error) {
            console.error("Error al actualizar la práctica:", error);
            res.redirect("/errorGeneral.html")
        }
        res.redirect("/tareaRealizada.html")
    });
});


export default router;