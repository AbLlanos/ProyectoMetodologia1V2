import { Router } from "express";
import conexion from "../config/conexion.js";

import link from "../config/link.js";

const router = Router();

router.post("/loginUsuario", (req, res) => {
    const emailBase = req.body.email;
    const contrasenaBase = req.body.contrasena;

    // Consulta para verificar el usuario y obtener su rol
    const revisar = `SELECT * FROM usuarios WHERE correo_electronico = ? AND contrasena = ?`;

    conexion.query(revisar, [emailBase, contrasenaBase], (error, result) => {
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
            req.session.cedulaBase = usuario.cedula;
            req.session.telefonoBase = usuario.telefono;
            req.session.correo_electronicoBase = usuario.correo_electronico;
            req.session.rolBase = usuario.rol;

            //cuadro de incio sesion segun usuario
            console.log("Sesión creada:", req.session);

            // Verificar el rol del usuario
            if (usuario.rol === "estudiante") {
                // Renderizar ventana de estudiante
                res.render("ventanaEstudiante", { datos: req.session, link });
            } else if (usuario.rol === "docente") {



                // Redirigir a la página donde se mostrarán los estudiantes
                res.render("ventanaProfesor", { datos: req.session, link });



            } else {
                // Rol no reconocido, redirigir a una página de error
                res.redirect("/errorIngreso.html");
            }
        } else {
            // Si no encuentra usuario
            res.redirect("/errorIngreso.html");
        }
    });
});

export default router;
