import { Router } from "express";
import conexion from "../config/conexion.js";

const router = Router();

// Ruta para eliminar usuario
router.post('/eliminarUsuario', (req, res) => {
    const { idUsuario } = req.body; // Obtener el ID del usuario desde el formulario
    const query = "DELETE FROM usuarios WHERE id_usuario = ?";

    conexion.query(query, [idUsuario], (error) => {
        if (error) {
            console.error("Error al eliminar el usuario:", error);
            res.redirect("/errorGeneral.html");
            return;
        }
        res.redirect("/tareaRealizada.html"); // Redirige a la página deseada
    });
});

export default router;
