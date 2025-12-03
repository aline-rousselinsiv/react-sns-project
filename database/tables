-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: mysqldb
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `feed`
--

DROP TABLE IF EXISTS `feed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feed` (
  `feedNo` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `contents` text NOT NULL,
  `userId` varchar(50) NOT NULL,
  `cnt` int DEFAULT '0',
  `cdatetime` datetime DEFAULT CURRENT_TIMESTAMP,
  `udatetime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`feedNo`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feed`
--

LOCK TABLES `feed` WRITE;
/*!40000 ALTER TABLE `feed` DISABLE KEYS */;
INSERT INTO `feed` VALUES (2,'새로운 카페 발견! EDITED !','집 근처에 새로 생긴 카페를 다녀왔어요. 분위기도 좋고 커피도 맛있더라구요!','user002',20,'2025-04-02 10:20:00','2025-11-20 10:59:23'),(3,'이번 주 목표 설정','이번 주에는 운동 최소 3번, 책 한 권 읽기! 작은 목표지만 지켜보려고요.','user003',5,'2025-04-03 09:00:00','2025-04-03 09:00:00'),(4,'비 오는 날의 감성','오늘은 하루 종일 비가 와서 그런지 기분이 차분해지네요. 따뜻한 차 한 잔이 생각나요.','user004',18,'2025-04-04 14:45:00','2025-04-04 14:45:00'),(5,'새 프로젝트 시작!','오늘 드디어 새로운 프로젝트를 시작했습니다. 설레기도 하고 조금 긴장도 되네요.','user001',9,'2025-04-05 11:15:00','2025-04-05 11:15:00'),(6,'주말 힐링 여행','짧은 여행을 다녀왔는데 너무 좋았어요. 자연 속에서 마음이 편해지는 느낌이었습니다.','user002',27,'2025-04-06 16:30:00','2025-04-06 16:30:00'),(7,'오늘의 독서 시간','책을 읽다 보니 시간이 훌쩍 지나가더라구요. 마음에 남는 문장이 많았어요.','user003',14,'2025-04-07 13:10:00','2025-04-07 13:10:00'),(8,'옛날 사진 정리','오랜만에 사진을 정리했는데 추억이 새록새록 떠오르네요. 시간 참 빠른 것 같아요.','user004',22,'2025-04-08 15:55:00','2025-04-08 15:55:00'),(9,'기술의 발전','요즘 기술이 너무 빠르게 발전하는 것 같아요. 따라가려면 꾸준히 공부해야겠어요.','user001',11,'2025-04-09 09:25:00','2025-04-09 09:25:00'),(10,'새로운 취미 도전','요즘 사진 찍는 것에 빠졌어요. 풍경 사진 찍는 게 정말 재밌네요!','user002',19,'2025-04-10 10:40:00','2025-04-10 10:40:00'),(11,'작은 행복 찾기','따뜻한 커피 한 잔, 좋아하는 음악 한 곡이 주는 작은 행복을 느끼고 있어요.','user003',8,'2025-04-11 11:30:00','2025-04-11 11:30:00'),(12,'친구와의 저녁','오랜만에 친구랑 만나서 저녁 먹었어요. 이런 시간이 정말 소중한 것 같아요.','user004',16,'2025-04-12 18:20:00','2025-04-12 18:20:00'),(13,'행복에 대해','행복이란 결국 일상 속에서 발견하는 작고 소중한 순간들 아닐까요?','user001',13,'2025-04-13 14:00:00','2025-04-13 14:00:00'),(14,'오늘의 음악 추천','요즘 듣는 음악이 너무 좋아서 공유하고 싶어요. 분위기 전환에 딱입니다!','user002',17,'2025-04-14 09:50:00','2025-04-14 09:50:00'),(15,'성장의 과정','요즘 스스로 배우고 성장하는 게 즐겁네요. 꾸준함의 힘을 느끼고 있어요.','user003',10,'2025-04-15 10:05:00','2025-04-15 10:05:00'),(16,'test1','test1','user001',0,'2025-11-20 10:30:13','2025-11-20 10:30:13');
/*!40000 ALTER TABLE `feed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `stu_no` char(8) NOT NULL,
  `stu_name` varchar(12) DEFAULT NULL,
  `stu_dept` varchar(20) DEFAULT NULL,
  `stu_grade` int DEFAULT NULL,
  `stu_class` char(1) DEFAULT NULL,
  `stu_gender` char(1) DEFAULT NULL,
  `stu_height` int DEFAULT NULL,
  `stu_weight` int DEFAULT NULL,
  PRIMARY KEY (`stu_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES ('','','',NULL,NULL,NULL,NULL,NULL),('12341234','test','test',NULL,NULL,NULL,NULL,NULL),('20142021','심수정','전기전자',2,'A','F',180,45),('20143054','유가인','기계',2,'C','F',154,47),('20151062','김인중','컴퓨터정보',1,'B','M',166,67),('20152088','조민우','전기전자',1,'C','M',188,90),('20153075','옥한빛','기계',1,'C','M',177,80),('20153088','이태연','컴퓨터정보',1,'C','F',162,50);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_board`
--

DROP TABLE IF EXISTS `tbl_board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_board` (
  `boardNo` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `contents` text NOT NULL,
  `userId` varchar(50) NOT NULL,
  `cnt` int DEFAULT '0',
  `cdatetime` datetime DEFAULT CURRENT_TIMESTAMP,
  `udatetime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`boardNo`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_board`
--

LOCK TABLES `tbl_board` WRITE;
/*!40000 ALTER TABLE `tbl_board` DISABLE KEYS */;
INSERT INTO `tbl_board` VALUES (2,'I ALSO CHANGED THE TITLE!','HAHAHA, WAS THE DATE UPDATED? ㅎㅎ','user002',29,'2025-04-02 09:30:00','2025-11-20 09:26:43'),(3,'우리는 왜 이렇게 바쁠까요?','요즘 바쁜 일상 속에서 여유를 찾는 게 점점 더 어려워지는 것 같아요. 여러분은 어떻게 여유를 찾고 계신가요?','user003',8,'2025-04-03 11:15:00','2025-11-20 09:27:33'),(4,'하루를 마무리하며','오늘 하루가 어떻게 지나갔는지 한번 되돌아보며, 내일은 더 좋은 하루가 되기를 바래봅니다.','user004',20,'2025-04-04 13:45:00','2025-11-20 09:22:34'),(5,'새로운 시작, 새로운 도전','새로운 프로젝트를 시작했습니다! 이렇게 시작하는 게 설렙니다. 실패를 두려워하지 말자고 마음먹고 도전해보려 합니다.','user001',9,'2025-04-05 14:00:00','2025-11-20 09:27:20'),(6,'주말에는 무엇을 할까요?','주말에는 모두 무엇을 할 예정인가요? 저는 집에서 휴식을 취하며 영화를 보고 싶어요. 다들 어떻게 보내세요?','user002',12,'2025-04-06 10:10:00','2025-04-06 10:10:00'),(7,'오늘의 책 한 권','오늘 읽은 책이 정말 인상 깊었어요. 특히 그 부분이 마음에 와 닿았습니다. 여러분도 한 번 읽어보세요!','user003',20,'2025-04-07 11:45:00','2025-04-07 11:45:00'),(8,'추억 속 여행','몇 년 전에 갔던 여행지가 떠오릅니다. 그때의 즐거운 순간들이 아직도 선명하게 기억에 남아요.','user004',30,'2025-04-08 15:20:00','2025-04-08 15:20:00'),(9,'디지털 시대의 장단점','디지털 기술이 발달하면서 우리의 삶이 많이 변화했어요. 그러나 그만큼 불편함도 따르죠. 이 변화가 과연 좋은 것일까요?','user001',18,'2025-04-09 09:30:00','2025-04-09 09:30:00'),(10,'새로운 취미를 시작하다','최근에 새로운 취미를 시작했어요. 정말 재밌고 시간이 빠르게 지나가네요. 여러분도 새로 시작한 취미가 있나요?','user002',22,'2025-04-10 10:00:00','2025-04-10 10:00:00'),(11,'인생의 작은 변화','작은 변화가 인생을 크게 바꿀 수 있다는 말을 요즘 실감하고 있어요. 여러분도 그런 순간을 경험해보셨나요?','user003',14,'2025-04-11 16:00:00','2025-04-11 16:00:00'),(12,'어린 시절의 추억','어린 시절의 추억이 떠오릅니다. 그때는 아무 걱정 없이 뛰어놀았던 기억들이 아직도 생생하네요.','user004',7,'2025-04-12 12:10:00','2025-04-12 12:10:00'),(13,'행복이란 무엇일까?','행복의 의미를 잘 모르겠어요. 사람마다 다르게 정의할 수 있겠지만, 저는 그냥 작은 것에서 행복을 느끼고 싶어요.','user001',16,'2025-04-13 14:30:00','2025-04-13 14:30:00'),(14,'음악의 힘','요즘 음악이 정말 큰 힘이 돼요. 힘든 하루를 보내고 있을 때, 좋은 음악 한 곡이 모든 걸 바꿀 수 있다는 걸 느껴요.','user002',19,'2025-04-14 08:45:00','2025-04-14 08:45:00'),(15,'자기 계발의 중요성','자기 계발은 왜 중요한지, 그 이유에 대해 고민해보게 됩니다. 꾸준히 노력하며 성장해가는 것이 중요하다고 생각해요.','user003',11,'2025-04-15 10:00:00','2025-04-15 10:00:00'),(16,'test2','test2','user001',0,'2025-11-20 09:20:19','2025-11-20 09:20:19');
/*!40000 ALTER TABLE `tbl_board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_category`
--

DROP TABLE IF EXISTS `tbl_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_category` (
  `CATEGORY_ID` int NOT NULL AUTO_INCREMENT,
  `CATEGORY_NAME` varchar(50) NOT NULL,
  `CREATED_AT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`CATEGORY_ID`),
  UNIQUE KEY `CATEGORY_NAME` (`CATEGORY_NAME`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_category`
--

LOCK TABLES `tbl_category` WRITE;
/*!40000 ALTER TABLE `tbl_category` DISABLE KEYS */;
INSERT INTO `tbl_category` VALUES (1,'delicious','2025-12-01 06:43:16'),(2,'romantic','2025-12-01 06:45:53'),(3,'breakfast','2025-12-01 06:47:44'),(4,'tag1','2025-12-01 06:54:58'),(5,'tag2','2025-12-01 06:54:58'),(6,'tag3','2025-12-01 06:54:58'),(7,'tag4','2025-12-01 07:03:21'),(8,'tag5','2025-12-01 07:03:21'),(9,'tag6','2025-12-01 07:03:21'),(10,'tag7','2025-12-01 07:14:44'),(11,'tag9','2025-12-01 07:14:44'),(12,'tag10','2025-12-01 07:14:44'),(13,'tag11','2025-12-01 07:16:23'),(14,'tag12','2025-12-01 07:16:23'),(15,'tag13','2025-12-01 07:16:23'),(16,'cozy','2025-12-01 07:27:23'),(17,'cute','2025-12-01 07:27:23'),(18,'warm','2025-12-01 07:27:23'),(19,'love','2025-12-01 07:44:13'),(20,'expensive','2025-12-01 08:18:21'),(21,'money','2025-12-01 08:18:21'),(22,'luxury','2025-12-01 08:18:21'),(23,'japan','2025-12-01 08:32:16'),(24,'quality','2025-12-01 08:32:16'),(25,'freshness','2025-12-01 08:32:16'),(26,'salmon','2025-12-01 08:37:19'),(27,'asian','2025-12-02 02:45:13'),(28,'korean','2025-12-02 02:45:13'),(29,'authentic','2025-12-02 02:45:13'),(30,'khmer','2025-12-02 02:47:57'),(31,'realshit','2025-12-02 02:47:57'),(32,'sweettooth','2025-12-02 02:52:15'),(33,'pancakes','2025-12-02 02:52:15'),(34,'cheesy','2025-12-02 02:54:17'),(35,'fat','2025-12-02 02:54:17'),(36,'icecream','2025-12-02 02:55:22'),(37,'diabetes','2025-12-02 02:55:22'),(38,'japanese','2025-12-02 03:03:37'),(39,'tuna','2025-12-02 03:03:37'),(40,'friedchicken','2025-12-02 03:12:07'),(41,'beer','2025-12-02 03:12:07'),(42,'fine dining','2025-12-02 08:46:35'),(43,'champagne','2025-12-02 08:46:35');
/*!40000 ALTER TABLE `tbl_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_comments`
--

DROP TABLE IF EXISTS `tbl_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_comments` (
  `COMMENT_ID` int NOT NULL AUTO_INCREMENT,
  `POST_ID` int NOT NULL,
  `USER_ID` varchar(50) NOT NULL,
  `CONTENT` varchar(100) NOT NULL,
  `CREATED_AT` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `MODIFIED_AT` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `LIKE_CNT` int DEFAULT '0',
  PRIMARY KEY (`COMMENT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_comments`
--

LOCK TABLES `tbl_comments` WRITE;
/*!40000 ALTER TABLE `tbl_comments` DISABLE KEYS */;
INSERT INTO `tbl_comments` VALUES (18,31,'gourmetboy','comment 1 !','2025-11-27 18:41:03','2025-11-27 18:41:03',0),(21,32,'gourmetboy','Those burgers look delicious !','2025-11-28 16:06:47','2025-11-28 16:06:47',0),(22,32,'gourmetboy','Posting another one !','2025-11-28 16:21:21','2025-11-28 16:21:21',0),(36,71,'aline01','Super fancy ! If The Batman goes, I should probably try that place too !','2025-12-02 17:49:39','2025-12-02 17:49:39',0),(37,71,'batman01','You\'ve gotta to try girl','2025-12-02 17:50:09','2025-12-02 17:50:09',0),(38,67,'batman01','Me want to try','2025-12-02 17:51:24','2025-12-02 17:51:24',0),(39,66,'batman01','Lobe Japanese food !','2025-12-02 17:51:37','2025-12-02 17:51:37',0);
/*!40000 ALTER TABLE `tbl_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_feed`
--

DROP TABLE IF EXISTS `tbl_feed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_feed` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(100) DEFAULT NULL,
  `content` text,
  `cdatetime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `TITLE` varchar(100) NOT NULL,
  `ADDRESS` varchar(255) NOT NULL,
  `RATING` int NOT NULL DEFAULT '0',
  `LIKES` int DEFAULT '0',
  `RESTAURANT` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_feed`
--

LOCK TABLES `tbl_feed` WRITE;
/*!40000 ALTER TABLE `tbl_feed` DISABLE KEYS */;
INSERT INTO `tbl_feed` VALUES (27,'gourmetgirl','A place for sweet tooth lovers ! It\'s fancy but it\'s soooo worth it !','2025-11-27 00:37:42','A place for desserts','I don\'t know where',4,0,'The dessert Factory'),(30,'gourmetgirl','Omg... words can\'t describe... price, quality, everything was perfect. Just go already.','2025-11-27 02:02:00','Have you been to that place yet?','Where?',2,0,'Pizza not Hut'),(32,'gourmetgirl','On the fancy side but TOTALLY worth it.','2025-11-28 04:31:12','McDonal\'s can quit, guys','Where is it ? I forgot',3,0,'All Burgers'),(37,'gourmetboy','Cheap, cheesy, rich..that\'s all I ask for.','2025-12-01 00:24:11','Do you like GOOD pizzas','The pizza kingdom',2,0,'Pizza not Hut'),(63,'aline01','It was absolutely delicious. If you miss real Korean flavors, hurry and go there!','2025-12-02 02:45:13','Authentic Korean tastes !','Paris, somewhere',3,0,'Le Petit Seoul'),(64,'sophie01','Come to my house if you want to taste real khmer food !','2025-12-02 02:47:57','The best Khmer food you\'ll have','My house!',3,0,'Siv Restaurant'),(65,'sophirnie01','You cannot skip that brunch restaurant, they have so many different menus!','2025-12-02 02:52:15','I am a brunch type of gal...','Seoul, where exactly?',4,0,'Brunchie'),(66,'hope01','Yes, it is a budget but... Save up weeks, months if you need to and treat yourself to amazing fresh tuna and sake. Please.','2025-12-02 03:03:37','Probably one of the best Japanese','Seoul, hmm...',5,0,'Itadakimasu'),(67,'mijin01','Probably one of my favorite korean chicken to have !','2025-12-02 03:12:07','Let me tell u about 치맥','Seoul, where again?',3,0,'Chick&Beer'),(71,'batman01','They have a special 6 course menu every Tuesday and it is divine.','2025-12-02 08:46:35','Fine dining amateurs only','Paris, somewhere...',5,0,'Au Petit Paris');
/*!40000 ALTER TABLE `tbl_feed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_feed_img`
--

DROP TABLE IF EXISTS `tbl_feed_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_feed_img` (
  `imgNo` int NOT NULL AUTO_INCREMENT,
  `feedId` int NOT NULL,
  `imgName` varchar(255) NOT NULL,
  `imgPath` varchar(500) NOT NULL,
  PRIMARY KEY (`imgNo`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_feed_img`
--

LOCK TABLES `tbl_feed_img` WRITE;
/*!40000 ALTER TABLE `tbl_feed_img` DISABLE KEYS */;
INSERT INTO `tbl_feed_img` VALUES (1,3,'test','https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'),(2,4,'test2','https://images.unsplash.com/photo-1521747116042-5a810fda9664'),(3,15,'1763967141236-shoe-img.png','uploads/'),(4,16,'1763970485231-shoes-img-test.jfif','uploads/1763970485231-shoes-img-test.jfif'),(5,17,'1763970589643-ëë©´.jpeg','http://localhost:3010/uploads/1763970589643-ëë©´.jpeg'),(6,25,'1764149156496-food1.jpeg','http://localhost:3010/uploads/1764149156496-food1.jpeg'),(7,26,'1764149495751-profileManImg.jpg','http://localhost:3010/uploads/1764149495751-profileManImg.jpg'),(8,26,'1764149495751-food1.jpeg','http://localhost:3010/uploads/1764149495751-food1.jpeg'),(9,27,'1764203863392-dessert1.jpg','http://localhost:3010/uploads/1764203863392-dessert1.jpg'),(10,27,'1764203863393-dessert2.jpg','http://localhost:3010/uploads/1764203863393-dessert2.jpg'),(11,27,'1764203863395-dessert3.webp','http://localhost:3010/uploads/1764203863395-dessert3.webp'),(12,28,'1764206597795-dessert1.jpg','http://localhost:3010/uploads/1764206597795-dessert1.jpg'),(13,28,'1764206597797-dessert2.jpg','http://localhost:3010/uploads/1764206597797-dessert2.jpg'),(14,28,'1764206597800-dessert3.webp','http://localhost:3010/uploads/1764206597800-dessert3.webp'),(15,29,'1764207356186-dessert1.jpg','http://localhost:3010/uploads/1764207356186-dessert1.jpg'),(16,29,'1764207356188-dessert2.jpg','http://localhost:3010/uploads/1764207356188-dessert2.jpg'),(17,29,'1764207356189-dessert3.webp','http://localhost:3010/uploads/1764207356189-dessert3.webp'),(18,30,'1764208921663-pizz1.jpg','http://localhost:3010/uploads/1764208921663-pizz1.jpg'),(19,30,'1764208921667-pizza2.webp','http://localhost:3010/uploads/1764208921667-pizza2.webp'),(20,30,'1764208921669-pizza3.jpg','http://localhost:3010/uploads/1764208921669-pizza3.jpg'),(21,31,'1764233102105-dessert1.jpg','http://localhost:3010/uploads/1764233102105-dessert1.jpg'),(22,31,'1764233102118-dessert2.jpg','http://localhost:3010/uploads/1764233102118-dessert2.jpg'),(23,31,'1764233102120-dessert3.webp','http://localhost:3010/uploads/1764233102120-dessert3.webp'),(24,31,'1764233102122-pizz1.jpg','http://localhost:3010/uploads/1764233102122-pizz1.jpg'),(25,31,'1764233102123-pizza2.webp','http://localhost:3010/uploads/1764233102123-pizza2.webp'),(29,33,'1764382260642-burger3.jfif','http://localhost:3010/uploads/1764382260642-burger3.jfif'),(30,33,'1764382260651-dessert1.jpg','http://localhost:3010/uploads/1764382260651-dessert1.jpg'),(31,33,'1764382260654-dessert2.jpg','http://localhost:3010/uploads/1764382260654-dessert2.jpg'),(32,34,'1764382300914-burger3.jfif','http://localhost:3010/uploads/1764382300914-burger3.jfif'),(33,34,'1764382300921-dessert1.jpg','http://localhost:3010/uploads/1764382300921-dessert1.jpg'),(34,34,'1764382300923-dessert2.jpg','http://localhost:3010/uploads/1764382300923-dessert2.jpg'),(35,35,'1764384975676-dessert2.jpg','http://localhost:3010/uploads/1764384975676-dessert2.jpg'),(36,35,'1764384975678-dessert3.webp','http://localhost:3010/uploads/1764384975678-dessert3.webp'),(37,35,'1764384975682-pizz1.jpg','http://localhost:3010/uploads/1764384975682-pizz1.jpg'),(38,35,'1764384975685-pizza2.webp','http://localhost:3010/uploads/1764384975685-pizza2.webp'),(51,32,'1764395193794-burger1.jpg','http://localhost:3010/uploads/1764395193794-burger1.jpg'),(52,32,'1764395193796-burger2.jfif','http://localhost:3010/uploads/1764395193796-burger2.jfif'),(55,36,'1764404637413-burger1.jpg','http://localhost:3010/uploads/1764404637413-burger1.jpg'),(56,36,'1764404637419-dessert1.jpg','http://localhost:3010/uploads/1764404637419-dessert1.jpg'),(57,36,'1764404637421-pizza3.jpg','http://localhost:3010/uploads/1764404637421-pizza3.jpg'),(58,37,'1764548652113-pizz1.jpg','http://localhost:3010/uploads/1764548652113-pizz1.jpg'),(59,37,'1764548652117-pizza2.webp','http://localhost:3010/uploads/1764548652117-pizza2.webp'),(61,37,'1764549226968-pizz1.jpg','http://localhost:3010/uploads/1764549226968-pizz1.jpg'),(63,38,'1764549295174-dessert1.jpg','http://localhost:3010/uploads/1764549295174-dessert1.jpg'),(64,39,'1764550064814-pizza3.jpg','http://localhost:3010/uploads/1764550064814-pizza3.jpg'),(65,40,'1764550115528-dessert3.webp','http://localhost:3010/uploads/1764550115528-dessert3.webp'),(66,41,'1764551190732-dessert3.webp','http://localhost:3010/uploads/1764551190732-dessert3.webp'),(67,42,'1764551288920-pizz1.jpg','http://localhost:3010/uploads/1764551288920-pizz1.jpg'),(68,43,'1764551380051-pizz1.jpg','http://localhost:3010/uploads/1764551380051-pizz1.jpg'),(69,44,'1764552587058-pizz1.jpg','http://localhost:3010/uploads/1764552587058-pizz1.jpg'),(70,45,'1764552828505-pizza3.jpg','http://localhost:3010/uploads/1764552828505-pizza3.jpg'),(72,46,'1764555745890-pizza3.jpg','http://localhost:3010/uploads/1764555745890-pizza3.jpg'),(73,47,'1764556238937-pizza2.webp','http://localhost:3010/uploads/1764556238937-pizza2.webp'),(74,47,'1764556255763-pizza3.jpg','http://localhost:3010/uploads/1764556255763-pizza3.jpg'),(75,48,'1764566522395-pizza3.jpg','http://localhost:3010/uploads/1764566522395-pizza3.jpg'),(76,48,'1764566550972-pizza2.webp','http://localhost:3010/uploads/1764566550972-pizza2.webp'),(77,54,'1764572602263-dessert3.webp','http://localhost:3010/uploads/1764572602263-dessert3.webp'),(78,55,'1764573090491-profilewoman1.jpg','http://localhost:3010/uploads/1764573090491-profilewoman1.jpg'),(79,56,'1764573284937-profileman1.jpg','http://localhost:3010/uploads/1764573284937-profileman1.jpg'),(80,57,'1764573384234-pizza3.jpg','http://localhost:3010/uploads/1764573384234-pizza3.jpg'),(81,58,'1764574044120-burger2.jfif','http://localhost:3010/uploads/1764574044120-burger2.jfif'),(82,58,'1764574044123-dessert1.jpg','http://localhost:3010/uploads/1764574044123-dessert1.jpg'),(83,58,'1764574044126-dessert2.jpg','http://localhost:3010/uploads/1764574044126-dessert2.jpg'),(84,58,'1764574044127-pizza2.webp','http://localhost:3010/uploads/1764574044127-pizza2.webp'),(86,59,'1764577102534-dessert3.webp','http://localhost:3010/uploads/1764577102534-dessert3.webp'),(87,60,'1764577434788-profilewoman1.jpg','http://localhost:3010/uploads/1764577434788-profilewoman1.jpg'),(88,61,'1764577628040-profileman1.jpg','http://localhost:3010/uploads/1764577628040-profileman1.jpg'),(89,62,'1764577937108-burger1.jpg','http://localhost:3010/uploads/1764577937108-burger1.jpg'),(90,62,'1764577937111-burger2.jfif','http://localhost:3010/uploads/1764577937111-burger2.jfif'),(94,63,'1764643514463-korean1.jpg','http://localhost:3010/uploads/1764643514463-korean1.jpg'),(95,63,'1764643514466-korean2.webp','http://localhost:3010/uploads/1764643514466-korean2.webp'),(96,63,'1764643514468-korean3.webp','http://localhost:3010/uploads/1764643514468-korean3.webp'),(97,63,'1764643514469-korean4.webp','http://localhost:3010/uploads/1764643514469-korean4.webp'),(98,64,'1764643678591-cambodian1.jpg','http://localhost:3010/uploads/1764643678591-cambodian1.jpg'),(99,64,'1764643678593-cambodian2.jpg','http://localhost:3010/uploads/1764643678593-cambodian2.jpg'),(100,64,'1764643678596-cambodian3.jpg','http://localhost:3010/uploads/1764643678596-cambodian3.jpg'),(101,64,'1764643678597-cambodian4.jpg','http://localhost:3010/uploads/1764643678597-cambodian4.jpg'),(102,65,'1764643936191-brunch1.jpg','http://localhost:3010/uploads/1764643936191-brunch1.jpg'),(103,65,'1764643936191-brunch2.jpeg','http://localhost:3010/uploads/1764643936191-brunch2.jpeg'),(104,65,'1764643936195-brunch3.jfif','http://localhost:3010/uploads/1764643936195-brunch3.jfif'),(105,66,'1764644618393-japanese1.webp','http://localhost:3010/uploads/1764644618393-japanese1.webp'),(106,66,'1764644618395-japanese2.jpg','http://localhost:3010/uploads/1764644618395-japanese2.jpg'),(107,66,'1764644618396-japanese3.jpg','http://localhost:3010/uploads/1764644618396-japanese3.jpg'),(108,66,'1764644618400-japanese4.jpg','http://localhost:3010/uploads/1764644618400-japanese4.jpg'),(109,66,'1764644618401-japanese5.avif','http://localhost:3010/uploads/1764644618401-japanese5.avif'),(110,67,'1764645127885-chicken1.jpg','http://localhost:3010/uploads/1764645127885-chicken1.jpg'),(111,67,'1764645127888-chicken2.jpg','http://localhost:3010/uploads/1764645127888-chicken2.jpg'),(112,67,'1764645127890-chicken3.jpg','http://localhost:3010/uploads/1764645127890-chicken3.jpg'),(113,68,'1764648948255-japanese1.webp','http://localhost:3010/uploads/1764648948255-japanese1.webp'),(114,69,'1764654966833-hope.webp','http://localhost:3010/uploads/1764654966833-hope.webp'),(115,70,'1764655955681-japanese1.webp','http://localhost:3010/uploads/1764655955681-japanese1.webp'),(116,71,'1764665197266-fine1.jpg','http://localhost:3010/uploads/1764665197266-fine1.jpg'),(117,71,'1764665197269-fine1.webp','http://localhost:3010/uploads/1764665197269-fine1.webp'),(118,71,'1764665197271-fine2.jpg','http://localhost:3010/uploads/1764665197271-fine2.jpg'),(119,71,'1764665197273-fine3.jpg','http://localhost:3010/uploads/1764665197273-fine3.jpg'),(121,71,'1764665236357-fine4.jpg','http://localhost:3010/uploads/1764665236357-fine4.jpg');
/*!40000 ALTER TABLE `tbl_feed_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_follow`
--

DROP TABLE IF EXISTS `tbl_follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_follow` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `FOLLOWER_ID` varchar(50) NOT NULL,
  `FOLLOWING_ID` varchar(50) NOT NULL,
  `CREATED_AT` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `unique_follow` (`FOLLOWER_ID`,`FOLLOWING_ID`),
  KEY `FOLLOWING_ID` (`FOLLOWING_ID`),
  CONSTRAINT `tbl_follow_ibfk_1` FOREIGN KEY (`FOLLOWER_ID`) REFERENCES `tbl_user` (`userId`),
  CONSTRAINT `tbl_follow_ibfk_2` FOREIGN KEY (`FOLLOWING_ID`) REFERENCES `tbl_user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_follow`
--

LOCK TABLES `tbl_follow` WRITE;
/*!40000 ALTER TABLE `tbl_follow` DISABLE KEYS */;
INSERT INTO `tbl_follow` VALUES (11,'gourmetboy','gourmetgirl','2025-12-02 09:36:38'),(12,'gourmetgirl','gourmetboy','2025-12-02 09:36:52'),(14,'aline01','sophirnie01','2025-12-02 12:04:04'),(15,'aline01','sophie01','2025-12-02 12:04:08'),(16,'aline01','gourmetboy','2025-12-02 12:04:11'),(17,'aline01','gourmetgirl','2025-12-02 12:04:12'),(18,'sophirnie01','aline01','2025-12-02 12:06:24'),(19,'sophie01','aline01','2025-12-02 12:06:40'),(20,'aline01','mijin01','2025-12-02 12:12:21'),(21,'sophie01','mijin01','2025-12-02 13:56:18'),(22,'sophie01','hope01','2025-12-02 13:56:19'),(23,'sophie01','sophirnie01','2025-12-02 13:56:20'),(25,'hope01','aline01','2025-12-02 15:35:38'),(30,'aline01','hope01','2025-12-02 15:55:43'),(31,'aline01','batman01','2025-12-02 17:50:21'),(32,'batman01','mijin01','2025-12-02 17:50:47'),(33,'batman01','hope01','2025-12-02 17:50:49'),(34,'batman01','sophirnie01','2025-12-02 17:50:50'),(35,'batman01','sophie01','2025-12-02 17:50:51'),(36,'batman01','aline01','2025-12-02 17:50:53'),(37,'batman01','gourmetboy','2025-12-02 17:50:55'),(38,'batman01','gourmetgirl','2025-12-02 17:50:56');
/*!40000 ALTER TABLE `tbl_follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_likes`
--

DROP TABLE IF EXISTS `tbl_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_likes` (
  `likeId` int NOT NULL AUTO_INCREMENT,
  `postId` int NOT NULL,
  `userId` varchar(50) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`likeId`),
  UNIQUE KEY `unique_like` (`postId`,`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_likes`
--

LOCK TABLES `tbl_likes` WRITE;
/*!40000 ALTER TABLE `tbl_likes` DISABLE KEYS */;
INSERT INTO `tbl_likes` VALUES (11,31,'gourmetgirl','2025-11-28 15:47:59'),(12,30,'gourmetgirl','2025-11-28 15:48:04'),(17,32,'gourmetgirl','2025-11-28 18:20:49'),(38,36,'gourmetboy','2025-12-01 09:23:52'),(41,32,'gourmetboy','2025-12-01 10:25:09'),(42,31,'gourmetboy','2025-12-01 10:25:10'),(47,37,'gourmetgirl','2025-12-01 14:35:57'),(48,37,'gourmetboy','2025-12-01 15:18:50'),(49,66,'aline01','2025-12-02 12:05:15'),(50,65,'aline01','2025-12-02 12:05:16'),(51,64,'aline01','2025-12-02 12:05:18'),(52,63,'aline01','2025-12-02 12:05:20'),(53,37,'aline01','2025-12-02 12:05:22'),(54,32,'aline01','2025-12-02 12:05:28'),(55,68,'aline01','2025-12-02 13:15:53'),(57,71,'aline01','2025-12-02 17:49:01');
/*!40000 ALTER TABLE `tbl_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_notification`
--

DROP TABLE IF EXISTS `tbl_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_notification` (
  `NOTIFICATION_ID` int NOT NULL AUTO_INCREMENT,
  `USER_ID` varchar(50) NOT NULL,
  `FOLLOWER_ID` varchar(50) NOT NULL,
  `TYPE` varchar(20) DEFAULT 'follow',
  `IS_READ` tinyint(1) DEFAULT '0',
  `CREATED_AT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`NOTIFICATION_ID`),
  KEY `USER_ID` (`USER_ID`),
  KEY `FOLLOWER_ID` (`FOLLOWER_ID`),
  CONSTRAINT `tbl_notification_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `tbl_user` (`userId`),
  CONSTRAINT `tbl_notification_ibfk_2` FOREIGN KEY (`FOLLOWER_ID`) REFERENCES `tbl_user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_notification`
--

LOCK TABLES `tbl_notification` WRITE;
/*!40000 ALTER TABLE `tbl_notification` DISABLE KEYS */;
INSERT INTO `tbl_notification` VALUES (2,'aline01','hope01','follow',1,'2025-12-02 06:35:38'),(7,'hope01','aline01','follow',1,'2025-12-02 06:55:43'),(8,'batman01','aline01','follow',1,'2025-12-02 08:50:21'),(9,'mijin01','batman01','follow',0,'2025-12-02 08:50:47'),(10,'hope01','batman01','follow',0,'2025-12-02 08:50:49'),(11,'sophirnie01','batman01','follow',0,'2025-12-02 08:50:50'),(12,'sophie01','batman01','follow',0,'2025-12-02 08:50:51'),(13,'aline01','batman01','follow',0,'2025-12-02 08:50:53'),(14,'gourmetboy','batman01','follow',0,'2025-12-02 08:50:55'),(15,'gourmetgirl','batman01','follow',0,'2025-12-02 08:50:56');
/*!40000 ALTER TABLE `tbl_notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_post_category`
--

DROP TABLE IF EXISTS `tbl_post_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_post_category` (
  `POST_ID` int NOT NULL,
  `CATEGORY_ID` int NOT NULL,
  `CREATED_AT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`POST_ID`,`CATEGORY_ID`),
  KEY `CATEGORY_ID` (`CATEGORY_ID`),
  CONSTRAINT `tbl_post_category_ibfk_1` FOREIGN KEY (`POST_ID`) REFERENCES `tbl_feed` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tbl_post_category_ibfk_2` FOREIGN KEY (`CATEGORY_ID`) REFERENCES `tbl_category` (`CATEGORY_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_post_category`
--

LOCK TABLES `tbl_post_category` WRITE;
/*!40000 ALTER TABLE `tbl_post_category` DISABLE KEYS */;
INSERT INTO `tbl_post_category` VALUES (27,32,'2025-12-02 02:55:22'),(27,36,'2025-12-02 02:55:22'),(27,37,'2025-12-02 02:55:22'),(37,34,'2025-12-02 02:54:17'),(37,35,'2025-12-02 02:54:17'),(63,27,'2025-12-02 02:45:13'),(63,28,'2025-12-02 02:45:13'),(63,29,'2025-12-02 02:45:13'),(64,30,'2025-12-02 02:47:57'),(64,31,'2025-12-02 02:47:57'),(65,32,'2025-12-02 02:52:15'),(65,33,'2025-12-02 02:52:15'),(66,27,'2025-12-02 03:03:37'),(66,38,'2025-12-02 03:03:37'),(66,39,'2025-12-02 03:03:37'),(67,28,'2025-12-02 03:12:07'),(67,40,'2025-12-02 03:12:07'),(67,41,'2025-12-02 03:12:07'),(71,22,'2025-12-02 08:47:16'),(71,42,'2025-12-02 08:47:16'),(71,43,'2025-12-02 08:47:16');
/*!40000 ALTER TABLE `tbl_post_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_product`
--

DROP TABLE IF EXISTS `tbl_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_product` (
  `productId` int NOT NULL AUTO_INCREMENT,
  `productName` varchar(100) NOT NULL,
  `description` text,
  `price` decimal(10,0) NOT NULL,
  `stock` int DEFAULT '0',
  `category` varchar(50) DEFAULT NULL,
  `isAvailable` varchar(1) DEFAULT NULL,
  `cdatetime` datetime DEFAULT CURRENT_TIMESTAMP,
  `udatetime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`productId`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_product`
--

LOCK TABLES `tbl_product` WRITE;
/*!40000 ALTER TABLE `tbl_product` DISABLE KEYS */;
INSERT INTO `tbl_product` VALUES (5,'여성 청바지','스트레치 데님 청바지',35900,35,'의류','Y','2025-11-14 11:13:22','2025-11-14 11:13:22'),(6,'휴대폰 케이스','아이폰 14 전용 실리콘 케이스',12000,75,'전자기기','Y','2025-11-14 11:13:22','2025-11-14 11:13:22'),(7,'LED 스탠드','조도 조절 가능한 LED 책상용 스탠드',33000,60,'생활용품','Y','2025-11-14 11:13:22','2025-11-14 11:13:22'),(8,'노트북 쿨링패드','노트북 발열 방지를 위한 쿨링패드',27000,40,'전자기기','Y','2025-11-14 11:13:22','2025-11-14 11:13:22'),(9,'스포츠 양말','운동용 흡한속건 기능성 양말',5900,300,'의류','Y','2025-11-14 11:13:22','2025-11-14 11:13:22'),(10,'텀블러 500ml','보온보냉 가능한 스테인리스 텀블러',21000,90,'생활용품','Y','2025-11-14 11:13:22','2025-11-14 11:13:22'),(11,'USB-C 충전기','65W 고속충전기',39000,100,'전자기기','Y','2025-11-14 11:13:22','2025-11-14 11:13:22'),(12,'면 화장솜','100매입 무형광 화장솜',3000,180,'생활용품','Y','2025-11-14 11:13:22','2025-11-14 11:13:22'),(13,'여성 니트','겨울용 따뜻한 브이넥 니트',49900,22,'의류','Y','2025-11-14 11:13:22','2025-11-14 11:13:22'),(14,'샤워볼','거품 잘 나는 목욕용 샤워볼',2500,150,'생활용품','Y','2025-11-14 11:13:22','2025-11-14 11:13:22'),(15,'블루투스 스피커','휴대용 미니 블루투스 스피커',42000,45,'전자기기','Y','2025-11-14 11:13:22','2025-11-14 11:13:22'),(16,'에코백','캔버스 소재 친환경 에코백',17900,110,'의류','Y','2025-11-14 11:13:22','2025-11-14 11:13:22'),(17,'헤어드라이기','1200W 강풍모드 드라이기',32000,55,'생활용품','Y','2025-11-14 11:13:22','2025-11-14 11:13:22'),(18,'휴대용 선풍기','USB 충전식 미니 선풍기',15000,130,'전자기기','Y','2025-11-14 11:13:22','2025-11-14 11:13:22'),(19,'기모 레깅스','겨울용 따뜻한 기모 레깅스',22900,38,'의류','Y','2025-11-14 11:13:22','2025-11-14 11:13:22'),(20,'수세미 세트','3개입 친환경 수세미 세트',4900,210,'생활용품','Y','2025-11-14 11:13:22','2025-11-14 11:13:22'),(21,'test',NULL,85000,0,'의류',NULL,'2025-11-14 13:24:37','2025-11-14 13:24:37'),(22,'test2-edited',NULL,70000,0,'의류',NULL,'2025-11-14 13:25:41','2025-11-19 16:38:45'),(25,'qqq',NULL,123,0,NULL,NULL,'2025-11-20 16:11:59','2025-11-20 16:11:59'),(26,'test3',NULL,1234,0,NULL,NULL,'2025-11-21 10:45:30','2025-11-21 10:45:30');
/*!40000 ALTER TABLE `tbl_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_product_file`
--

DROP TABLE IF EXISTS `tbl_product_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_product_file` (
  `fileNo` int NOT NULL AUTO_INCREMENT,
  `productId` int DEFAULT NULL,
  `fileName` varchar(255) DEFAULT NULL,
  `filePath` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`fileNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_product_file`
--

LOCK TABLES `tbl_product_file` WRITE;
/*!40000 ALTER TABLE `tbl_product_file` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_product_file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_saved`
--

DROP TABLE IF EXISTS `tbl_saved`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_saved` (
  `userId` varchar(50) NOT NULL,
  `postId` int NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`,`postId`),
  KEY `postId` (`postId`),
  CONSTRAINT `tbl_saved_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `tbl_user` (`userId`),
  CONSTRAINT `tbl_saved_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `tbl_feed` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_saved`
--

LOCK TABLES `tbl_saved` WRITE;
/*!40000 ALTER TABLE `tbl_saved` DISABLE KEYS */;
INSERT INTO `tbl_saved` VALUES ('aline01',37,'2025-12-02 03:05:08'),('aline01',64,'2025-12-02 03:05:04'),('aline01',65,'2025-12-02 03:05:02'),('aline01',66,'2025-12-02 03:05:01'),('batman01',66,'2025-12-02 08:51:41'),('batman01',67,'2025-12-02 08:51:28'),('gourmetboy',30,'2025-12-01 06:00:00'),('gourmetboy',32,'2025-12-01 02:23:05'),('gourmetgirl',37,'2025-12-01 05:44:03');
/*!40000 ALTER TABLE `tbl_saved` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_test`
--

DROP TABLE IF EXISTS `tbl_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_test` (
  `PK_NO` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(45) DEFAULT NULL,
  `AGE` int DEFAULT NULL,
  `CDATETIME` datetime DEFAULT NULL,
  PRIMARY KEY (`PK_NO`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_test`
--

LOCK TABLES `tbl_test` WRITE;
/*!40000 ALTER TABLE `tbl_test` DISABLE KEYS */;
INSERT INTO `tbl_test` VALUES (1,'홍길동',30,NULL),(2,'김철수',25,NULL),(3,'김영희',20,'2025-11-13 13:18:30');
/*!40000 ALTER TABLE `tbl_test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_user` (
  `userId` varchar(50) NOT NULL,
  `pwd` varchar(500) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `addr` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `cdatetime` datetime DEFAULT CURRENT_TIMESTAMP,
  `udatetime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `follower` int DEFAULT '0',
  `following` int DEFAULT '0',
  `intro` varchar(300) DEFAULT 'Tell us more about you !',
  `email` varchar(255) NOT NULL,
  `imgPath` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_user`
--

LOCK TABLES `tbl_user` WRITE;
/*!40000 ALTER TABLE `tbl_user` DISABLE KEYS */;
INSERT INTO `tbl_user` VALUES ('aline01','$2b$10$Mtb2vtBbmDisgFf5vuOPHeAG2QlP22edFUT1e3YRxB4R99MINfhf6','Aline Siv',NULL,NULL,'2025-12-02 11:41:49','2025-12-02 17:50:53',4,7,'I am a capricorn ~','aline@gmail.com','http://localhost:3010/uploads/1764643327488-aline.avif'),('batman01','$2b$10$JTJo0WhHCFKyy6uY/ixpO.MGzNSFQAh0Vu6B./ZQpi7TXAUJm8dVC','The Real Batman',NULL,NULL,'2025-12-02 17:37:55','2025-12-02 17:50:56',1,7,'If you know me, you know I enjoy fancy dinners...','batman@gmail.com','http://localhost:3010/uploads/1764664722646-batman.webp'),('gourmetboy','$2b$10$1TAppxU9ofibqCpYtrB8Ruc362FLcgbUBJ6QWmFoUQV/aEKqP3w.6','John Doe',NULL,NULL,'2025-11-26 13:01:47','2025-12-02 17:50:55',3,1,'Looking for the little gems in town !  ','johndoe22@gmail.com','http://localhost:3010/uploads/1764574236475-profileman1.jpg'),('gourmetgirl','$2b$10$E7cLIalFPYRoPjMZTvdCbesd.IzMaxZlakBtr4eJkNKKmCDfAgRwG','Jane Mary Doe',NULL,NULL,'2025-11-26 14:22:47','2025-12-02 17:50:56',3,1,'Looking for the little gems in town !  ','janedoe@gmail.com','http://localhost:3010/uploads/1764567321967-profilewoman1.jpg'),('hope01','$2b$10$k8Wntm4.aFC43iQ1DNwdtOsF/In7EJdvkVt0pmvmOniujlib52CT6','Hope Denny',NULL,NULL,'2025-12-02 11:40:46','2025-12-02 17:50:49',3,1,'I am a libra~','hope@gmail.com','http://localhost:3010/uploads/1764643271430-hope.webp'),('mijin01','$2b$10$skYQg5JNF8wTkjR6FGPDDujJtOMTtZXaBEfQKQF0fGA/v18NpzTvG','Lee Mijin',NULL,NULL,'2025-12-02 12:08:29','2025-12-02 17:50:47',3,0,'I am a virgo ~','mijin@gmail.com','http://localhost:3010/uploads/1764644925974-mijin.jpg'),('sophie01','$2b$10$CHTR4xg0GOkmHqYmHVwPKusVvfrO80/C/5MPIS1cWEBogV/pDzChC','Sophie Siv',NULL,NULL,'2025-12-02 11:39:35','2025-12-02 17:50:51',2,4,'I am a scorpio~','sophie@gmail.com','http://localhost:3010/uploads/1764643195069-sophie.jpg'),('sophirnie01','$2b$10$z8ejMUsoVPlnTJsDYXimxO1dcVITo4FJ.OHduZVK9NokvFu0.xinG','Sophirnie Heng',NULL,NULL,'2025-12-02 11:09:30','2025-12-02 17:50:50',3,1,'I am an Aries, don\'t mess with me.','sophirnie@gmail.com','http://localhost:3010/uploads/1764643143980-sophirnie.webp'),('test1','test1','test1',NULL,NULL,'2025-11-14 17:17:07','2025-11-14 17:17:07',0,0,'안녕하세요?','',NULL),('test2','$2b$10$Jb000eN/J1W7yMrTe4cbz.gD/TnH/45M/hOWsHuOHgYBYDH3pcMxG','test2',NULL,NULL,'2025-11-14 17:40:25','2025-11-14 17:40:25',0,0,'안녕하세요?','',NULL),('test3','$2b$10$EL7zPssw0xRa2260VwTOL.gzMv/lt2wH4a8/NjynPz3i6fJFlzH6a','test3',NULL,NULL,'2025-11-18 11:05:00','2025-11-18 11:05:00',0,0,'안녕하세요?','',NULL),('test4','$2b$10$jRu7BueJWihnWP8NjJS2zOXqGFjEIZ/tO5w9viDm5EjzacCk2QnbO','test4',NULL,NULL,'2025-11-21 12:34:17','2025-11-21 12:34:17',0,0,'안녕하세요?','',NULL),('test5','$2b$10$69pn.eOdsP09NFL.RXZxA.NPilHJOI/1kz0pDOKIKYeKAtHdVTrCy','test5',NULL,NULL,'2025-11-21 12:36:00','2025-11-21 12:36:00',0,0,'안녕하세요?','',NULL),('test6','$2b$10$QsDmT4p.JkUAebOzgRjhjOQUZbdjxOUfV0vm313DYttOhpLrstQD6','test6',NULL,NULL,'2025-11-21 12:36:28','2025-11-21 12:36:28',0,0,'안녕하세요?','',NULL),('test7','$2b$10$2T5IJBztnkSji5WFfSuv4OJ5F.e.p.82dtRWizDSIL6.NuJQrkL3i','test7',NULL,NULL,'2025-11-21 12:38:00','2025-11-21 12:38:00',0,0,'안녕하세요?','',NULL),('test8','$2b$10$3eKKCG402j31NCH5JLMA0ew89/rtoirP8PYqPWPFUjNz8RKMz/c6m','test8',NULL,NULL,'2025-11-25 13:07:54','2025-11-25 13:07:54',0,0,'안녕하세요?','aline.rousselinsiv@gmail.com',NULL),('test9','$2b$10$ArDWclmm/SQrxoarpJnul.zFMrX5S.etsTHwsG7fxXEokLwZka1t.','test9',NULL,NULL,'2025-11-25 13:09:54','2025-11-26 12:40:51',0,0,'안녕하세요?','test9@test9.com','http://localhost:3010/uploads/profileManImg.jpg'),('user001','pwd1','홍길동','서울','010-1111-2222','2025-11-14 11:13:22','2025-11-14 11:13:22',0,0,'안녕하세요?','',NULL),('user002','pwd2','김철수','인천','010-2233-4455','2025-11-14 11:13:22','2025-11-14 11:13:22',0,0,'안녕하세요?','',NULL),('user003','pwd3','이영희','대전','010-3344-5566','2025-11-14 11:13:22','2025-11-14 11:13:22',0,0,'안녕하세요?','',NULL),('user004','pwd4','박지민','광주','010-4455-6677','2025-11-14 11:13:22','2025-11-14 11:13:22',0,0,'안녕하세요?','',NULL),('user005','pwd5','최민수','서울','010-5566-7788','2025-11-14 11:13:22','2025-11-14 11:13:22',0,0,'안녕하세요?','',NULL),('user006','pwd6','정수진','부산','010-6677-8899','2025-11-14 11:13:22','2025-11-14 11:13:22',0,0,'안녕하세요?','',NULL),('user007','pwd7','김하늘','인천','010-7788-9900','2025-11-14 11:13:22','2025-11-14 11:13:22',0,0,'안녕하세요?','',NULL),('user008','pwd8','이상훈','울산','010-8899-1000','2025-11-14 11:13:22','2025-11-14 11:13:22',0,0,'안녕하세요?','',NULL),('user009','pwd9','박세영','대구','010-9900-1111','2025-11-14 11:13:22','2025-11-14 11:13:22',0,0,'안녕하세요?','',NULL),('user010','pwd10','정예린','경기','010-1001-1222','2025-11-14 11:13:22','2025-11-14 11:13:22',0,0,'안녕하세요?','',NULL);
/*!40000 ALTER TABLE `tbl_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-02 18:26:49
