-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema loveit
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema loveit
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `loveit` DEFAULT CHARACTER SET utf8 ;
USE `loveit` ;

-- -----------------------------------------------------
-- Table `loveit`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loveit`.`User` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(20) NOT NULL,
  `headPic` VARCHAR(100) NULL,
  `signature` VARCHAR(45) NULL,
  `userPwd` CHAR(32) NULL,
  `userEmail` VARCHAR(20) NULL,
  `userPhone` CHAR(11) NULL,
  `sex` BIT NULL,
  `wechat` VARCHAR(20) NULL,
  `realName` VARCHAR(20) NULL,
  `idPic` VARCHAR(100) NULL,
  `idNo` CHAR(18) NULL,
  PRIMARY KEY (`userId`),
  UNIQUE INDEX `userName_UNIQUE` (`userName` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `loveit`.`matchmaking`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loveit`.`matchmaking` (
  `matId` INT NOT NULL AUTO_INCREMENT,
  `relId` INT NULL,
  `title` VARCHAR(100) NULL,
  `sandword` VARCHAR(300) NULL,
  `request` VARCHAR(300) NULL,
  `detail` VARCHAR(300) NULL,
  `address` VARCHAR(150) NULL,
  `medReport` VARCHAR(200) NULL,
  `relTime` DATETIME NULL,
  `birth` DATE NULL,
  `type` CHAR(20) NULL,
  `sex` BIT NULL,
  `petPic` VARCHAR(300) NULL,
  `age` INT NULL,
  PRIMARY KEY (`matId`),
  INDEX `userId_idx` (`relId` ASC) VISIBLE,
  CONSTRAINT `userId`
    FOREIGN KEY (`relId`)
    REFERENCES `loveit`.`User` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `loveit`.`maply`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loveit`.`maply` (
  `maplyId` INT NOT NULL AUTO_INCREMENT,
  `aplyId` INT NULL,
  `matId` INT NULL,
  `maplyTime` DATETIME NULL,
  `detail` VARCHAR(300) NULL,
  `address` VARCHAR(300) NULL,
  `medReport` VARCHAR(300) NULL,
  `birth` DATE NULL,
  `type` VARCHAR(20) NULL,
  `sex` BIT NULL,
  `petPic` VARCHAR(300) NULL,
  `age` INT NULL,
  PRIMARY KEY (`maplyId`),
  INDEX `aplyId_idx` (`aplyId` ASC) VISIBLE,
  INDEX `FK_matId_idx` (`matId` ASC) VISIBLE,
  CONSTRAINT `FK_aplyId`
    FOREIGN KEY (`aplyId`)
    REFERENCES `loveit`.`User` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_matId`
    FOREIGN KEY (`matId`)
    REFERENCES `loveit`.`matchmaking` (`matId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `loveit`.`maplyDel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loveit`.`maplyDel` (
  `madId` INT NOT NULL AUTO_INCREMENT,
  `aplyId` INT NULL,
  `matId` INT NULL,
  `maplyTime` DATETIME NULL,
  `agree` BIT NULL,
  PRIMARY KEY (`madId`),
  INDEX `FK_aplyId_idx` (`aplyId` ASC) VISIBLE,
  INDEX `FK_matId_idx` (`matId` ASC) VISIBLE,
  CONSTRAINT `FK_mapdaplyId`
    FOREIGN KEY (`aplyId`)
    REFERENCES `loveit`.`maply` (`aplyId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_mapdmatId`
    FOREIGN KEY (`matId`)
    REFERENCES `loveit`.`matchmaking` (`matId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `loveit`.`forumArt`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loveit`.`forumArt` (
  `faId` INT NOT NULL AUTO_INCREMENT,
  `faTitle` VARCHAR(100) NULL,
  `userId` INT NULL,
  `time` DATETIME NULL,
  `faText` VARCHAR(1000) NULL,
  PRIMARY KEY (`faId`),
  INDEX `FK_userId_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `FK_userId`
    FOREIGN KEY (`userId`)
    REFERENCES `loveit`.`User` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `loveit`.`forumCom`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loveit`.`forumCom` (
  `fcId` INT NOT NULL AUTO_INCREMENT,
  `faId` INT NULL,
  `faText` VARCHAR(300) NULL,
  `userId` INT NULL,
  `time` DATETIME NULL,
  PRIMARY KEY (`fcId`),
  INDEX `FK_faId_idx` (`faId` ASC) VISIBLE,
  INDEX `FK_userIdf_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `FK_faId1`
    FOREIGN KEY (`faId`)
    REFERENCES `loveit`.`forumArt` (`faId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_userIdf`
    FOREIGN KEY (`userId`)
    REFERENCES `loveit`.`User` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `loveit`.`fReplays`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loveit`.`fReplays` (
  `frId` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NULL,
  `frman` INT NULL,
  `frText` VARCHAR(255) NULL,
  `time` DATETIME NULL,
  `faId` INT NULL,
  PRIMARY KEY (`frId`),
  INDEX `FK_uID_idx` (`userId` ASC) VISIBLE,
  INDEX `FK_faID_idx` (`faId` ASC) VISIBLE,
  INDEX `FK_frman_idx` (`frman` ASC) VISIBLE,
  CONSTRAINT `FK_uID`
    FOREIGN KEY (`userId`)
    REFERENCES `loveit`.`User` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_faID2`
    FOREIGN KEY (`faId`)
    REFERENCES `loveit`.`forumArt` (`faId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_frman`
    FOREIGN KEY (`frman`)
    REFERENCES `loveit`.`forumArt` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `loveit`.`forumLike`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loveit`.`forumLike` (
  `flileId` INT NOT NULL AUTO_INCREMENT,
  `faId` INT NULL,
  `userId` INT NULL,
  `time` DATETIME NULL,
  PRIMARY KEY (`flileId`),
  INDEX `FK_FAID_idx` (`faId` ASC) VISIBLE,
  INDEX `FK_USERID_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `FK_faId3`
    FOREIGN KEY (`faId`)
    REFERENCES `loveit`.`forumArt` (`faId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_userId3`
    FOREIGN KEY (`userId`)
    REFERENCES `loveit`.`User` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `loveit`.`homeless`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loveit`.`homeless` (
  `homId` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NULL,
  `homPic` VARCHAR(300) NULL,
  `homTime` DATETIME NULL,
  `detail` VARCHAR(100) NULL,
  `address` VARCHAR(50) NULL,
  PRIMARY KEY (`homId`),
  INDEX `fk_userId_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `fk_homelessuserId`
    FOREIGN KEY (`userId`)
    REFERENCES `loveit`.`User` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `loveit`.`lostPets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loveit`.`lostPets` (
  `lpId` INT NOT NULL AUTO_INCREMENT,
  `lpTitle` VARCHAR(45) NULL,
  `lpPic` VARCHAR(300) NULL,
  `lpTime` DATETIME NULL,
  `userId` INT NULL,
  `address` VARCHAR(50) NULL,
  `detail` VARCHAR(300) NULL,
  PRIMARY KEY (`lpId`),
  INDEX `fk_USERID_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `fk_lostpuserId`
    FOREIGN KEY (`userId`)
    REFERENCES `loveit`.`User` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `loveit`.`lostMess`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loveit`.`lostMess` (
  `lmId` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NULL,
  `lostMesscol` VARCHAR(300) NULL,
  `lpTime` DATETIME NULL,
  PRIMARY KEY (`lmId`),
  INDEX `fk_useid_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `fk_losmuserId`
    FOREIGN KEY (`userId`)
    REFERENCES `loveit`.`User` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `loveit`.`adoptions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loveit`.`adoptions` (
  `adoId` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NULL,
  `adoAddress` VARCHAR(200) NULL,
  `adoTitle` VARCHAR(100) NULL,
  `detail` VARCHAR(300) NULL,
  `adoType` BIT NULL,
  `adoTime` DATE NULL,
  `limitTime` DATE NULL,
  `birth` DATE NULL,
  `petType` VARCHAR(50) NULL,
  `sex` BIT NULL,
  `adoPic` VARCHAR(300) NULL,
  `age` INT NULL,
  PRIMARY KEY (`adoId`),
  INDEX `fkuserid_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `FK_adouserId`
    FOREIGN KEY (`userId`)
    REFERENCES `loveit`.`User` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `loveit`.`adoDetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loveit`.`adoDetails` (
  `addId` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NULL,
  `addTime` DATETIME NULL,
  `agree` BIT NULL,
  `adoId` INT NULL,
  PRIMARY KEY (`addId`),
  INDEX `fkusid_idx` (`userId` ASC) VISIBLE,
  INDEX `fkadoId_idx` (`adoId` ASC) VISIBLE,
  CONSTRAINT `fk_adodusid`
    FOREIGN KEY (`userId`)
    REFERENCES `loveit`.`User` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_addadoId`
    FOREIGN KEY (`adoId`)
    REFERENCES `loveit`.`adoptions` (`adoId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
