import { Router } from "express";
import conexion from "../config/conexion.js";

const router = Router();

router.post("/eliminarEstudiante", (req, res) => {
    const idEstudiante = parseInt(req.body.idEstudiante);

    if (isNaN(idEstudiante)) {
        res.status(400).send("ID inválido");
        return;
    }

    const eliminar = `DELETE FROM estudiantes WHERE id = ?`;

    conexion.query(eliminar, [idEstudiante], (error, result) => {
        if (error) {
            console.error("Error al eliminar estudiante:", error);
            res.status(500).send("Error al eliminar estudiante");
            return;
        }

        console.log("Estudiante eliminado con éxito:", result);
        res.redirect("/ventanaProfesor"); // Redirige a la vista del profesor
    });
});

export default router;