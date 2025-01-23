import { Router } from "express";
import conexion from "../config/conexion.js";

const router = Router();

router.post("/regUsuario", (req, res) => {
    const nombreBase = req.body.nombre;
    const apellidoBase = req.body.apellido;
    const cedulaBase = req.body.cedula;
    const telefonoBase = req.body.telefono;
    const emailBase = req.body.email;
    const contrasenaBase = req.body.contrasena;
    const rolUsuario = req.body.rol;

    //  const { nombre, apellido, usuario, telefono, email, contrasena, nacimiento } = req.body;

    const insertar = `INSERT INTO usuarios(nombre, apellido, cedula, telefono, correo_electronico, contrasena, rol) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    conexion.query(insertar, [nombreBase, apellidoBase, cedulaBase, telefonoBase, emailBase, contrasenaBase,rolUsuario], (error, result) => {
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
