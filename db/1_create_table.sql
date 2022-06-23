CREATE TABLE `test` (
  `testId` int NOT NULL AUTO_INCREMENT,
  `text` text,
  PRIMARY KEY (`testId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- chatユーザーのパスワードを再設定すること
-- alter user chat identified with mysql_native_password by '';
