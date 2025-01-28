import { Router } from "express";
import conexion from "../config/conexion.js"; // Asegúrate de que la conexión a la base de datos está bien configurada

const router = Router();

// Ruta para obtener los detalles de una práctica específica por id_registro
router.get("/getPractica/:id", (req, res) => {
    const idRegistro = req.params.id;
    const query = `SELECT * FROM registro_practicas WHERE id_registro = ?`;

    conexion.query(query, [idRegistro], (error, result) => {
        if (error || result.length === 0) {
            return res.status(404).json({ error: "Práctica no encontrada" });
        }
        res.json(result[0]);
    });
});

export default router;
