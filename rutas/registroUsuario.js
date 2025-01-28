import { Router } from "express";
import conexion from "../config/conexion.js";

const router = Router();

router.post("/regUsuario", (req, res) => {
    const nombreBase = req.body.nombre;
    const apellidoBase = req.body.apellido;
    const usuarioBase = req.body.usuario;
    const cedulaBase = req.body.cedula;
    const telefonoBase = req.body.telefono;
    const emailBase = req.body.email;
    const contrasenaBase = req.body.contrasena;
    const periodoAcademicoBase = req.body.periodoAcademico;
    const rolUsuario = req.body.rol;

    const insertar = `
        INSERT INTO usuarios(nombre, apellido, usuario , cedula, telefono, correo_electronico, contrasena, periodo_academico, rol) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ? , ?)
    `;

    conexion.query(
        insertar,
        [
            nombreBase,
            apellidoBase,
            usuarioBase,
            cedulaBase,
            telefonoBase,
            emailBase,
            contrasenaBase,
            periodoAcademicoBase,
            rolUsuario,
        ],
        (error, result) => {
            if (error) {
                console.error("Error al registrar usuario:", error);
                res.redirect("errorRegistro.html");
                return;
            }
            console.log("Usuario registrado exitosamente:", result);
            res.redirect("/inicioSesion.html");
        }
    );
});

export default router;
