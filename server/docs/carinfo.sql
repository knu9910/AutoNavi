-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema autonavi
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `autonavi` ;

-- -----------------------------------------------------
-- Schema autonavi
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `autonavi` DEFAULT CHARACTER SET utf8 ;
USE `autonavi` ;

-- -----------------------------------------------------
-- Table `autonavi`.`car`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `autonavi`.`car` ;

CREATE TABLE IF NOT EXISTS `autonavi`.`car` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '차 아이디',
  `car_number` VARCHAR(45) NOT NULL COMMENT '자동차 번호',
  `battery_type` VARCHAR(45) NOT NULL COMMENT '배터리 종류',
  `car_type` VARCHAR(45) NOT NULL COMMENT '자동차 종류',
  `car_name` VARCHAR(45) NOT NULL COMMENT '자동차 이름',
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `car_number_UNIQUE` ON `autonavi`.`car` (`car_number` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `autonavi`.`car_realtime`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `autonavi`.`car_realtime` ;

CREATE TABLE IF NOT EXISTS `autonavi`.`car_realtime` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '자동차 실시간 데이터 아이디',
  `car_id` INT NOT NULL COMMENT '차량 아이디',
  `location_x` VARCHAR(45) NOT NULL COMMENT '차량의 현재 위도',
  `location_y` VARCHAR(45) NOT NULL COMMENT '차량의 현재 경도',
  `battery` INT NOT NULL COMMENT '차량의 현재 배터리',
  `operation_st` VARCHAR(45) NOT NULL COMMENT '차량의 현재 운행상태',
  `departure` VARCHAR(45) NULL COMMENT '차량의 출발지',
  `destination` VARCHAR(45) NULL COMMENT '차량의 목적지',
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',
  `distance` INT NULL,
  `duration` INT NULL,
  `traffic_speed` INT NULL,
  `traffic_state` INT NULL,
  `traffic_name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_realtime_carId`
    FOREIGN KEY (`car_id`)
    REFERENCES `autonavi`.`car` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_realtime_carId_idx` ON `autonavi`.`car_realtime` (`car_id` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;