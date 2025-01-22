create database paginaElectrodomesticos;

use  paginaElectrodomesticos;

create table usuarios (
    idUsuario int auto_increment,
    nombre varchar(50) not null,
    apellido varchar(50) not null,
    usuario varchar(50) not null unique,
    telefono varchar(10),
    email varchar(100) not null unique,
    contrasena varchar(255) not null,
    fecha_nacimiento date not null,
	rol enum('estudiante','docente') not null,
	fechaRegistro timestamp default current_timestamp,
    constraint primary key (idUsuario)
);


select * from usuarios;

create table estudiantes (
    id int auto_increment,
    nombreMateria varchar(255),
    fechaInicio date,
    fechaFin date,
    calificacion float,
    constraint primary key (id)
);

INSERT INTO estudiantes (nombreMateria, fechaInicio, fechaFin, calificacion) 
VALUES ("artes", "2025-01-20", "2025-02-10", 4);


select * from estudiantes;