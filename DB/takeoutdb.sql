-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema takeoutdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `takeoutdb` ;

-- -----------------------------------------------------
-- Schema takeoutdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `takeoutdb` DEFAULT CHARACTER SET utf8 ;
USE `takeoutdb` ;

-- -----------------------------------------------------
-- Table `takeout`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `takeout` ;

CREATE TABLE IF NOT EXISTS `takeout` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(200) NULL,
  `price` DOUBLE NULL,
  `purchase_date` DATETIME NULL,
  `rating` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS takeoutuser;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'takeoutuser' IDENTIFIED BY 'takeoutuser';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'takeoutuser';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `takeout`
-- -----------------------------------------------------
START TRANSACTION;
USE `takeoutdb`;
INSERT INTO `takeout` (`id`, `name`, `description`, `price`, `purchase_date`, `rating`) VALUES (1, 'Japanese', 'Dragon Roll, Salmon Nigiri', 22.87, '2022-05-04', 5);
INSERT INTO `takeout` (`id`, `name`, `description`, `price`, `purchase_date`, `rating`) VALUES (2, 'Mexican', 'El Pastor Tacos, Birria Tacos', 14.22, '2022-04-25', 4);
INSERT INTO `takeout` (`id`, `name`, `description`, `price`, `purchase_date`, `rating`) VALUES (3, 'American', 'Double Bacon Cheesburger, Fries, Oreo Shake', 19.78, '2022-03-09', 4);
INSERT INTO `takeout` (`id`, `name`, `description`, `price`, `purchase_date`, `rating`) VALUES (4, 'Middle Eastern', 'Mixed Grill, Syrian Pie, Kibbeh', 34.99, '2022-05-28', 5);
INSERT INTO `takeout` (`id`, `name`, `description`, `price`, `purchase_date`, `rating`) VALUES (5, 'American', 'Eggs Benedict Special, Coffee', 12.88, '2022-05-21', 3);

COMMIT;

