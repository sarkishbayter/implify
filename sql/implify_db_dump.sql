CREATE DATABASE IF NOT EXISTS implify_db;
USE implify_db;

-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: implify_db
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `companyId` int NOT NULL,
  `companyName` varchar(50) DEFAULT NULL,
  `companyColor` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`companyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,'chanay','#8a3b93'),(2,'Benton','#8bc447'),(3,'chemel','#1473bb'),(4,'Feltz Printing','#c32482'),(5,'Commercial Press',' #dde553');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `Id` int NOT NULL,
  `fname` varchar(50) DEFAULT NULL,
  `lname` varchar(50) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `photo` varchar(50) DEFAULT NULL,
  `companyId` int DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (13,'Bette','Ruta','98 Connecticut Ave Nw','Chagrin Falls','Geauga','images/default.jpg',1),(14,'Veronika','Albares','56 E Morehead St','Laredo','Webb','images/default.jpg',1),(15,'Rufus','Oconnor','123 Elm St','Seattle','King','images/default.jpg',2),(16,'Mariana','Lindsey','456 Oak Rd','Austin','Travis','images/default.jpg',3),(17,'Dwayne','Schneider','789 Pine Ave','Denver','Denver','images/default.jpg',4),(18,'Nadia','Kessler','321 Cedar Ln','Miami','Miami-Dade','images/default.jpg',5),(19,'Jasper','Finch','654 Walnut Blvd','Dallas','Dallas','images/default.jpg',1),(20,'Lillian','Holloway','987 Birch Ct','Phoenix','Maricopa','images/default.jpg',2),(22,'Josephine','Darakjy','4 B Blue Ridge Blvd','Brighton','Livingston','images/default.jpg',1),(23,'Art','Venere','8 W Cerritos Ave #54','Bridgeport','Gloucester','images/default.jpg',4),(34,'Lenna','Paprocki','639 Main St','Anchorage','Anchorage','images/default.jpg',3),(45,'Donette','Foller','34 Center St','Hamilton','Butler','images/default.jpg',4),(56,'Simona','Morasca','3 Mcauley Dr','Ashland','Ashland','images/default.jpg',5),(67,'Mitsue','Tollner','7 Eads St','Chicago','Cook','images/default.jpg',1),(78,'Leota','Dilliard','7 W Jackson Blvd','San Jose','Santa Clara','images/default.jpg',4),(89,'Sage','Wieser','5 Boston Ave #88','Sioux Falls','Minnehaha','images/default.jpg',4),(122,'Kiley','Caldarera','25 E 75th St #69','Los Angeles','Los Angeles','images/default.jpg',3),(161,'Abel','Maclead','37275 St Rt 17m M','Middle Island','Suffolk','images/default.jpg',3),(170,'Minna','Amigon','2371 Jerrold Ave','Kulpsville','Montgomery','images/default.jpg',2),(900,'Kris','Marrier','228 Runamuck Pl #2808','Baltimore','Baltimore','images/default.jpg',4);
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `username` varchar(50) NOT NULL,
  `password` varchar(250) NOT NULL,
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('omar','$2b$12$PDlEGDBzn4HBRmFInhfyiOmX4gHMv0QU3JiGH3lexDNGl86Z75mN.'),('sarkis','$2b$12$rDRV9Lc1zryAphV8rPSwkeZChJTI3X2XFt3ayr4Q0Lt.b0mOD8yqK');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'implify_db'
--

--
-- Dumping routines for database 'implify_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-11 10:39:48
