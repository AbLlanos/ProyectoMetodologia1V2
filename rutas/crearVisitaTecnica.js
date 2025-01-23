import { Router } from "express";
import conexion from "../config/conexion.js";

const router = Router();

router.post("/crearVisitaTecnica", (req, res) => {
    const { nombreDocente, nombreEmpresa, descripcion, fechaVisita, observaciones } = req.body;

    const insertarVisita = `
        INSERT INTO visitas_tecnicas (nombre_docente, nombre_empresa, descripcion, fecha_visita, observaciones)
        VALUES (?, ?, ?, ?, ?)
    `;

    conexion.query(insertarVisita, [nombreDocente, nombreEmpresa, descripcion, fechaVisita, observaciones], (error, result) => {
        if (error) {
            console.error("Error al registrar visita técnica:", error);
            res.redirect("/errorRegistro.html");
            return;
        }
        console.log("Visita técnica creada exitosamente:", result);
        res.redirect("/ventanaProfesor");  // O redirigir a donde desees
    });
});


export default router;