import multer from "multer";
import { Router } from "express";
import conexion from "../config/conexion.js";

const router = Router();

// Configuración de Multer para almacenamiento en memoria
const storage = multer.memoryStorage();

// Configuración de Multer con validaciones de archivo
const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            cb(new Error("Soloasas"), false);
            return  res.redirect("errorGeneral.html");
        }
        cb(null, true);
    }
});

// Ruta para registrar la práctica
router.post("/crearRegistroPractica", upload.single("fotoPractica"), (req, res) => {
    try {
        console.log("Archivo recibido:", req.file);

        // Extraer datos del cuerpo de la petición
        const {
            cedulaEstudiante, usuarioEstudiante, idUnidadVinculacion,
            nombreUnidadVinculacion, entidadBeneficiaria, horaInicio,
            ubicacionInicio, horaFin, ubicacionFinal, calificacion, estado
        } = req.body;
        const fotoPractica = req.file?.buffer;

        // Validar que la imagen fue subida
        if (!fotoPractica) {
            console.error("No se proporcionó la foto");
            return res.status(400).json({ error: "No se proporcionó la foto" });
        }

        // Verificar si el usuario del estudiante existe
        const queryVerificarUsuario = `
    SELECT * FROM usuarios WHERE usuario = ? AND rol = 'estudiante'
`;
        conexion.query(queryVerificarUsuario, [usuarioEstudiante], (error, results) => {
            if (error) {
                console.error("Error al verificar el usuario:", error);
                return res.redirect("errorGeneral.html");
            }

            // Si no se encuentra el usuario
            if (results.length === 0) {
                console.error("El usuario del estudiante no existe");
                return  res.redirect("errorGeneral.html");
            }

            // Si el usuario existe, procedemos a insertar la práctica
            const insertarPractica = `
                INSERT INTO registro_practicas (
                    hora_inicio, ubicacion_inicio, hora_final, ubicacion_final, 
                    entidad_beneficiaria, cedula_estudiante, usuario_estudiante, 
                    id_unidadvinculacion, nombre_unidadvinculacion, calificacion, 
                    estado, foto_practica
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            // Ejecutar la consulta para insertar los datos de la práctica
            conexion.query(insertarPractica, [
                horaInicio, ubicacionInicio, horaFin, ubicacionFinal,
                entidadBeneficiaria, cedulaEstudiante, usuarioEstudiante,
                idUnidadVinculacion, nombreUnidadVinculacion, calificacion,
                estado, fotoPractica
            ], (error) => {
                if (error) {
                    console.error("Error al registrar la práctica:", error);
                    return  res.redirect("errorGeneral.html");
                }
                res.redirect("/tareaRealizada.html");
            });
        });

    } catch (error) {
        console.error("Error en la solicitud:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;
