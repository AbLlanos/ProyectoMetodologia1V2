import { Router } from "express";
import conexion from "../config/conexion.js";

const router = Router();

// Ruta para eliminar una práctica preprofesional
router.post("/eliminarPractica", (req, res) => {
    const idPractica = req.body.idPractica;  // Cambié 'idRegistro' por 'idPractica'

    const query = "DELETE FROM registro_practicas WHERE id_registro = ?";

    conexion.query(query, [idPractica], (error, results) => {
        if (error) {
            console.error("Error al eliminar la práctica:", error);
            res.redirect("/errorGeneral.html");
            return;
        }
        res.redirect("/tareaRealizada.html");
    });
});

export default router;
