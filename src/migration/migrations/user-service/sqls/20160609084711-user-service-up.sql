/*
SQLyog Community v12.2.4 (64 bit)
MySQL - 10.1.14-MariaDB-1~jessie : Database - user-service
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`user-service` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `user-service`;

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `Id` varchar(36) NOT NULL,
  `UserName` varchar(50) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`Id`,`UserName`,`Password`,`FirstName`,`LastName`) values 

('509d7e93-f6a9-4e73-88ed-3660ea9e3e1e','user','123456','user','user'),

('a024f051-3b2d-4b6e-a2be-8b858b9ebcff','admin','123456','admin','admin');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
