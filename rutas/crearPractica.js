import { Router } from "express";
import conexion from "../config/conexion.js";

const router = Router();

router.post("/crearPracticaPreprofesional", (req, res) => {
    const {
        idDocente,
        idEstudiante,
        cedulaEstudiante,
        nombreEmpresa,
        materia,
        fechaInicio,
        fechaFin,
        calificacion,
        estado
    } = req.body;

    // Consulta para insertar los datos en la tabla `practicas_preprofesionales`
    const insertarPractica = `
        INSERT INTO practicas_preprofesionales (
            nombre_estudiante, 
            cedula_estudiante, 
            id_docente, 
            empresa, 
            materia, 
            fecha_inicio, 
            fecha_fin, 
            calificacion, 
            estado
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    conexion.query(insertarPractica, [
        idEstudiante,       // ID del estudiante
        cedulaEstudiante,   // Cédula del estudiante
        idDocente,          // ID del docente
        nombreEmpresa,            // Nombre de la empresa
        materia,            // Materia
        fechaInicio,        // Fecha de inicio
        fechaFin,           // Fecha de fin
        calificacion,       // Calificación
        estado              // Estado de la práctica
    ], (error, result) => {
        if (error) {
            console.error("Error al registrar la práctica preprofesional:", error);
            res.redirect("/errorRegistro.html");
            return;
        }
        console.log("Práctica preprofesional creada exitosamente:", result);
        res.redirect("/paginaExito.html"); // Redirigir a una página de éxito si se registra correctamente
    });
});

export default router;
