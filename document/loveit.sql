/*
 Navicat Premium Data Transfer

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 80012
 Source Host           : localhost:3306
 Source Schema         : loveit

 Target Server Type    : MySQL
 Target Server Version : 80012
 File Encoding         : 65001

 Date: 19/09/2018 15:38:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for adodetails
-- ----------------------------
DROP TABLE IF EXISTS `adodetails`;
CREATE TABLE `adodetails`  (
  `addId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NULL DEFAULT NULL,
  `addTime` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `agree` char(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `adoId` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`addId`) USING BTREE,
  INDEX `fkusid_idx`(`userId`) USING BTREE,
  INDEX `fkadoId_idx`(`adoId`) USING BTREE,
  CONSTRAINT `fk_addadoId` FOREIGN KEY (`adoId`) REFERENCES `adoptions` (`adoid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_adodusid` FOREIGN KEY (`userId`) REFERENCES `user` (`userid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of adodetails
-- ----------------------------
INSERT INTO `adodetails` VALUES (1, 11, '2018-09-19 15:35:28', '0', 1);
INSERT INTO `adodetails` VALUES (2, 12, '2018-09-19 15:35:28', '0', 1);
INSERT INTO `adodetails` VALUES (3, 8, '2018-09-19 15:35:28', '1', 2);

-- ----------------------------
-- Table structure for adoptions
-- ----------------------------
DROP TABLE IF EXISTS `adoptions`;
CREATE TABLE `adoptions`  (
  `adoId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NULL DEFAULT NULL,
  `adoAddress` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `adoTitle` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `detail` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `adoType` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `adoTime` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `limitTime` date NULL DEFAULT NULL,
  `birth` date NULL DEFAULT NULL,
  `petType` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sex` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `adoPic` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `age` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`adoId`) USING BTREE,
  INDEX `fkuserid_idx`(`userId`) USING BTREE,
  INDEX `adoId`(`adoId`) USING BTREE,
  INDEX `adoId_2`(`adoId`) USING BTREE,
  CONSTRAINT `FK_adouserId` FOREIGN KEY (`userId`) REFERENCES `user` (`userid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of adoptions
-- ----------------------------
INSERT INTO `adoptions` VALUES (1, 1, '江苏苏州', '可爱英短求寄养', '因外出学习没时间照顾宝宝，求寄养', '1', NULL, '2019-01-01', '2018-06-01', '猫', '1', 'cat.jpg', 3);
INSERT INTO `adoptions` VALUES (2, 4, '上海', '2个月哈士奇求收养', '搬家不能照顾它，求领养', '0', NULL, '2018-09-20', '2018-07-01', '狗', '0', 'dog.jpg', 2);

-- ----------------------------
-- Table structure for forumart
-- ----------------------------
DROP TABLE IF EXISTS `forumart`;
CREATE TABLE `forumart`  (
  `faId` int(11) NOT NULL AUTO_INCREMENT,
  `faTitle` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userId` int(11) NULL DEFAULT NULL,
  `time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `faText` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `faType` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`faId`) USING BTREE,
  INDEX `FK_userId_idx`(`userId`) USING BTREE,
  INDEX `faId`(`faId`) USING BTREE,
  INDEX `faId_2`(`faId`) USING BTREE,
  INDEX `faId_3`(`faId`) USING BTREE,
  INDEX `faId_4`(`faId`) USING BTREE,
  INDEX `faId_5`(`faId`) USING BTREE,
  INDEX `faId_6`(`faId`) USING BTREE,
  INDEX `faId_7`(`faId`) USING BTREE,
  INDEX `faId_8`(`faId`) USING BTREE,
  INDEX `faId_9`(`faId`) USING BTREE,
  INDEX `faId_10`(`faId`) USING BTREE,
  INDEX `faId_11`(`faId`) USING BTREE,
  INDEX `faId_12`(`faId`) USING BTREE,
  INDEX `faId_13`(`faId`) USING BTREE,
  INDEX `faId_14`(`faId`) USING BTREE,
  INDEX `faId_15`(`faId`) USING BTREE,
  INDEX `faId_16`(`faId`) USING BTREE,
  INDEX `faId_17`(`faId`) USING BTREE,
  CONSTRAINT `FK_userId` FOREIGN KEY (`userId`) REFERENCES `user` (`userid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of forumart
-- ----------------------------
INSERT INTO `forumart` VALUES (3, '精品推荐', 4, '2018-09-14 15:39:19', '说得好', 'bl');
INSERT INTO `forumart` VALUES (4, '宠物不长毛', 7, '2018-09-15 11:07:35', '宠物没有毛', 'a');
INSERT INTO `forumart` VALUES (5, '宠物不长毛', 7, '2018-09-15 11:07:35', '宠物没有毛', 'b');
INSERT INTO `forumart` VALUES (6, '宠物不长毛', 7, '2018-09-15 11:07:35', '宠物没有毛', 'bl');
INSERT INTO `forumart` VALUES (7, '宠物不长毛', 7, '2018-09-15 11:07:35', '宠物没有毛', 'a');
INSERT INTO `forumart` VALUES (8, '宠物不长毛', 7, '2018-09-15 11:07:35', '宠物没有毛', 'bl');
INSERT INTO `forumart` VALUES (9, '猫毛长出来了了', 11, '2018-09-17 09:46:58', '猫毛长出来了', 'a');
INSERT INTO `forumart` VALUES (11, '这是一个标题', 13, '2018-09-17 13:14:50', '这是一大段内容', 'bl');
INSERT INTO `forumart` VALUES (12, '这是一个标题', 8, '2018-09-17 14:53:48', '这是一大块内容', 'al');

-- ----------------------------
-- Table structure for forumcom
-- ----------------------------
DROP TABLE IF EXISTS `forumcom`;
CREATE TABLE `forumcom`  (
  `fcId` int(11) NOT NULL AUTO_INCREMENT,
  `faId` int(11) NULL DEFAULT NULL,
  `faText` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `userId` int(11) NULL DEFAULT NULL,
  `time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`fcId`) USING BTREE,
  INDEX `FK_faId_idx`(`faId`) USING BTREE,
  INDEX `FK_userIdf_idx`(`userId`) USING BTREE,
  INDEX `fcId`(`fcId`) USING BTREE,
  INDEX `fcId_2`(`fcId`) USING BTREE,
  CONSTRAINT `FK_faId1` FOREIGN KEY (`faId`) REFERENCES `forumart` (`faid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_userIdf` FOREIGN KEY (`userId`) REFERENCES `user` (`userid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of forumcom
-- ----------------------------
INSERT INTO `forumcom` VALUES (19, 4, '测试用', 11, '2018-09-17 20:38:36');
INSERT INTO `forumcom` VALUES (20, 5, '测试用', 12, '2018-09-17 21:03:05');

-- ----------------------------
-- Table structure for forumlike
-- ----------------------------
DROP TABLE IF EXISTS `forumlike`;
CREATE TABLE `forumlike`  (
  `flileId` int(11) NOT NULL AUTO_INCREMENT,
  `faId` int(11) NULL DEFAULT NULL,
  `userId` int(11) NULL DEFAULT NULL,
  `time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`flileId`) USING BTREE,
  INDEX `FK_FAID_idx`(`faId`) USING BTREE,
  INDEX `FK_USERID_idx`(`userId`) USING BTREE,
  CONSTRAINT `FK_faId3` FOREIGN KEY (`faId`) REFERENCES `forumart` (`faid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_userId3` FOREIGN KEY (`userId`) REFERENCES `user` (`userid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of forumlike
-- ----------------------------
INSERT INTO `forumlike` VALUES (3, 3, 2, '2018-09-14 16:30:41');
INSERT INTO `forumlike` VALUES (6, 11, 6, '2018-09-17 13:53:20');
INSERT INTO `forumlike` VALUES (8, 6, 6, '2018-09-17 15:42:25');

-- ----------------------------
-- Table structure for freplays
-- ----------------------------
DROP TABLE IF EXISTS `freplays`;
CREATE TABLE `freplays`  (
  `frId` int(11) NOT NULL AUTO_INCREMENT,
  `fcId` int(11) NULL DEFAULT NULL,
  `frman` int(11) NULL DEFAULT NULL,
  `frText` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`frId`) USING BTREE,
  INDEX `FK_frman_idx`(`frman`) USING BTREE,
  INDEX `FK_FRfcId`(`fcId`) USING BTREE,
  CONSTRAINT `FK_FRfcId` FOREIGN KEY (`fcId`) REFERENCES `forumcom` (`fcid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_frman` FOREIGN KEY (`frman`) REFERENCES `user` (`userid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of freplays
-- ----------------------------
INSERT INTO `freplays` VALUES (19, 19, 11, '回复', '2018-09-17 21:03:31');

-- ----------------------------
-- Table structure for homeless
-- ----------------------------
DROP TABLE IF EXISTS `homeless`;
CREATE TABLE `homeless`  (
  `getmes` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `homeId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NULL DEFAULT NULL,
  `homePic` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `homeTime` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `detail` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `address` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  PRIMARY KEY (`homeId`) USING BTREE,
  INDEX `fk_userId_idx`(`userId`) USING BTREE,
  CONSTRAINT `fk_homelessuserId` FOREIGN KEY (`userId`) REFERENCES `user` (`userid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of homeless
-- ----------------------------
INSERT INTO `homeless` VALUES ('高博A楼拾取', 1, 1, '图片1', '2018-09-13 14:44:16', '拿打火机按时艰苦撒看见', '北京天安门');
INSERT INTO `homeless` VALUES ('高博B楼拾取', 2, 2, '图片2', '2018-09-20 15:27:28', '大数据库大数据客户', '上海外滩');
INSERT INTO `homeless` VALUES ('高博C楼拾取', 4, 3, '图片3', '2018-09-13 14:44:16', '的哈手机号按计划', '苏州高博');
INSERT INTO `homeless` VALUES ('北京上海', 16, 5, '图片4', '2018-09-18 19:41:08', '啥的哈算看 接口', '江苏盐城');
INSERT INTO `homeless` VALUES ('北京上海', 17, 5, '图片4', '2018-09-18 20:37:21', '啥的哈算看 接口', '江苏盐城');
INSERT INTO `homeless` VALUES ('北京上海', 18, 5, '图片4', '2018-09-18 20:37:39', '啥的哈算看 接口', '江苏盐城');
INSERT INTO `homeless` VALUES ('北京上海', 19, 5, '图片4', '2018-09-18 20:37:47', '啥的哈算看 接口', '江苏盐城');
INSERT INTO `homeless` VALUES ('北京上海', 20, 5, '图片4', '2018-09-18 20:39:30', '啥的哈算看 接口', '江苏盐城');

-- ----------------------------
-- Table structure for lostmess
-- ----------------------------
DROP TABLE IF EXISTS `lostmess`;
CREATE TABLE `lostmess`  (
  `lmId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NULL DEFAULT NULL,
  `lmessage` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `lpTime` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`lmId`) USING BTREE,
  INDEX `fk_useid_idx`(`userId`) USING BTREE,
  CONSTRAINT `fk_losmuserId` FOREIGN KEY (`userId`) REFERENCES `user` (`userid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of lostmess
-- ----------------------------
INSERT INTO `lostmess` VALUES (1, 8, '对方的发士大夫的', '2018-09-17 15:06:06');

-- ----------------------------
-- Table structure for lostpets
-- ----------------------------
DROP TABLE IF EXISTS `lostpets`;
CREATE TABLE `lostpets`  (
  `lpId` int(11) NOT NULL AUTO_INCREMENT,
  `lpmes` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `lpTitle` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `lpPic` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `lpTime` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `userId` int(11) NULL DEFAULT NULL,
  `address` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `detail` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `reward` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`lpId`) USING BTREE,
  INDEX `fk_USERID_idx`(`userId`) USING BTREE,
  CONSTRAINT `fk_lostpuserId` FOREIGN KEY (`userId`) REFERENCES `user` (`userid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of lostpets
-- ----------------------------
INSERT INTO `lostpets` VALUES (1, '丢失狗狗一只', NULL, '图片3', '2018-09-17 09:52:21', 1, '海南', '大多数地方都是', '有偿，奖金100000000000000000000000');
INSERT INTO `lostpets` VALUES (2, '丢失喵喵一只', NULL, '图片4', '2018-09-26 11:43:04', 2, '河南', '是比较阿布世界的北京阿三', '奖金2000000');
INSERT INTO `lostpets` VALUES (6, '丢了沈程辉', NULL, '图片8', '2018-09-18 20:24:19', NULL, '苏州', '发的地方的\n', '奖金10000');

-- ----------------------------
-- Table structure for maply
-- ----------------------------
DROP TABLE IF EXISTS `maply`;
CREATE TABLE `maply`  (
  `maplyId` int(11) NOT NULL AUTO_INCREMENT,
  `aplyId` int(11) NULL DEFAULT NULL,
  `matId` int(11) NULL DEFAULT NULL,
  `maplyTime` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `detail` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `address` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `medReport` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `birth` date NULL DEFAULT NULL,
  `type` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sex` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `petPic` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `age` int(11) NULL DEFAULT NULL,
  `maHistory` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `PetName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`maplyId`) USING BTREE,
  INDEX `aplyId_idx`(`aplyId`) USING BTREE,
  INDEX `FK_matId_idx`(`matId`) USING BTREE,
  INDEX `aplyId`(`aplyId`) USING BTREE,
  CONSTRAINT `FK_aplyId` FOREIGN KEY (`aplyId`) REFERENCES `user` (`userid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_matId` FOREIGN KEY (`matId`) REFERENCES `matchmaking` (`matid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of maply
-- ----------------------------
INSERT INTO `maply` VALUES (1, 5, 2, '2018-09-19 14:06:56', '白毛狗', '北京路二号', NULL, '2018-07-10', NULL, '1', NULL, 2, '0', '还好');
INSERT INTO `maply` VALUES (2, 3, 1, '2018-09-19 14:06:48', '温柔可人狗狗', '北京路一号', NULL, '2018-06-27', NULL, '0', NULL, 3, '0', '渣渣');
INSERT INTO `maply` VALUES (3, 7, 4, '2018-09-19 14:07:07', '活泼可爱喵喵', '北京路三号', NULL, '2018-04-10', NULL, '0', NULL, 5, '0', '小天使');
INSERT INTO `maply` VALUES (9, 3, 2, '2018-09-19 14:05:50', '黑白狗', '北京', '1.jpg', '2018-06-13', '猫', '1', NULL, 3, '1', '哈尼');
INSERT INTO `maply` VALUES (10, 1, 1, '2018-09-19 14:05:58', '年轻，橘猫', '北京', '1.jpg', '2018-06-04', '猫', '0', NULL, 3, '1', '哈尼');
INSERT INTO `maply` VALUES (11, 13, 1, '2018-09-19 14:06:07', '温顺可人', '北京', '1.jpg', '2018-06-30', '猫', '0', NULL, 3, '1', '哈尼');
INSERT INTO `maply` VALUES (26, 11, 6, '2018-09-19 14:06:35', '波点，沙皮', '天津', 'dsfffff.jpg', '2018-06-04', '狗', '1', '3.jpg', 3, '0', '堵堵');
INSERT INTO `maply` VALUES (34, 2, 5, '2018-09-18 21:37:24', '温顺', '上海', 'wen.jpg', '2018-06-18', '博美', '0', '温顺.jpg', 3, '0', '小温泉');

-- ----------------------------
-- Table structure for maplydel
-- ----------------------------
DROP TABLE IF EXISTS `maplydel`;
CREATE TABLE `maplydel`  (
  `madId` int(11) NOT NULL AUTO_INCREMENT,
  `aplyId` int(11) NULL DEFAULT NULL,
  `matId` int(11) NULL DEFAULT NULL,
  `maplyTime` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `agree` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`madId`) USING BTREE,
  INDEX `FK_aplyId_idx`(`aplyId`) USING BTREE,
  INDEX `FK_matId_idx`(`matId`) USING BTREE,
  CONSTRAINT `FK_mapdaplyId` FOREIGN KEY (`aplyId`) REFERENCES `maply` (`aplyid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_mapdmatId` FOREIGN KEY (`matId`) REFERENCES `matchmaking` (`matid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of maplydel
-- ----------------------------
INSERT INTO `maplydel` VALUES (5, 3, 1, '2018-09-14 15:34:14', '1');
INSERT INTO `maplydel` VALUES (6, 5, 2, '2018-09-14 15:34:14', '0');
INSERT INTO `maplydel` VALUES (7, 7, 4, '2018-09-14 15:34:14', '0');
INSERT INTO `maplydel` VALUES (11, 2, 5, '2018-09-18 21:37:24', '0');
INSERT INTO `maplydel` VALUES (12, 3, 2, '2018-09-18 18:55:52', '0');
INSERT INTO `maplydel` VALUES (13, 1, 1, '2018-09-18 18:55:54', '0');
INSERT INTO `maplydel` VALUES (14, 13, 1, '2018-09-18 18:56:02', '0');
INSERT INTO `maplydel` VALUES (15, 11, 6, '2018-09-18 18:55:47', '0');

-- ----------------------------
-- Table structure for matchmaking
-- ----------------------------
DROP TABLE IF EXISTS `matchmaking`;
CREATE TABLE `matchmaking`  (
  `matId` int(11) NOT NULL AUTO_INCREMENT,
  `relId` int(11) NULL DEFAULT NULL,
  `title` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sandword` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `request` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `detail` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `address` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `medReport` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `relTime` datetime(0) NULL DEFAULT NULL,
  `birth` date NULL DEFAULT NULL,
  `type` char(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sex` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `petPic` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `age` int(11) NULL DEFAULT NULL,
  `PetName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `maHistory` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pass` char(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`matId`) USING BTREE,
  INDEX `userId_idx`(`relId`) USING BTREE,
  INDEX `matId`(`matId`) USING BTREE,
  CONSTRAINT `userId` FOREIGN KEY (`relId`) REFERENCES `user` (`userid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of matchmaking
-- ----------------------------
INSERT INTO `matchmaking` VALUES (1, 1, '猫猫猫', 'mmm.....', '猫猫猫', '猫猫猫', '猫猫猫', '猫猫猫', NULL, '2018-09-01', '', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `matchmaking` VALUES (2, 2, '一只漂亮猫', '漂亮乖巧喵喵', '男的', '漂亮乖巧喵喵', '天津路一号', 'zabwu', '2018-09-19 09:48:54', NULL, '猫', '0', NULL, 3, '嘟嘟', '0', '1');
INSERT INTO `matchmaking` VALUES (3, 6, '一只乖巧狗', '漂亮乖巧狗狗', '男的', '漂亮乖巧狗狗', '哈尔滨路一号', 'zabwu', '2018-09-19 10:44:20', NULL, '博美', '0', NULL, 5, '小明', '0', '1');
INSERT INTO `matchmaking` VALUES (4, 3, '一只乖巧猫', '漂亮乖巧喵喵', '女的', '漂亮乖巧喵喵', '山东路一号', 'zabwu', '2018-09-14 14:36:46', NULL, '猫', '1', NULL, 2, '翠花', '1', NULL);
INSERT INTO `matchmaking` VALUES (5, 5, '求一只健康的狗狗', '要好相处', '健康,博美', '这是一条详情描述', '青岛', '2.jpg', '2018-09-19 09:48:57', '2016-09-20', '博美', '1', '22.jpg', 3, '小可爱', '0', '1');
INSERT INTO `matchmaking` VALUES (6, 5, '求一只健康的狗狗', '要好相处', '健康,博美', '这是一条详情描述', '青岛', '2.jpg', '2018-09-19 09:48:58', '2016-09-20', '博美', '1', '22.jpg', 3, '小可爱', '0', '1');
INSERT INTO `matchmaking` VALUES (7, 13, '迫切想要给我的小宝贝去个老婆', '喵喵很温柔，粘人，希望找一个霸气高冷的哦', '猫，公的，帅', '橘猫', '苏州', 'miaomiao.jpg', '2018-09-19 09:49:01', '2018-01-01', '橘猫', '0', 'mimi.jpg', 8, '喵喵', '0', '1');

-- ----------------------------
-- Table structure for sysmes
-- ----------------------------
DROP TABLE IF EXISTS `sysmes`;
CREATE TABLE `sysmes`  (
  `Id` int(11) NOT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sysmes
-- ----------------------------
INSERT INTO `sysmes` VALUES (1, '本网站声明绝不姑息婚纱健康啥是框架安科技的', '2018-09-19 15:31:03');
INSERT INTO `sysmes` VALUES (2, '萨达萨达是', '2018-09-19 15:31:03');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `headPic` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `signature` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `userPwd` char(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userEmail` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `userPhone` char(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sex` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `wechat` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `realName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `idPic` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `idNo` char(18) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`userId`) USING BTREE,
  UNIQUE INDEX `userName_UNIQUE`(`userName`) USING BTREE,
  UNIQUE INDEX `userPhone`(`userPhone`) USING BTREE,
  INDEX `userId`(`userId`) USING BTREE,
  INDEX `userId_2`(`userId`) USING BTREE,
  INDEX `userId_3`(`userId`) USING BTREE,
  INDEX `userId_4`(`userId`) USING BTREE,
  INDEX `userId_5`(`userId`) USING BTREE,
  INDEX `userId_6`(`userId`) USING BTREE,
  INDEX `userId_7`(`userId`) USING BTREE,
  INDEX `userId_8`(`userId`) USING BTREE,
  INDEX `userId_9`(`userId`) USING BTREE,
  INDEX `userId_10`(`userId`) USING BTREE,
  INDEX `userId_11`(`userId`) USING BTREE,
  INDEX `userId_12`(`userId`) USING BTREE,
  INDEX `userId_13`(`userId`) USING BTREE,
  INDEX `userId_14`(`userId`) USING BTREE,
  INDEX `userId_15`(`userId`) USING BTREE,
  INDEX `userId_16`(`userId`) USING BTREE,
  INDEX `userId_17`(`userId`) USING BTREE,
  INDEX `userId_18`(`userId`) USING BTREE,
  INDEX `userId_19`(`userId`) USING BTREE,
  INDEX `userId_20`(`userId`) USING BTREE,
  INDEX `userId_21`(`userId`) USING BTREE,
  INDEX `userId_22`(`userId`) USING BTREE,
  INDEX `userId_23`(`userId`) USING BTREE,
  INDEX `userId_24`(`userId`) USING BTREE,
  INDEX `userId_25`(`userId`) USING BTREE,
  INDEX `userId_26`(`userId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '小蘑菇', '', '我有毒', '123455', '1452145214@qq.com', '13145876658', '0', '', NULL, NULL, NULL);
INSERT INTO `user` VALUES (2, '蘑菇', NULL, NULL, '198956', '123443567@qq.com', '18261888882', '1', NULL, '吴小莉', NULL, NULL);
INSERT INTO `user` VALUES (3, '夏天', NULL, NULL, '123456', '1234567@qq.com', '18261888883', '1', NULL, '钱多多', NULL, NULL);
INSERT INTO `user` VALUES (4, '流星雨', NULL, NULL, '123456', '1234567@qq.com', '18261888884', '0', NULL, '李尔尔', NULL, NULL);
INSERT INTO `user` VALUES (5, '天下无双', NULL, NULL, '123456', '1234567@qq.com', '18261888885', '0', NULL, '苏展', NULL, NULL);
INSERT INTO `user` VALUES (6, 'jasonDK', NULL, NULL, '123456', '1234567@qq.com', '18261888886', '0', NULL, '赵天阔', NULL, NULL);
INSERT INTO `user` VALUES (7, '小雨淅淅', NULL, NULL, '123456', '1234567@qq.com', '18261888887', '1', NULL, '周恬恬', NULL, NULL);
INSERT INTO `user` VALUES (8, '天道酬请', NULL, NULL, '123456', '1234567@qq.com', '18261888888', '1', NULL, '邓起', NULL, NULL);
INSERT INTO `user` VALUES (9, '好大一口锅', NULL, NULL, '198956', '123443567@qq.com', '18261888889', '0', NULL, '吴强强', NULL, NULL);
INSERT INTO `user` VALUES (10, '青青草原', NULL, NULL, '123456', '1234567@qq.com', '18261888810', '1', NULL, '唐翠花', NULL, NULL);
INSERT INTO `user` VALUES (11, '啦啦啦啦', NULL, NULL, '123456', '1234567@qq.com', '18261888811', '1', NULL, '王家豪', NULL, NULL);
INSERT INTO `user` VALUES (12, '雪花飘飘', NULL, NULL, '123456', '1234567@qq.com', '18261888812', '0', NULL, '傅家慧', NULL, NULL);
INSERT INTO `user` VALUES (13, 'candy', NULL, NULL, '123456', '1234567@qq.com', '18261888813', '0', NULL, '秦天', NULL, NULL);
INSERT INTO `user` VALUES (14, 'harb', NULL, NULL, '123456', '1234567@qq.com', '18261888814', '0', NULL, '周学好', NULL, NULL);
INSERT INTO `user` VALUES (15, '飞翔的小鸟', '', '我的心一直在翱翔', '123456', NULL, '18261888815', '1', '', '', '', NULL);
INSERT INTO `user` VALUES (16, '飞翔的巨婴', '', '我，会飞', '123456', NULL, '13335488888', '1', '', '', '', NULL);
INSERT INTO `user` VALUES (20, '一个棉花', '', '我，可白了', '123456', NULL, '13335488817', '1', '', '', '', NULL);
INSERT INTO `user` VALUES (21, '小囖囖咯', '', '', '123456', '1986233@qq.com', '13335488818', '0', '', '李丽丽', '', NULL);
INSERT INTO `user` VALUES (22, '噢噢噢', '', '', '123456', NULL, '13137002587', '0', '', '徐旭旭', '', NULL);
INSERT INTO `user` VALUES (23, '鹅鹅鹅', '', '', '123456', NULL, '13137002584', '0', '', '张章章', '', NULL);

-- ----------------------------
-- Procedure structure for getMatchList
-- ----------------------------
DROP PROCEDURE IF EXISTS `getMatchList`;
delimiter ;;
CREATE PROCEDURE `getMatchList`(OUT `p_getMatchList` varchar(300))
BEGIN
	select relId,petPic,type,age,sandword,
	case 
		when matchmaking.sex=0 then '雌' 
		else '雄' 
	end as sex
from matchmaking,user
where user.userId=matchmaking.relId;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for getMatchSearch
-- ----------------------------
DROP PROCEDURE IF EXISTS `getMatchSearch`;
delimiter ;;
CREATE PROCEDURE `getMatchSearch`(OUT `p_getMatchSearch` varchar(300))
BEGIN
	select type,age,
	case
		when matchmaking.sex=0 then '母' 
		else '公'
	end as sex
from matchmaking, user 
where user.userId=matchmaking.relId;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for getMdetail
-- ----------------------------
DROP PROCEDURE IF EXISTS `getMdetail`;
delimiter ;;
CREATE PROCEDURE `getMdetail`(IN `p_relId` int,OUT `p_getMdetail` varchar(300))
BEGIN
	select title,relId,petPic,userName,headPic,userPhone,wechat,type,age,sandword,medReport,birth,detail,
case
	when matchmaking.sex=0 then '母' 
	else '公'
end as sex,
case
	when maHistory=0 then '无配种史' 
	else '有配种史'
end as maHistory
from matchmaking,user where userId=relId and relId=p_relId;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for newsum
-- ----------------------------
DROP PROCEDURE IF EXISTS `newsum`;
delimiter ;;
CREATE PROCEDURE `newsum`(IN `p_comsum` int(20))
BEGIN
select (select count(*)as a from forumArt where faId=p_comsum)+
(select count(*)as b from forumCom where faId=p_comsum)+
(select count(*) FROM freplays where fcId=(select fcId from forumCom where faId=p_comsum))as sum_count;


END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for seequery
-- ----------------------------
DROP PROCEDURE IF EXISTS `seequery`;
delimiter ;;
CREATE PROCEDURE `seequery`(IN `p_query` varchar(20))
BEGIN
select * from forumArt where faTitle like concat('%',p_query,'%') or faText like  concat('%',p_query,'%');

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for sendaply1
-- ----------------------------
DROP PROCEDURE IF EXISTS `sendaply1`;
delimiter ;;
CREATE PROCEDURE `sendaply1`(IN p_userId int,OUT `p_sendaply1` varchar(300))
BEGIN
	select userId,username,headPic,userEmail,userPhone,title,detail,medReport,type,age,PetName,
case
	when matchmaking.sex=0 then '母' 
	else '公'
end as sex,
case
	when maHistory=0 then '无配种史' 
	else '有配种史'
end as maHistory
from user,matchmaking where relId=userId and relId in(
select relId from matchmaking where matId in(
select matId from maply,user where userId=aplyId and userId=p_userId));
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for showaply
-- ----------------------------
DROP PROCEDURE IF EXISTS `showaply`;
delimiter ;;
CREATE PROCEDURE `showaply`(IN p_userId int,OUT `p_showaply` varchar(300))
BEGIN
	select userId,userName,userEmail,userPhone,headPic,maplyTime,maply.detail,maply.PetName,maply.type,maply.petPic,maply.age,
case
	when maply.sex=0 then '母' 
	else '公'
end as sex,
case
	when maply.maHistory=0 then '无配种史' 
	else '有配种史'
end as maHistory
from matchmaking,maply,user where matchmaking.matId=maply.matId and userId in
(select aplyId from maply where matId in( select matId from matchmaking,user where userId=matchmaking.relId and userId=p_userId)) and  userId=maply.aplyId;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for sortHotASC
-- ----------------------------
DROP PROCEDURE IF EXISTS `sortHotASC`;
delimiter ;;
CREATE PROCEDURE `sortHotASC`(OUT `p_sortHotASC` varchar(300))
BEGIN
	select relId,matchmaking.petPic,matchmaking.type,matchmaking.age,sandword,relTime,count(aplyId) num,
case 
		when matchmaking.sex=0 then '母' 
		else '公' 
	end as sex
from matchmaking LEFT JOIN maply on matchmaking.matId=maply.matId
group by matchmaking.matId
ORDER BY num ASC;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for sortHotDESC
-- ----------------------------
DROP PROCEDURE IF EXISTS `sortHotDESC`;
delimiter ;;
CREATE PROCEDURE `sortHotDESC`(OUT `p_sortHotDESC` varchar(300))
BEGIN
	select relId,matchmaking.petPic,matchmaking.type,matchmaking.age,sandword,relTime,count(aplyId) num,
case 
		when matchmaking.sex=0 then '母' 
		else '公' 
	end as sex
from matchmaking LEFT JOIN maply on matchmaking.matId=maply.matId
group by matchmaking.matId
ORDER BY num DESC;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for sortTimeASC
-- ----------------------------
DROP PROCEDURE IF EXISTS `sortTimeASC`;
delimiter ;;
CREATE PROCEDURE `sortTimeASC`(OUT `p_sortTimeASC` varchar(300))
BEGIN
	select relId,petPic,type,age,sandword,relTime,
	case 
		when matchmaking.sex=0 then '母' 
		else '公' 
	end as sex
from matchmaking,user
where user.userId=matchmaking.relId
order by relTime ASC;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for sortTimeDESC
-- ----------------------------
DROP PROCEDURE IF EXISTS `sortTimeDESC`;
delimiter ;;
CREATE PROCEDURE `sortTimeDESC`(OUT `p_sortTimeDESC` varchar(300))
BEGIN
	select relId,petPic,type,age,sandword,relTime,
	case 
		when matchmaking.sex=0 then '母' 
		else '公' 
	end as sex
from matchmaking,user
where user.userId=matchmaking.relId
order by relTime DESC;
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
