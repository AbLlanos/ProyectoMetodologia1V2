import { Router } from "express";
import conexion from "../config/conexion.js"; // Asegúrate de que la conexión a la base de datos está bien configurada

const router = Router();

// Ruta para obtener los datos de un usuario específico
router.get('/editarUsuario/:id', (req, res) => {
    const idUsuario = req.params.id;

    const query = "SELECT * FROM usuarios WHERE id_usuario = ?";
    conexion.query(query, [idUsuario], (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error al obtener los datos del usuario" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(results[0]); // Enviar los datos del usuario
    });
});
export default router;
