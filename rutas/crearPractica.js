import { Router } from "express";
import conexion from "../config/conexion.js";

const router = Router();

router.post("/crearPracticaPreprofesional", (req, res) => {
    const {
        idDocente,
        cedulaEstudiante, // Solo recibimos la cédula
        nombreEmpresa,
        materia,
        fechaInicio,
        fechaFin,
        calificacion,
        estado
    } = req.body;

    // Consulta para verificar si el estudiante con la cédula existe
    const verificarEstudiante = `SELECT id_usuario, nombre, apellido FROM usuarios WHERE cedula = ? AND rol = 'estudiante'`;

    conexion.query(verificarEstudiante, [cedulaEstudiante], (error, result) => {
        if (error) {
            console.error("Error al verificar el estudiante:", error);
            return res.redirect("/errorRegistro.html");
        }

        if (result.length === 0) {
            // Si no se encuentra el estudiante
            return res.status(404).send("Estudiante no encontrado");
        }

        const idEstudiante = result[0].id_usuario; // Tomamos el id del estudiante encontrado

        // Inserción de la práctica preprofesional
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
            idEstudiante,        // ID del estudiante
            cedulaEstudiante,    // Cédula del estudiante
            idDocente,           // ID del docente
            nombreEmpresa,       // Nombre de la empresa
            materia,             // Materia
            fechaInicio,         // Fecha de inicio
            fechaFin,            // Fecha de fin
            calificacion,        // Calificación
            estado               // Estado de la práctica
        ], (error, result) => {
            if (error) {
                console.error("Error al registrar la práctica preprofesional:", error);
                res.redirect("/errorRegistro.html");
                return;
            }
            console.log("Práctica preprofesional creada exitosamente:", result);
        });
    });
});

export default router;