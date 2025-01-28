import { Router } from "express";
import conexion from "../config/conexion.js";
import link from "../config/link.js";

const router = Router();

router.post("/loginUsuario", (req, res) => {
    const input = req.body.email; // Puede ser el nombre de usuario o correo
    const contrasenaBase = req.body.contrasena;

    // Consulta para verificar si el input es correo o nombre de usuario
    const revisar = `SELECT * FROM usuarios WHERE (correo_electronico = ? OR usuario = ?) AND contrasena = ?`;

    conexion.query(revisar, [input, input, contrasenaBase], (error, result) => {
        if (error) {
            console.error("Error en la consulta:", error);
            res.redirect("/pages/errorIngreso.html");
            return;
        }
        if (result.length === 1) {
            const usuario = result[0];
            req.session.login = true;
            req.session.idBase = usuario.id_usuario;
            req.session.nombreBase = usuario.nombre;
            req.session.apellidoBase = usuario.apellido;
            req.session.usuarioBase = usuario.usuario;
            req.session.cedulaBase = usuario.cedula;
            req.session.telefonoBase = usuario.telefono;
            req.session.correo_electronicoBase = usuario.correo_electronico;
            req.session.rolBase = usuario.rol;
            req.session.periodoAcademico = usuario.periodo_academico;

            // Log para verificar la creación de la sesión
            console.log("Sesión creada:", req.session);

            // Verificar el rol del usuario
            if (usuario.rol === "estudiante") {
                // Renderizar ventana del estudiante
                res.render("ventanaEstudiante", { datos: req.session, link });
            } else if (usuario.rol === "vinculacion practicas") {
                // Renderizar ventana del responsable de prácticas
                res.render("ventanaProfesor", { datos: req.session, link });
            } else if (usuario.rol === "administrador") {
                // Renderizar ventana del administrador
                res.render("ventanaAdministrador", { datos: req.session, link });
            } else {
                // Rol no reconocido
                console.warn("Rol no reconocido:", usuario.rol);
                res.redirect("/errorIngreso.html");
            }
        } else {
            // Usuario no encontrado
            res.redirect("/errorIngreso.html");
        }
    });
});

export default router;
