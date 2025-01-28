import multer from "multer";
import { Router } from "express";
import conexion from "../config/conexion.js";

const router = Router();

const storage = multer.memoryStorage(); // Almacena el archivo en memoria como buffer
const upload = multer({ storage }); // Inicializa multer

router.post("/crearRegistroPractica", upload.single("fotoPractica"), (req, res) => {
    const { cedulaEstudiante, usuarioEstudiante, idUnidadVinculacion, nombreUnidadVinculacion, entidadBeneficiaria, horaInicio, ubicacionInicio, horaFin, ubicacionFinal, calificacion, estado } = req.body;
    const fotoPractica = req.file?.buffer;

    if (!fotoPractica) {
        console.error("No se proporcionó la foto");
        return res.redirect("/errorGeneral.html");
    }

    const insertarPractica = `
        INSERT INTO registro_practicas (hora_inicio, ubicacion_inicio, hora_final, ubicacion_final, entidad_beneficiaria, cedula_estudiante, usuario_estudiante, id_unidadvinculacion, nombre_unidadvinculacion, calificacion, estado, foto_practica)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    conexion.query(insertarPractica, [horaInicio, ubicacionInicio, horaFin, ubicacionFinal, entidadBeneficiaria, cedulaEstudiante, usuarioEstudiante, idUnidadVinculacion, nombreUnidadVinculacion, calificacion, estado, fotoPractica], (error) => {
        if (error) {
            console.error("Error al registrar la práctica:", error);
            return res.redirect("/errorGeneral.html");
        }
        res.redirect("/tareaRealizada.html");
    });
});

export default router;
