import { Router } from "express";
import conexion from "../config/conexion.js";

import link from "../config/link.js";

const router = Router();

router.post("/loginUsuario", (req, res) => {
    const emailBase = req.body.email;
    const contrasenaBase = req.body.contrasena;

    // Consulta para verificar el usuario y obtener su rol
    const revisar = `SELECT * FROM usuarios WHERE email = ? AND contrasena = ?`;

    conexion.query(revisar, [emailBase, contrasenaBase], (error, result) => {
        if (error) {
            console.error("Error en la consulta:", error);
            res.redirect("/pages/errorIngreso.html");
            return;
        }

        if (result.length === 1) {
            const usuario = result[0];
            req.session.login = true;
            req.session.idBase = usuario.idUsuario;
            req.session.nombreBase = usuario.nombre;
            req.session.apellidoBase = usuario.apellido;
            req.session.usuarioBase = usuario.usuario;
            req.session.telefonoBase = usuario.telefono;
            req.session.emailBase = usuario.email;
            

            console.log("Sesión creada:", req.session);

            // Verificar el rol del usuario
            if (usuario.rol === "estudiante") {
                // Renderizar ventana de estudiante
                res.render("ventanaEstudiante", { datos: req.session, link });
            } else if (usuario.rol === "docente") {
                // Renderizar ventana de docente
                res.render("ventanaProfesor", { datos: req.session, link });
            } else {
                // Rol no reconocido, redirigir a una página de error
                res.redirect("/pages/errorIngreso.html");
            }
        } else {
            // Si no encuentra usuario
            res.redirect("/errorIngreso.html");
        }
    });
});

export default router;
