import { Router } from "express";
import conexion from "../config/conexion.js";

const router = Router();

router.post("/crearPracticaPreprofesional", (req, res) => {
    const {
        idDocente,
        nombreDocente,
        cedulaEstudiante,
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
            console.log("No existe");
            res.redirect("errorGeneral.html");
            return
        }

        if (result.length === 0) {
            // Si no se encuentra el estudiante
            console.log("No existe1");
            res.redirect("errorGeneral.html");
            return

        }

        const idEstudiante = result[0].id_usuario; // Tomamos el id del estudiante encontrado

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
            idEstudiante,        // ID del estudiante
            cedulaEstudiante,    // Cédula del estudiante
            idDocente, 
            nombreDocente,          // ID del docente
            nombreEmpresa,       // Nombre de la empresa
            materia,             // Materia
            fechaInicio,         // Fecha de inicio
            fechaFin,            // Fecha de fin
            calificacion,        // Calificación
            estado               // Estado de la práctica
        ], (error, result) => {
            if (error) {
                console.error("Error al registrar la práctica preprofesional:", error);
                console.log("No existe2");
                res.redirect("/errorGeneral.html");
                return;
            }
            console.error("Error al registrar la práctica preprofesional:", error);
            res.redirect("/tareaRealizada.html");
        });
    });
});

export default router;