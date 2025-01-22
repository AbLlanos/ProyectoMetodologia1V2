import { Router } from "express";
import conexion from "../config/conexion.js";

const router = Router();

router.post("/regUsuario", (req, res) => {
    const nombreBase = req.body.nombre;
    const apellidoBase = req.body.apellido;
    const usuarioBase = req.body.usuario;
    const telefonoBase = req.body.telefono;
    const emailBase = req.body.email;
    const contrasenaBase = req.body.contrasena;
    const nacimientoBase = req.body.nacimiento;
    const rolUsuario = req.body.rol;

    //  const { nombre, apellido, usuario, telefono, email, contrasena, nacimiento } = req.body;

    const insertar = `INSERT INTO usuarios(nombre, apellido, usuario, telefono, email, contrasena, fecha_nacimiento,rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    conexion.query(insertar, [nombreBase, apellidoBase, usuarioBase, telefonoBase, emailBase, contrasenaBase, nacimientoBase,rolUsuario], (error, result) => {
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
