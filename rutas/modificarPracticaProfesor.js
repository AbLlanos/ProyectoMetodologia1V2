import { Router } from "express";
import multer from "multer";
import conexion from "../config/conexion.js";

const router = Router();

// Configuración de Multer para la carga de la foto (si la hay)
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Límite de 2MB
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Formato de imagen no válido"));
        }
        cb(null, true);
    }
}).single("fotoPractica");

// Ruta para actualizar los datos de una práctica preprofesional
router.post("/actualizarPractica/:id", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error("Error en la subida del archivo:", err.message);
            return res.redirect("/errorGeneral.html");
        }

        const idRegistro = req.params.id;
        const { horaInicio, ubicacionInicio, horaFin, ubicacionFinal, entidadBeneficiaria, cedulaEstudiante, usuarioEstudiante, idUnidadVinculacion, nombreUnidadVinculacion, calificacion, estado } = req.body;
        const fotoPractica = req.file?.buffer; // Manejo de la foto

        // Verificar si el estado es válido
        const estadosValidos = ["En progreso", "Finalizada", "Cancelado"];
        if (!estadosValidos.includes(estado)) {
            console.error("Estado inválido:", estado);
            return res.redirect("/errorGeneral.html");
        }

        // Construcción de la consulta SQL
        let query = `
            UPDATE registro_practicas SET
                hora_inicio = ?, ubicacion_inicio = ?, hora_final = ?, ubicacion_final = ?, entidad_beneficiaria = ?,
                cedula_estudiante = ?, usuario_estudiante = ?, id_unidadvinculacion = ?, nombre_unidadvinculacion = ?,
                calificacion = ?, estado = ?
        `;

        const valores = [horaInicio, ubicacionInicio, horaFin, ubicacionFinal, entidadBeneficiaria, cedulaEstudiante, usuarioEstudiante, idUnidadVinculacion, nombreUnidadVinculacion, calificacion, estado];

        // Si se sube una nueva foto, la añadimos a la consulta
        if (fotoPractica) {
            query += ", foto_practica = ?";
            valores.push(fotoPractica);
        }

        query += " WHERE id_registro = ?";
        valores.push(idRegistro);

        // Ejecutar la consulta
        conexion.query(query, valores, (error, results) => {
            if (error) {
                console.error("Error al actualizar la práctica:", error);
                return res.redirect("/errorGeneral.html");
            }
            res.redirect("/tareaRealizada.html");
        });
    });
});

export default router;

