import { Router } from "express";
import conexion from "../config/conexion.js";

const router = Router();

// Ruta para actualizar usuario
router.post('/actualizarUsuario/:id', (req, res) => {
    const idUsuario = req.params.id;
    const { nombre, apellido, cedula, correo, rol } = req.body; // Obtener los datos desde el cuerpo de la solicitud

    const query = "UPDATE usuarios SET nombre = ?, apellido = ?, cedula = ?, correo_electronico = ?, rol = ? WHERE id_usuario = ?";
    conexion.query(query, [nombre, apellido, cedula, correo, rol, idUsuario], (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error al actualizar el usuario" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        // Responder con un mensaje de éxito
        res.redirect("/tareaRealizada.html")
    });
});


export default router;