create database db_anteproyecto;

use db_anteproyecto;

create table usuarios (
    id_usuario int auto_increment,
    nombre varchar(100) not null,
    apellido varchar(100) not null,
    usuario varchar(100) not null unique,
    cedula varchar(10) not null unique,
	telefono varchar(10) not null,
    correo_electronico varchar(150) unique not null,
    contrasena varchar(255) not null,
    periodo_academico varchar(45) not null,
    rol enum('estudiante', 'vinculacion practicas','administrador') not null,
	fecha_creacion timestamp default current_timestamp,
	constraint primary key (id_usuario)
);

select * from usuarios;

CREATE TABLE registro_practicas (
    id_registro int auto_increment,
    hora_inicio datetime not null,
    ubicacion_inicio varchar(45) not null,
    hora_final datetime not null,
    ubicacion_final varchar(45) not null,
    entidad_beneficiaria varchar(45) not null,
    hora_total_visita time as (timediff(hora_final, hora_inicio)) stored,
    cedula_estudiante varchar(45) not null, 
    usuario_estudiante varchar(10) not null,
    id_unidadvinculacion int not null,
    nombre_unidadvinculacion varchar(45) not null,
    calificacion decimal(3,1) not null,  -- Agregada la columna de calificación
    estado enum('en_progreso', 'finalizada', 'cancelada') not null, -- Columna para estado
    fecha_registro timestamp default current_timestamp,
    constraint primary key (id_registro)
);

select * from  registro_practicas ;





