CREATE TABLE `medicos` (
  `Cedula` int(50) PRIMARY KEY,
  `Nombres` varchar(100),
  `Apellidos` varchar(100),
  `TipoDocumento` char(2),
  `NumeroDocumento` int(30),
  `Consultorio` char(3),
  `Celular` varchar(13),
  `Correo` varchar(50),
  `Especialidad` varchar(60)
);

CREATE TABLE `pacientes` (
  `Cedula` int PRIMARY KEY,
  `Nombres` varchar(100),
  `Apellidos` varchar(100),
  `TipoDocumento` char(2),
  `NumeroDocumento` int(30),
  `Fecha_Nacimiento` date,
  `Celular` varchar(13)
);

CREATE TABLE `Cita_Medica` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `Cedula_Medico` int(50),
  `Cedula_Paciente` int(50),
  `fecha_cita` date
);

ALTER TABLE `Cita_Medica` ADD FOREIGN KEY (`Cedula_Medico`) REFERENCES `medicos` (`Cedula`);

ALTER TABLE `Cita_Medica` ADD FOREIGN KEY (`Cedula_Paciente`) REFERENCES `pacientes` (`Cedula`);
