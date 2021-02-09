-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tucondo
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `apartamentos`
--

DROP TABLE IF EXISTS `apartamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartamentos` (
  `apartamento_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) COLLATE utf8_bin NOT NULL,
  `alicuota` varchar(20) COLLATE utf8_bin NOT NULL,
  `is_alquilado` tinyint(1) NOT NULL,
  `dimensiones` varchar(20) COLLATE utf8_bin NOT NULL,
  `eliminado` tinyint(1) NOT NULL,
  `edificio_id` int DEFAULT NULL,
  `usuario_id` int DEFAULT NULL,
  PRIMARY KEY (`apartamento_id`),
  KEY `edificio_id` (`edificio_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `apartamentos_ibfk_1` FOREIGN KEY (`edificio_id`) REFERENCES `edificios` (`edificio_id`),
  CONSTRAINT `apartamentos_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartamentos`
--

LOCK TABLES `apartamentos` WRITE;
/*!40000 ALTER TABLE `apartamentos` DISABLE KEYS */;
INSERT INTO `apartamentos` VALUES (1,'2B','12%',0,'100 m2',1,4,5),(2,'2A','5%',1,'120 m2',0,4,2),(3,'1A','25%',1,'90 m2',0,4,3),(4,'4A','25%',0,'200 m2',0,1,9),(5,'8A','14%',0,'200 m2',0,3,10);
/*!40000 ALTER TABLE `apartamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `condominios`
--

DROP TABLE IF EXISTS `condominios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `condominios` (
  `condominio_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) COLLATE utf8_bin NOT NULL,
  `eliminado` tinyint(1) NOT NULL,
  `usuario_id` int DEFAULT NULL,
  PRIMARY KEY (`condominio_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `condominios_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `condominios`
--

LOCK TABLES `condominios` WRITE;
/*!40000 ALTER TABLE `condominios` DISABLE KEYS */;
INSERT INTO `condominios` VALUES (1,'TuCondo',0,1),(2,'MiCondo',0,5),(3,'NuestroCondo',0,10),(4,'VuestroCondo',0,7),(5,'SuCondo',0,1);
/*!40000 ALTER TABLE `condominios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `edificios`
--

DROP TABLE IF EXISTS `edificios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `edificios` (
  `edificio_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) COLLATE utf8_bin NOT NULL,
  `num_pisos` int NOT NULL,
  `eliminado` tinyint(1) NOT NULL,
  `condominio_id` int DEFAULT NULL,
  PRIMARY KEY (`edificio_id`),
  KEY `condominio_id` (`condominio_id`),
  CONSTRAINT `edificios_ibfk_1` FOREIGN KEY (`condominio_id`) REFERENCES `condominios` (`condominio_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `edificios`
--

LOCK TABLES `edificios` WRITE;
/*!40000 ALTER TABLE `edificios` DISABLE KEYS */;
INSERT INTO `edificios` VALUES (1,'Tus rosas',4,0,1),(2,'Tus petalos',10,0,2),(3,'Tus ramas',8,0,3),(4,'Tus hojas',2,0,4),(5,'Tus arboles',12,0,5);
/*!40000 ALTER TABLE `edificios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `usuario_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) COLLATE utf8_bin NOT NULL,
  `apellido` varchar(40) COLLATE utf8_bin NOT NULL,
  `cedula` varchar(10) COLLATE utf8_bin NOT NULL,
  `correo` varchar(70) COLLATE utf8_bin NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `eliminado` tinyint(1) NOT NULL,
  PRIMARY KEY (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Carla','Rodriguez','27246963','carlyta99@gmail.com',1,0),(2,'Maria','Diaz','24587625','mariajose@gmail.com',0,0),(3,'Carlos','Graterol','21459875','carlosgraterol@gmail.com',0,0),(4,'Andrea','Rodriguez','20799874','iandc277@gmail.com',1,0),(5,'Valeria','Madio','24585214','valeritamadio@gmail.com',0,0),(6,'Miguel','Jaimes','27391760','miguelbebeto1@gmail.com',1,0),(7,'Manuel','Mendoza','20145874','manuelito@gmail.com',0,0),(8,'Vito','Tatoli','21547965','tatolico@gmail.com',1,0),(9,'Gilberto','Pucciarelli','25476584','gilbertop@gmail.com',0,0),(10,'Arturo','Linares','24789654','arturito@gmail.com',0,0),(11,'Leonardo','Gonzalez','5255333','sdfgh@gmailcom',0,0);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-09 16:54:40
