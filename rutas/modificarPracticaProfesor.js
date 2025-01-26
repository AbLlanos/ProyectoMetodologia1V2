import { Router } from "express";
import conexion from "../config/conexion.js";

import link from "../config/link.js";

const router = Router();

// En tu archivo de rutas de Express (por ejemplo, routes.js)
router.post('/actualizarPracticaPreprofesional/:id', (req, res) => {
    const idPractica = req.params.id;
    const { idEstudiante, cedulaEstudiante, nombreEmpresa, materia, fechaInicio, fechaFin, calificacion, estado } = req.body;

    // Aquí agregas la lógica para actualizar la práctica en la base de datos
    // Ejemplo:
    conexion.query('UPDATE  practicas_preprofesionales SET nombre_estudiante = ?, cedula_estudiante = ?, empresa = ?, materia = ?, fecha_inicio = ?, fecha_fin = ?, calificacion = ?, estado = ? WHERE id_practica = ?', [idEstudiante, cedulaEstudiante, nombreEmpresa, materia, fechaInicio, fechaFin, calificacion, estado, idPractica], (err, result) => {
        if (err) {
            console.error(err);
            res.redirect('errorRegistro.html')
        } else {
            res.redirect('/index.html'); // O la ruta que quieras después de actualizar
        }
    });
});


export default router;