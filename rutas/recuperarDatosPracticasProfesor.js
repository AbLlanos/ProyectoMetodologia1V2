import { Router } from "express";
import conexion from "../config/conexion.js";

import link from "../config/link.js";

const router = Router();

router.get("/modificarEncuesta/:id", (req, res) => {
    const { id } = req.params;
    const obtenerEncuesta = `SELECT * FROM practicas_preprofesionales WHERE id = ?`;

    conexion.query(obtenerEncuesta, [id], (error, result) => {
        if (error) {
            console.error("Error al obtener la encuesta:", error);
            return res.redirect("/error.html");
        }
        if (result.length === 0) {
            return res.status(404).send("Encuesta no encontrada");
        }
        res.render("modificarEncuesta", { encuesta: result[0] });
    });
});

export default router;