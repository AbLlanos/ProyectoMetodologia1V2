import { Router } from "express";
import conexion from "../config/conexion.js";

const router = Router();

// Ruta para eliminar usuario
router.post('/eliminarUsuario', (req, res) => {
    const { idUsuario } = req.body; // Recibimos el ID del usuario desde el formulario
    const query = "DELETE FROM usuarios WHERE id_usuario = ?";
    conexion.query(query, [idUsuario], (error, results) => {
        if (error) {
            console.error("Error al eliminar la práctica:", error);
            res.redirect("/errorGeneral.html");
            return;
        }
        res.redirect("/tareaRealizada.html");
    });
});


export default router;
