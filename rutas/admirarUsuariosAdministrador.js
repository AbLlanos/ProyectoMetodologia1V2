import { Router } from "express";
import conexion from "../config/conexion.js";

const router = Router();

router.get('/usuarios', (req, res) => {
    const query = "SELECT * FROM usuarios";
    conexion.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        res.json(results);
    });
});


export default router;
