import { Router } from "express";
import conexion from "../config/conexion.js";

const router = Router();

router.post("/crearPracticaPreprofesional", (req, res) => {
    const { idDocente, nombreDocente, nombreEmpresa, materia, fechaInicio, fechaFin, calificacion, estado } = req.body;

// Limpiar la cédula (por si hay espacios adicionales)
const cedulaEstudiante = req.body.cedulaEstudiante.trim();

console.log("Cédula del estudiante:", cedulaEstudiante);

const verificarEstudiante = `SELECT id_usuario, nombre, apellido FROM usuarios WHERE cedula = ? AND rol = 'estudiante'`;

conexion.query(verificarEstudiante, [cedulaEstudiante], (error, result) => {
    if (error) {
        console.error("Error al verificar el estudiante:", error);
        res.redirect("errorGeneral.html");
        return;
    }

    if (result.length === 0) {
        console.log("Estudiante no encontrado con cédula:", cedulaEstudiante);
        res.redirect("errorGeneral.html");
        return;
    }

    const idEstudiante = result[0].id_usuario;

    // Inserción de la práctica preprofesional
    const insertarPractica = `
        INSERT INTO practicas_preprofesionales (
            nombre_estudiante, 
            cedula_estudiante, 
            id_docente, 
            nombre_docente,
            empresa, 
            materia, 
            fecha_inicio, 
            fecha_fin, 
            calificacion, 
            estado
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    conexion.query(insertarPractica, [
        idEstudiante,
        cedulaEstudiante,
        idDocente,
        nombreDocente,
        nombreEmpresa,
        materia,
        fechaInicio,
        fechaFin,
        calificacion,
        estado
    ], (error, result) => {
        if (error) {
            console.error("Error al registrar la práctica preprofesional:", error);
            res.redirect("/errorGeneral.html");
            return;
        }
        res.redirect("/tareaRealizada.html");
    });
});

});

export default router;