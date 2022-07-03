-- 削除処理
-- drop table if exists room;
-- drop table if exists message;
-- drop table if exists user;

create table `room` (
  `roomId` varchar(16) not null,
  `deleteFlg` tinyint default 0 not null,
  primary key (`roomId`)
);

create table `message` (
  `messageId` int not null auto_increment,
  `roomId` varchar(16) default '',
  `message` text not null,
  `userId` int default 0 not null,
  `dateTime` datetime not null,
  `deleteFlg` tinyint default 0 not null,
  primary key (`messageId`),
  index idxMessageId (`roomId`)
);

create table `user` (
  `userId` int not null auto_increment,
  `name` varchar(32) default '' not null,
  `deleteFlg` tinyint default 0 not null,
  primary key (`userId`)
);

-- chatユーザーのパスワードを再設定すること
-- alter user chat identified with mysql_native_password by '';
