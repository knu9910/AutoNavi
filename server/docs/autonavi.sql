-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema autonavi
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema autonavi
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `autonavi` DEFAULT CHARACTER SET utf8mb3 ;
USE `autonavi` ;

-- -----------------------------------------------------
-- Table `autonavi`.`AdminUser`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `autonavi`.`AdminUser` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(45) NOT NULL,
  `userId` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `position` VARCHAR(45) NOT NULL,
  `controlRights` VARCHAR(10) NOT NULL,
  `role` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `userId_UNIQUE` (`userId` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `autonavi`.`car`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `autonavi`.`car` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '차 아이디',
  `car_number` VARCHAR(45) NOT NULL COMMENT '자동차 번호',
  `battery_type` VARCHAR(45) NOT NULL COMMENT '배터리 종류',
  `car_type` VARCHAR(45) NOT NULL COMMENT '자동차 종류',
  `car_name` VARCHAR(45) NOT NULL COMMENT '자동차 이름',
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일',
  `mfg_date` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `car_number_UNIQUE` (`car_number` ASC) VISIBLE,
  UNIQUE INDEX `car_name_UNIQUE` (`car_name` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `autonavi`.`car_realtime`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `autonavi`.`car_realtime` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '자동차 실시간 데이터 아이디',
  `car_id` INT NOT NULL COMMENT '차량 아이디',
  `location_x` VARCHAR(45) NOT NULL COMMENT '차량의 현재 위도',
  `location_y` VARCHAR(45) NOT NULL COMMENT '차량의 현재 경도',
  `battery` INT NOT NULL COMMENT '차량의 현재 배터리',
  `operation_st` VARCHAR(45) NOT NULL COMMENT '차량의 현재 운행상태',
  `departure` VARCHAR(45) NULL DEFAULT NULL COMMENT '차량의 출발지',
  `destination` VARCHAR(45) NULL DEFAULT NULL COMMENT '차량의 목적지',
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',
  `distance` INT NULL DEFAULT NULL,
  `duration` INT NULL DEFAULT NULL,
  `traffic_speed` INT NULL DEFAULT NULL,
  `traffic_state` INT NULL DEFAULT NULL,
  `traffic_name` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `car_id_UNIQUE` (`car_id` ASC) VISIBLE,
  INDEX `fk_realtime_carId_idx` (`car_id` ASC) VISIBLE,
  CONSTRAINT `fk_realtime_carId`
    FOREIGN KEY (`car_id`)
    REFERENCES `autonavi`.`car` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb3;

USE `autonavi`;

DELIMITER $$
USE `autonavi`$$
CREATE
DEFINER=`autonavi`@`%`
TRIGGER `autonavi`.`after_car_insert`
AFTER INSERT ON `autonavi`.`car`
FOR EACH ROW
BEGIN
  INSERT INTO car_realtime (car_id, location_x, location_y, battery, operation_st)
  VALUES (NEW.id, '37.5632355', '127.0334257', 100, '대기');
END$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;