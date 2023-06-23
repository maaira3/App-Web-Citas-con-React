-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-06-2023 a las 14:07:18
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `elementalv2`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `Agregar_Cliente` (IN `nameP` VARCHAR(30), IN `telefonoP` VARCHAR(10), IN `edadP` TINYINT UNSIGNED, IN `emailP` VARCHAR(20), IN `passwordP` VARCHAR(10))   BEGIN

 DECLARE idClienteP smallint UNSIGNED DEFAULT 0;

 SELECT idCliente into idClienteP FROM Cliente WHERE email = emailP;  

 if( idClienteP = 0 ) THEN

    INSERT INTO Cliente(nombre,telefono,edad,email,password,horarioSesion,pagoServicio) VALUES (nameP,telefonoP,edadP,emailP,passwordP,NULL,0);

    SELECT idCliente FROM Cliente WHERE email = emailP;

 END IF;   

 if( idClienteP > 0 ) THEN

    SELECT -1;

 END IF;

 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Borrar_Horario` (`idTerapeutaP` SMALLINT(5), `citaSeleccionada` DATETIME)   BEGIN
 
 DELETE FROM horario WHERE idTerapeuta = idTerapeutaP and horarioDisponible = citaSeleccionada;
  
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Crear_Horario` (`idTerapeutaP` SMALLINT(5), `citaCreada` DATETIME)   BEGIN
 
 
 INSERT INTO horario (horarioDisponible,idTerapeuta,estado) values ( citaCreada , idTerapeutaP, 'disponible' );
  
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Logear_Cliente` (IN `emailP` VARCHAR(20), IN `passwordP` VARCHAR(10))   BEGIN


 SELECT idCliente FROM cliente WHERE email = emailP and password=passwordP;  
 
  

 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Solicitar_Cita` (IN `idClienteP` SMALLINT(5), IN `citaSeleccionada` DATETIME)   BEGIN
 
 DECLARE idTerapeutaP smallint UNSIGNED DEFAULT 0;
 
 SELECT terapeuta.idTerapeuta into idTerapeutaP FROM terapeuta, cliente WHERE terapeuta.idTerapeuta = cliente.idTerapeuta and cliente.idCliente = idClienteP ;

 UPDATE horario, terapeuta SET horario.estado = 'no disponible', horario.idCliente = idClienteP  WHERE horario.horarioDisponible = citaSeleccionada and  horario.idTerapeuta = terapeuta.idTerapeuta and terapeuta.idTerapeuta = idTerapeutaP ;
 
 UPDATE cliente SET horarioSesion = citaSeleccionada, pagoServicio = 0 WHERE idCliente = idClienteP;
 

 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Ver_Citas` (IN `idClienteP` SMALLINT(5))   BEGIN
 
 DECLARE idTerapeutaP smallint UNSIGNED DEFAULT 0;
 
 SELECT terapeuta.idTerapeuta into idTerapeutaP FROM terapeuta, cliente WHERE terapeuta.idTerapeuta = cliente.idTerapeuta and cliente.idCliente = idClienteP ;

 SELECT horario.horarioDisponible, horario.idTerapeuta FROM horario, terapeuta WHERE horario.idTerapeuta = terapeuta.idTerapeuta and terapeuta.idTerapeuta = idTerapeutaP and horario.estado = 'disponible' ;
 
 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Ver_Citas_Terapeuta` (IN `idTerapeutaP` SMALLINT(5))   BEGIN
 
 
 SELECT * FROM horario WHERE idTerapeuta = idTerapeutaP and estado='disponible';
 
 
 END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `blog`
--

