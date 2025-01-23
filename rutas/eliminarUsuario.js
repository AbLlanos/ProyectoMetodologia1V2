import { Router } from "express";
import conexion from "../config/conexion.js";

const router = Router();

// Ruta para eliminar una práctica preprofesional
router.post("/eliminarPractica", (req, res) => {
    const idPractica = req.body.idPractica;

    const query = "DELETE FROM practicas_preprofesionales WHERE id_practica = ?";

    // Ejecutar la consulta de eliminación
    conexion.query(query, [idPractica], (error, results) => {
        if (error) {
            console.error("Error al eliminar la práctica:", error);
            res.status(500).json({ error: "Error al eliminar la práctica preprofesional" });
            return;
        }
        // Redirige después de eliminar o muestra un mensaje de éxito
        res.redirect("/profesor"); // Suponiendo que esta es la ruta donde quieres volver
    });
});

export default router;