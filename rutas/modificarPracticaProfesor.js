import { Router } from "express";
import conexion from "../config/conexion.js";

import link from "../config/link.js";

const router = Router();

router.get("/practica/:id", (req, res) => {
    const idPractica = req.params.id;

    const query = "SELECT * FROM practicas_preprofesionales WHERE id_practica = ?";

    conexion.query(query, [idPractica], (error, results) => {
        if (error) {
            console.error("Error al obtener los datos de la práctica:", error);
            res.status(500).json({ error: "Error al obtener los datos de la práctica." });
            return;
        }

        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: "Práctica no encontrada" });
        }
    });
});

export default router;