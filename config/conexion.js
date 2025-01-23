import mysql from "mysql2";

const conexion = mysql.createConnection({
    host: "localhost",
    database: "db_anteproyecto",
    user: "root",
    password: "Balatro",
});

conexion.connect((error) => {
    if (error) {
        console.error("Error al conectar a la base de datos:", error);
        return;
    }
    console.log("Conexión exitosa a la base de datos.");
});

export default conexion;
