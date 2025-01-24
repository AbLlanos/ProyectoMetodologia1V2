import { Router } from "express";
import conexion from "../config/conexion.js";

import link from "../config/link.js";

const router = Router();

router.get("/modificarPracticaFormulario", (req, res) => {
    const { idPractica } = req.query;

    const query = `SELECT * FROM practicas WHERE id = ?`;
    conexion.query(query, [idPractica], (err, rows) => {
        if (err) {
            console.error("Error al obtener los datos de la práctica:", err);
            return res.status(500).send("Error al obtener los datos de la práctica.");
        }

        if (rows.length === 0) {
            return res.status(404).send("No se encontró la práctica.");
        }

        const practica = rows[0];
        res.render("modificarPractica", { practica });
    });
});



export default router;