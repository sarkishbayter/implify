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
-- Table structure for table `available_ids`
--

DROP TABLE IF EXISTS `available_ids`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `available_ids` (
  `id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `available_ids`
--

LOCK TABLES `available_ids` WRITE;
/*!40000 ALTER TABLE `available_ids` DISABLE KEYS */;
INSERT INTO `available_ids` VALUES (7),(8),(9),(10),(11),(12),(13),(14),(15),(16),(17),(18),(19),(20),(21),(22),(23),(24),(25),(26),(27),(28),(29),(30),(31),(32),(33),(34),(35),(36),(37),(38),(39),(40),(41),(42),(43),(44),(45),(46),(47),(48),(49),(50),(51),(52),(53),(54),(55),(56),(57),(58),(59),(60),(61),(62),(63),(64),(65),(66),(67),(68),(69),(70),(71),(72),(73),(74),(75),(76),(77),(78),(79),(80),(81),(82),(83),(84),(85),(86),(87),(88),(89),(90),(91),(92),(93),(94),(95),(96),(97),(98),(99),(100);
/*!40000 ALTER TABLE `available_ids` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colors` (
  `name` varchar(255) NOT NULL,
  `hex_code` varchar(7) NOT NULL,
  UNIQUE KEY `hex_code` (`hex_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colors`
--

LOCK TABLES `colors` WRITE;
/*!40000 ALTER TABLE `colors` DISABLE KEYS */;
INSERT INTO `colors` VALUES ('Black','#000000'),('Navy','#000080'),('Dark Green','#006400'),('Teal','#008080'),('Dark Cyan','#008B8B'),('Deep Sky Blue','#00BFFF'),('Medium Spring Green','#00FA9A'),('Lime','#00FF00'),('Spring Green','#00FF7F'),('Dodger Blue','#1E90FF'),('Forest Green','#228B22'),('Dark Slate Gray','#2F4F4F'),('Lime Green','#32CD32'),('Turquoise','#40E0D0'),('Royal Blue','#4169E1'),('Steel Blue','#4682B4'),('Medium Turquoise','#48D1CC'),('Indigo','#4B0082'),('Dark Olive Green','#556B2F'),('Cadet Blue','#5F9EA0'),('Umber','#635147'),('Cornflower Blue','#6495ED'),('Dim Gray','#696969'),('Olive Drab','#6B8E23'),('Slate Gray','#708090'),('Lawn Green','#7CFC00'),('Aquamarine','#7FFFD4'),('Maroon','#800000'),('Purple','#800080'),('Sky Blue','#87CEEB'),('Light Sky Blue','#87CEFA'),('Dark Magenta','#8B008B'),('Saddle Brown','#8B4513'),('Dark Sea Green','#8FBC8F'),('Light Green','#90EE90'),('Medium Purple','#9370DB'),('Pale Green','#98FB98'),('Dark Orchid','#9932CC'),('Sienna','#A0522D'),('Dark Gray','#A9A9A9'),('Light Blue','#ADD8E6'),('Pale Turquoise','#AFEEEE'),('Light Steel Blue','#B0C4DE'),('Powder Blue','#B0E0E6'),('Medium Orchid','#BA55D3'),('Rosy Brown','#BC8F8F'),('Silver','#C0C0C0'),('Medium Violet Red','#C71585'),('Peru','#CD853F'),('Chocolate','#D2691E'),('Tan','#D2B48C'),('Light Grey','#D3D3D3'),('Thistle','#D8BFD8'),('Orchid','#DA70D6'),('Goldenrod','#DAA520'),('Pale Violet Red','#DB7093'),('Crimson','#DC143C'),('Gainsboro','#DCDCDC'),('Plum','#DDA0DD'),('Burly Wood','#DEB887'),('Mauve','#E0B0FF'),('Light Cyan','#E0FFFF'),('Lavender','#E6E6FA'),('Violet','#EE82EE'),('Light Coral','#F08080'),('Alice Blue','#F0F8FF'),('Honeydew','#F0FFF0'),('Azure','#F0FFFF'),('Sandy Brown','#F4A460'),('Wheat','#F5DEB3'),('Beige','#F5F5DC'),('White Smoke','#F5F5F5'),('Mint Cream','#F5FFFA'),('Ghost White','#F8F8FF'),('Salmon','#FA8072'),('Antique White','#FAEBD7'),('Old Lace','#FDF5E6'),('Magenta','#FF00FF'),('Hot Pink','#FF69B4'),('Coral','#FF7F50'),('Navajo White','#FFDEAD'),('Bisque','#FFE4C4'),('Misty Rose','#FFE4E1'),('Blanched Almond','#FFEBCD'),('Papaya Whip','#FFEFD5'),('Lavender Blush','#FFF0F5'),('Seashell','#FFF5EE'),('Lemon Chiffon','#FFFACD'),('Floral White','#FFFAF0'),('Snow','#FFFAFA'),('Light Yellow','#FFFFE0'),('Ivory','#FFFFF0'),('White','#FFFFFF');
/*!40000 ALTER TABLE `colors` ENABLE KEYS */;
UNLOCK TABLES;

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
  `address` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `photo` varchar(50) DEFAULT NULL,
  `companyId` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `companyId` (`companyId`),
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`companyId`) REFERENCES `company` (`companyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (13,'Bette','Ruta','98 Connecticut Ave Nw','Chagrin Falls','Geauga','images/bette.jpg',1),(14,'Veronika','Albares','56 E Morehead St','Laredo','Webb','images/default.jpg',1),(15,'Rufus','Oconnor','123 Elm St','Seattle','King','images/default.jpg',2),(16,'Mariana','Lindsey','456 Oak Rd','Austin','Travis','images/default.jpg',3),(17,'Dwayne','Schneider','789 Pine Ave','Denver','Denver','images/default.jpg',4),(18,'Nadia','Kessler','321 Cedar Ln','Miami','Miami-Dade','images/default.jpg',5),(22,'Josephine','Darakjy','4 B Blue Ridge Blvd','Brighton','Livingston','images/default.jpg',1),(23,'Art','Venere','8 W Cerritos Ave #54','Bridgeport','Gloucester','images/default.jpg',4),(34,'Lenna','Paprocki','639 Main St','Anchorage','Anchorage','images/default.jpg',3),(45,'Donette','Foller','34 Center St','Hamilton','Butler','images/default.jpg',4),(56,'Simona','Morasca','3 Mcauley Dr','Ashland','Ashland','images/default.jpg',5),(67,'Mitsue','Tollner','7 Eads St','Chicago','Cook','images/default.jpg',1),(78,'Leota','Dilliard','7 W Jackson Blvd','San Jose','Santa Clara','images/default.jpg',4),(89,'Sage','Wieser','5 Boston Ave #88','Sioux Falls','Minnehaha','images/sage.jpg',4),(122,'Kiley','Caldarera','25 E 75th St #69','Los Angeles','Los Angeles','images/default.jpg',3),(161,'Abel','Maclead','37275 St Rt 17m M','Middle Island','Suffolk','images/default.jpg',3),(170,'Minna','Amigon','2371 Jerrold Ave','Kulpsville','Montgomery','images/default.jpg',2),(900,'Kris','Marrier','228 Runamuck Pl #2808','Baltimore','Baltimore','images/default.jpg',4);
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

-- Dump completed on 2025-04-16 18:11:40
