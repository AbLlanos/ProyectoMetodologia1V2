// Importar librerías
import express from "express";
import session from "express-session";

// Importar rutas
import usuarioRoutes from "./rutas/registroUsuario.js";
import loginUsuario from "./rutas/loginUsuario.js";
import indexRoutes from "./rutas/index.js"; // Importa las rutas aquí
import eliminarRoutes from "./rutas/eliminarUsuario.js";

import crearVisitas from "./rutas/crearVisitaTecnica.js";

import crearPracticaPreprofesion from "./rutas/crearPractica.js";

import admirarPractica from "./rutas/admirarPracticaEstudiante.js";

import admirarVisitaProfesor from "./rutas/admirarVisitaDocente.js";

import admirarPracticaProfesor from "./rutas/admirarPracticasProfesor.js"

import modificarPractica from "./rutas/modificarPracticaProfesor.js"

import recuperarDatosPractica from "./rutas/recuperarDatosPracticasProfesor.js"


const app = express();

// Configuración del motor de vistas
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Manejo de sesiones
app.use(session({
    secret: 'tu_contraseña', // Clave secreta para firmar las cookies
    resave: false,
    saveUninitialized: true
}));

// Rutas dinámicas y estáticas
app.use("/", indexRoutes); // Usa las rutas importadas
app.use(express.static("pages"));

// Registrar rutas adicionales
app.use("/", usuarioRoutes);
app.use("/", loginUsuario);
app.use("/", eliminarRoutes);
app.use("/", crearVisitas);
app.use("/", crearPracticaPreprofesion);
app.use("/", admirarPractica);
app.use("/", admirarVisitaProfesor);
app.use("/", admirarPracticaProfesor);
app.use("/", modificarPractica);
app.use("/", recuperarDatosPractica);



// Configuración del puerto y arranque del servidor
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