CREATE TABLE `blog` (
  `idpost` smallint(5) UNSIGNED NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `imagenpost` varchar(100) DEFAULT NULL,
  `contenido` varchar(20000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `blog`
--

INSERT INTO `blog` (`idpost`, `titulo`, `imagenpost`, `contenido`) VALUES
(1, 'Prueba Post 6', 'mental-health-6994374_960_720.png', 'Lorem ipsum dolor sit amet consectetur adipiscing, elit nascetur lacinia porta ullamcorper nisi fames, velit malesuada nullam dignissim erat. Venenatis nascetur diam bibendum rhoncus blandit nibh curabitur, tincidunt arcu praesent dis fermentum ante dui interdum, pulvinar varius laoreet potenti nunc eu. Vulputate sed ac parturient dictumst egestas sollicitudin mauris ullamcorper, praesent quis aenean malesuada primis augue nec tortor mi, tincidunt sociis habitasse viverra proin vel interdum.\n\nVulputate venenatis orci netus bibendum vehicula consequat sed imperdiet, cursus donec volutpat fusce eros auctor pellentesque natoque, convallis rutrum non mi tristique id nunc. Habitasse eleifend blandit cum orci viverra duis rutrum, morbi feugiat laoreet suspendisse consequat porttitor fusce senectus, id nullam velit lectus mollis nostra. Aptent fames torquent facilisis dictum etiam vulputate sagittis ultricies lobortis tincidunt, leo fermentum interdum tempus hendrerit potenti eros purus nascem'),
(9, 'Prueba 2', 'logo-ipn.png', 'Lorem ipsum dolor sit amet consectetur adipiscing elit, suscipit accumsan convallis montes purus non, auctor imperdiet semper mus maecenas nec. Laoreet hendrerit ligula malesuada sed mus netus, consequat justo non eu molestie, venenatis facilisi imperdiet bibendum pulvinar. Egestas posuere maecenas id imperdiet ac torquent inceptos varius eget, nunc penatibus felis sapien velit magnis facilisis cras, praesent per quisque dis erat dignissim parturient curabitur.\n\nEnim donec in nibh facilisis nec rhoncus quis, ridiculus sed dictumst dignissim odio ut. Convallis aliquet morbi fames aenean mollis litora ornare ad, dis vel pulvinar pretium vivamus nibh neque arcu orci, penatibus ridiculus velit ultricies bibendum torquent nec. Blandit hendrerit praesent potenti luctus purus lacinia sed sodales, quam ligula eu morbi torquent tincidunt volutpat aenean, egestas urna est ridiculus tellus inceptos eget. Montes magna sagittis magnis curabitur ornare mattis litora eget, gravida condimentum orci senectus integer torquent etiam phasellus malesuada, massa nec dapibus id vehicula cursus vel.\n\nHendrerit varius condimentum fermentum semper inceptos vehicula, ligula himenaeos litora imperdiet potenti suscipit commodo, luctus scelerisque quisque dapibus interdum. Facilisi viverra aptent consequat primis fusce scelerisque tempor morbi integer, in porttitor lobortis praesent cubilia felis tempus interdum semper, netus ut massa hendrerit imperdiet mus nam magna. Mollis sociosqu varius nunc nibh iaculis consequat dis odio metus suscipit, condimentum pretium quam aliquam egestas netus blandit nisi. Nisi nec fusce faucibus leo etiam torquent rutrum, nam maecenas risus rhoncus netus mi mattis dictum, elementum metus vehicula tristique egestas dis.,,,,'),
(11, 'Prueba 3', 'mother-1039765_960_720.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse semper risus massa, sit amet elementum ante luctus et. Nunc et vestibulum metus, sit amet condimentum justo. Fusce egestas nibh a rutrum volutpat. Nam felis orci, semper semper hendrerit at, facilisis et sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean consectetur varius lorem, ut luctus dui tempor nec. Nunc a felis in nisi mattis euismod. Phasellus tempus nisi in dui pulvinar accumsan. Duis non tincidunt tortor. Etiam tristique, odio et mattis rhoncus, nunc tortor fringilla nisl, vitae volutpat orci est vel sapien. Pellentesque vitae erat laoreet, ultrices erat eget, dictum dolor. Nullam maximus odio vel nisl fringilla, et bibendum neque rutrum. Aliquam vel sodales mi. Sed posuere eros sit amet mauris pulvinar, quis maximus libero congue. Fusce commodo dolor orci, vel luctus nulla bibendum id.\n\nSed consequat ante eu dolor vehicula, ac porttitor tellus tempor. Proin vestibulum, augue id pharetra consequat, metus ante malesuada odio, tincidunt commodo odio libero id nibh. Donec tortor lacus, facilisis congue libero maximus, gravida porta sapien. Etiam vehicula ut diam interdum volutpat. Sed in sagittis nisi. Aenean consequat feugiat enim quis finibus. Vivamus tempor sollicitudin elit volutpat cursus. Aliquam euismod scelerisque dignissim. Praesent lobortis nulla dapibus accumsan condimentum. Morbi eget tortor eu turpis eleifend aliquam at quis ipsum.\n\nAenean pretium velit ac varius ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi dignissim augue dui, id tincidunt dolor eleifend in. Nunc sit amet maximus augue, a efficitur ante. Duis ultricies pretium eros ac tempor. Maecenas a nunc ac mauris lobortis cursus. Curabitur id tempor ligula. Nam in congue tellus, vel pharetra justo. Sed tincidunt metus quam, nec posuere purus elementum non. Fusce vitae iaculis nisl, a feugiat ex. Phasellus eget bibendum diam, a gravida felis. Aliquam vitae nunc eget quam tempus ultricies.'),
(12, 'Prueba 4', 'mental-health-6994374_960_720.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse semper risus massa, sit amet elementum ante luctus et. Nunc et vestibulum metus, sit amet condimentum justo. Fusce egestas nibh a rutrum volutpat. Nam felis orci, semper semper hendrerit at, facilisis et sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean consectetur varius lorem, ut luctus dui tempor nec. Nunc a felis in nisi mattis euismod. Phasellus tempus nisi in dui pulvinar accumsan. Duis non tincidunt tortor. Etiam tristique, odio et mattis rhoncus, nunc tortor fringilla nisl, vitae volutpat orci est vel sapien. Pellentesque vitae erat laoreet, ultrices erat eget, dictum dolor. Nullam maximus odio vel nisl fringilla, et bibendum neque rutrum. Aliquam vel sodales mi. Sed posuere eros sit amet mauris pulvinar, quis maximus libero congue. Fusce commodo dolor orci, vel luctus nulla bibendum id.\n\nSed consequat ante eu dolor vehicula, ac porttitor tellus tempor. Proin vestibulum, augue id pharetra consequat, metus ante malesuada odio, tincidunt commodo odio libero id nibh. Donec tortor lacus, facilisis congue libero maximus, gravida porta sapien. Etiam vehicula ut diam interdum volutpat. Sed in sagittis nisi. Aenean consequat feugiat enim quis finibus. Vivamus tempor sollicitudin elit volutpat cursus. Aliquam euismod scelerisque dignissim. Praesent lobortis nulla dapibus accumsan condimentum. Morbi eget tortor eu turpis eleifend aliquam at quis ipsum.\n\nAenean pretium velit ac varius ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi dignissim augue dui, id tincidunt dolor eleifend in. Nunc sit amet maximus augue, a efficitur ante. Duis ultricies pretium eros ac tempor. Maecenas a nunc ac mauris lobortis cursus. Curabitur id tempor ligula. Nam in congue tellus, vel pharetra justo. Sed tincidunt metus quam, nec posuere purus elementum non. Fusce vitae iaculis nisl, a feugiat ex. Phasellus eget bibendum diam, a gravida felis. Aliquam vitae nunc eget quam tempus ultricies.'),
(13, 'Prueba 5', 'child-1260421_960_720.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse semper risus massa, sit amet elementum ante luctus et. Nunc et vestibulum metus, sit amet condimentum justo. Fusce egestas nibh a rutrum volutpat. Nam felis orci, semper semper hendrerit at, facilisis et sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean consectetur varius lorem, ut luctus dui tempor nec. Nunc a felis in nisi mattis euismod. Phasellus tempus nisi in dui pulvinar accumsan. Duis non tincidunt tortor. Etiam tristique, odio et mattis rhoncus, nunc tortor fringilla nisl, vitae volutpat orci est vel sapien. Pellentesque vitae erat laoreet, ultrices erat eget, dictum dolor. Nullam maximus odio vel nisl fringilla, et bibendum neque rutrum. Aliquam vel sodales mi. Sed posuere eros sit amet mauris pulvinar, quis maximus libero congue. Fusce commodo dolor orci, vel luctus nulla bibendum id.\n\nSed consequat ante eu dolor vehicula, ac porttitor tellus tempor. Proin vestibulum, augue id pharetra consequat, metus ante malesuada odio, tincidunt commodo odio libero id nibh. Donec tortor lacus, facilisis congue libero maximus, gravida porta sapien. Etiam vehicula ut diam interdum volutpat. Sed in sagittis nisi. Aenean consequat feugiat enim quis finibus. Vivamus tempor sollicitudin elit volutpat cursus. Aliquam euismod scelerisque dignissim. Praesent lobortis nulla dapibus accumsan condimentum. Morbi eget tortor eu turpis eleifend aliquam at quis ipsum.\n\nAenean pretium velit ac varius ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi dignissim augue dui, id tincidunt dolor eleifend in. Nunc sit amet maximus augue, a efficitur ante. Duis ultricies pretium eros ac tempor. Maecenas a nunc ac mauris lobortis cursus. Curabitur id tempor ligula. Nam in congue tellus, vel pharetra justo. Sed tincidunt metus quam, nec posuere purus elementum non. Fusce vitae iaculis nisl, a feugiat ex. Phasellus eget bibendum diam, a gravida felis. Aliquam vitae nunc eget quam tempus ultricies.'),
(14, 'Prueba 6', 'woman-3190829_960_720.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse semper risus massa, sit amet elementum ante luctus et. Nunc et vestibulum metus, sit amet condimentum justo. Fusce egestas nibh a rutrum volutpat. Nam felis orci, semper semper hendrerit at, facilisis et sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean consectetur varius lorem, ut luctus dui tempor nec. Nunc a felis in nisi mattis euismod. Phasellus tempus nisi in dui pulvinar accumsan. Duis non tincidunt tortor. Etiam tristique, odio et mattis rhoncus, nunc tortor fringilla nisl, vitae volutpat orci est vel sapien. Pellentesque vitae erat laoreet, ultrices erat eget, dictum dolor. Nullam maximus odio vel nisl fringilla, et bibendum neque rutrum. Aliquam vel sodales mi. Sed posuere eros sit amet mauris pulvinar, quis maximus libero congue. Fusce commodo dolor orci, vel luctus nulla bibendum id.\n\nSed consequat ante eu dolor vehicula, ac porttitor tellus tempor. Proin vestibulum, augue id pharetra consequat, metus ante malesuada odio, tincidunt commodo odio libero id nibh. Donec tortor lacus, facilisis congue libero maximus, gravida porta sapien. Etiam vehicula ut diam interdum volutpat. Sed in sagittis nisi. Aenean consequat feugiat enim quis finibus. Vivamus tempor sollicitudin elit volutpat cursus. Aliquam euismod scelerisque dignissim. Praesent lobortis nulla dapibus accumsan condimentum. Morbi eget tortor eu turpis eleifend aliquam at quis ipsum.\n\nAenean pretium velit ac varius ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi dignissim augue dui, id tincidunt dolor eleifend in. Nunc sit amet maximus augue, a efficitur ante. Duis ultricies pretium eros ac tempor. Maecenas a nunc ac mauris lobortis cursus. Curabitur id tempor ligula. Nam in congue tellus, vel pharetra justo. Sed tincidunt metus quam, nec posuere purus elementum non. Fusce vitae iaculis nisl, a feugiat ex. Phasellus eget bibendum diam, a gravida felis. Aliquam vitae nunc eget quam tempus ultricies.'),
(15, 'Prueba 7 ', 'mother-1039765_960_720.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse semper risus massa, sit amet elementum ante luctus et. Nunc et vestibulum metus, sit amet condimentum justo. Fusce egestas nibh a rutrum volutpat. Nam felis orci, semper semper hendrerit at, facilisis et sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean consectetur varius lorem, ut luctus dui tempor nec. Nunc a felis in nisi mattis euismod. Phasellus tempus nisi in dui pulvinar accumsan. Duis non tincidunt tortor. Etiam tristique, odio et mattis rhoncus, nunc tortor fringilla nisl, vitae volutpat orci est vel sapien. Pellentesque vitae erat laoreet, ultrices erat eget, dictum dolor. Nullam maximus odio vel nisl fringilla, et bibendum neque rutrum. Aliquam vel sodales mi. Sed posuere eros sit amet mauris pulvinar, quis maximus libero congue. Fusce commodo dolor orci, vel luctus nulla bibendum id.\n\nSed consequat ante eu dolor vehicula, ac porttitor tellus tempor. Proin vestibulum, augue id pharetra consequat, metus ante malesuada odio, tincidunt commodo odio libero id nibh. Donec tortor lacus, facilisis congue libero maximus, gravida porta sapien. Etiam vehicula ut diam interdum volutpat. Sed in sagittis nisi. Aenean consequat feugiat enim quis finibus. Vivamus tempor sollicitudin elit volutpat cursus. Aliquam euismod scelerisque dignissim. Praesent lobortis nulla dapibus accumsan condimentum. Morbi eget tortor eu turpis eleifend aliquam at quis ipsum.\n\nAenean pretium velit ac varius ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi dignissim augue dui, id tincidunt dolor eleifend in. Nunc sit amet maximus augue, a efficitur ante. Duis ultricies pretium eros ac tempor. Maecenas a nunc ac mauris lobortis cursus. Curabitur id tempor ligula. Nam in congue tellus, vel pharetra justo. Sed tincidunt metus quam, nec posuere purus elementum non. Fusce vitae iaculis nisl, a feugiat ex. Phasellus eget bibendum diam, a gravida felis. Aliquam vitae nunc eget quam tempus ultricies.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `idcliente` smallint(5) UNSIGNED NOT NULL,
  `idterapeuta` smallint(5) UNSIGNED DEFAULT NULL,
  `horariosesion` datetime DEFAULT NULL,
  `pagoservicio` tinyint(1) DEFAULT NULL,
  `link` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `idusuario` smallint(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`idcliente`, `idterapeuta`, `horariosesion`, `pagoservicio`, `link`, `idusuario`) VALUES
(10, 21, '2023-01-06 06:37:50', 1, '', 3),
(47, 23, '2023-01-06 06:37:50', 1, 'https://meet.google.com/shn-nibv-efw', 14);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historialsesiones`
--

CREATE TABLE `historialsesiones` (
  `idterapeuta` smallint(5) UNSIGNED NOT NULL,
  `idcliente` smallint(5) UNSIGNED NOT NULL,
  `horariosesion` date DEFAULT NULL,
  `idhistorialsesiones` smallint(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horarios`
--

CREATE TABLE `horarios` (
  `idhorario` smallint(5) NOT NULL,
  `horariodisponible` datetime NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `idterapeuta` smallint(5) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `horarios`
--

INSERT INTO `horarios` (`idhorario`, `horariodisponible`, `estado`, `idterapeuta`) VALUES
(6, '2022-09-06 09:07:00', 1, 21),
(5, '2022-09-05 09:07:00', 1, 21),
(4, '2022-09-02 09:07:00', 1, 21),
(7, '2022-09-08 12:07:00', 1, 21),
(8, '2022-09-15 20:18:00', 1, 23),
(9, '2022-09-22 20:18:00', 1, 23);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `idservicio` int(100) NOT NULL,
  `nomservicio` varchar(100) NOT NULL,
  `descservicio` varchar(100) NOT NULL,
  `cantidadsesiones` int(11) NOT NULL,
  `precioservicio` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`idservicio`, `nomservicio`, `descservicio`, `cantidadsesiones`, `precioservicio`) VALUES
(1, 'Consulta Unitaria', 'Consulta psicologica', 1, 80000),
(2, 'Paquete base', '4 Consultas psicologicas a 65,000 c/u', 4, 260000),
(6, 'Paquete Plus', '8 consultas psicologicas', 8, 480000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `terapeuta`
--

CREATE TABLE `terapeuta` (
  `idterapeuta` smallint(5) UNSIGNED NOT NULL,
  `rutaimagen` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `descripcion` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `idusuario` smallint(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `terapeuta`
--

INSERT INTO `terapeuta` (`idterapeuta`, `rutaimagen`, `descripcion`, `idusuario`) VALUES
(21, 'CEO_Margarita.jpeg', '¡Hola! Soy psicóloga de la Universidad del Rosario, Bogotá, Colombia. Magíster en Estudios Sociales de la misma universidad y estudiante de la maestría en psicología clínica y de la salud de la Universidad de los Andes. Tengo experiencia como docente universitaria, política pública e investigación académica. Me interesa el desarrollo de proyectos educativos y sociales para promover habilidades de comunicación, crianza e inteligencia emocional en distintas poblaciones. Creo que la salud mental puede expandirse a otros territorios y lugares. Estoy a cargo del área educativa y la promoción de habilidades blandas igual que el área de divulgación científica. Para mí, será un gusto acompañarte en tu proceso de cambio desde la parte educativa.', 5),
(22, 'Cofounder_coordinador_Carlos_convers.png', '¡Hola! Soy psicólogo de la Universidad del Rosario con énfasis en psicología clínica. Actualmente curso la maestría en psicología clínica con orientación cognitivo-conductual de la Universidad Javeriana. Creo que la salud mental es el camino para acompañar a verdaderos cambios en la vida de las personas. Mi experiencia está enfocada en la atención individual en diversos casos y en el acompañamiento de trastornos afectivos. En la actualidad coordino el área de terapeutas de Psicoelemental.', 6),
(23, 'Tatiana_Beltran_terapeuta.jpeg', 'Psicóloga de la Universidad del Rosario con énfasis en psicología clínica y de la salud. Estudiante de la Maestría en Psicología clínica con énfasis cognitivo conductual de la Universidad Nacional de Colombia. Cuento con experiencia en atención individual y grupal en temas de depresión, ansiedad, violencia de género, diversidad, experiencias traumáticas y autoestima. Conmigo encontrarás espacios seguros y cómodos en los cuales trabajaremos en conjunto para lograr tus objetivos.', 7),
(26, 'Mariana_Parra.jpeg', 'Psicóloga egresada de la Universidad del Rosario con énfasis en psicología clínica y de la salud. Soy una profesional apasionada por ayudar a las personas a tener una mejor calidad de vida, enseñándoles a desarrollar habilidades y a establecer hábitos en sus vidas que les permitan alcanzar los objetivos que se trazan. Cuento con experiencia en atención psicológica clínica de adultos y adolescentes con distintas enfermedades crónicas (cáncer, cardiopatía, etc) así como patologías psicológicas (depresión, ansiedad, etc). Mi interés está enfocado en brindar orientación psicológica con terapias basadas en la evidencia y siempre con el objetivo de ofrecerle al paciente la mejor atención.', 10),
(27, 'IMG_20211207_155340_528.jpg', 'Psicólogo clínico de la Universidad del Rosario, Bogotá, Colombia, Especialista en evaluación clínica y tratamiento de trastornos emocionales y afectivos de la Konrad Lorenz, Magíster en Psicología Clínica de la misma universidad. Soy un psicólogo clínico especializado en terapia individual con adultos. Mi enfoque es pragmático y práctico, orientado a la acción y el cambio en el día a día. Si tienes problemas de ansiedad, depresión, de comunicación, estrés, cumplimiento de objetivos personales o hay algún aspecto de tu vida en el que quieras trabajar, yo podré ayudarte.', 11),
(28, 'Katherine_Hernandez.jpg', 'Psicóloga con énfasis en psicología clínica y de la salud de la Universidad del Rosario y de la  Universidad de Bolonia, Italia. Cursando Maestría en Psicología de la Universidad El Bosque. Cuento con experiencia en evaluación e intervención clínica con adolescentes y adultos con enfermedades crónicas y problemas que impactan su calidad de vida y bienestar emocional. Me apasiona acompañar a las personas en su proceso personal para ser una mejor versión de sí mismos.', 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idusuario` smallint(5) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `edad` smallint(2) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(8) NOT NULL,
  `tipo` varchar(15) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idusuario`, `nombre`, `telefono`, `edad`, `email`, `password`, `tipo`) VALUES
(1, 'Administrador', '11080399', 23, 'admin@elemental.com', 'admin123', 'administrador'),
(3, 'Paciente Prueba1', '0123456789', 25, 'paciente@elemental.com', 'pacie123', 'cliente'),
(5, 'Margarita Villota', '0000000000', 20, 'margarita.vb@elemental.com', 'margarit', 'terapeuta'),
(6, 'Carlos Convers', '0000000000', 24, 'carlos.c@elemental.com', 'carlosc1', 'terapeuta'),
(7, 'Tatiana Beltran', '0000000000', 24, 'tatiana.b@elemental.com', 'tatianab', 'terapeuta'),
(10, 'Mariana Parra Cruz', '0000000000', 24, 'mariana.pc@elemental.com', 'marianap', 'terapeuta'),
(11, 'David Garcia', '0000000000', 24, 'david.g@elemental.com', 'davidg12', 'terapeuta'),
(12, 'Katheryn Hernandez', '0000000000', 24, 'katheryn.h@elemental.com', 'katheryn', 'terapeuta'),
(14, 'Maira Jimenez', '5565221279', 24, 'mai@elemental.com', 'maira398', 'cliente');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`idpost`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`idcliente`),
  ADD KEY `idTerapeuta` (`idterapeuta`);

--
-- Indices de la tabla `historialsesiones`
--
ALTER TABLE `historialsesiones`
  ADD PRIMARY KEY (`idhistorialsesiones`),
  ADD KEY `idTerapeuta` (`idterapeuta`),
  ADD KEY `idCliente` (`idcliente`);

--
-- Indices de la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD PRIMARY KEY (`idhorario`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`idservicio`);

--
-- Indices de la tabla `terapeuta`
--
ALTER TABLE `terapeuta`
  ADD PRIMARY KEY (`idterapeuta`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idusuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `blog`
--
ALTER TABLE `blog`
  MODIFY `idpost` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `idcliente` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `historialsesiones`
--
ALTER TABLE `historialsesiones`
  MODIFY `idhistorialsesiones` smallint(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `horarios`
--
ALTER TABLE `horarios`
  MODIFY `idhorario` smallint(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `idservicio` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `terapeuta`
--
ALTER TABLE `terapeuta`
  MODIFY `idterapeuta` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idusuario` smallint(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`idTerapeuta`) REFERENCES `terapeuta` (`idTerapeuta`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `historialsesiones`
--
ALTER TABLE `historialsesiones`
  ADD CONSTRAINT `historialsesiones_ibfk_1` FOREIGN KEY (`idTerapeuta`) REFERENCES `terapeuta` (`idTerapeuta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `historialsesiones_ibfk_2` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
