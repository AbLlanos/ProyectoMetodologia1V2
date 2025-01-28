create database db_anteproyecto;

use db_anteproyecto;

create table usuarios (
    id_usuario int auto_increment,
    nombre varchar(100) not null,
    apellido varchar(100) not null,
    cedula varchar(10) not null unique,
	telefono varchar(10) not null,
    correo_electronico varchar(150) unique not null,
    contrasena varchar(255) not null,
    rol enum('estudiante', 'docente') not null,
	fecha_creacion timestamp default current_timestamp,
	constraint primary key (id_usuario)
);

select * from usuarios;

create table  practicas_preprofesionales(
    id_practica int auto_increment primary key,
    nombre_estudiante varchar(45) not null, 
    cedula_estudiante varchar(10) not null,
    id_docente int not null,
    nombre_docente varchar(45) not null,
    empresa varchar(150) not null,
    materia varchar(150) not null,
    fecha_inicio date not null,
    fecha_fin date not null,
    calificacion decimal(5, 2),
    estado enum('en_progreso', 'finalizada', 'cancelada') default 'en_progreso',
    fecha_registro timestamp default current_timestamp
);

select * from practicas_preprofesionales;


create table visitas_tecnicas (
    id_visita int auto_increment primary key,
    nombre_docente varchar(45) not null,
    nombre_empresa varchar(45) not null,
    descripcion text not null,
    fecha_visita date not null,
    observaciones text,
    fecha_registro timestamp default current_timestamp
);

select * from visitas_tecnicas;

create table registro_practicas(
    id_registro int auto_increment primary key,
    nombre_docente varchar(45) not null,
    nombre_empresa varchar(45) not null,
	hora_inicio datetime not null,
    ubicacion_inicio varchar(45) not null,
    hora_final datetime not null,
    ubicacion_final varchar(45) not null,
);




