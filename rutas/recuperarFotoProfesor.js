import { Router } from "express";
import conexion from "../config/conexion.js";

const router = Router();


// Ruta para obtener la foto de la práctica
router.get("/fotoPractica/:idPractica", (req, res) => {
    const { idPractica } = req.params;

    // Consulta para obtener la foto de la base de datos
    const obtenerFotoQuery = "SELECT foto_practica FROM registro_practicas WHERE id_registro = ?";

    // Ejecutar la consulta
    conexion.query(obtenerFotoQuery, [idPractica], (error, results) => {
        if (error) {
            console.error("Error al recuperar la foto:", error);
            return res.status(500).json({ error: "Error al recuperar la foto" });
        }

        // Verificar que se encontró una foto
        if (results.length === 0 || !results[0].foto_practica) {
            return res.status(404).json({ error: "Foto no encontrada" });
        }

        // Enviar la imagen como respuesta
        res.setHeader("Content-Type", "image/jpeg"); // Establecer el tipo de contenido
        res.send(results[0].foto_practica); // Enviar el BLOB de la imagen
    });
});

export default router;
