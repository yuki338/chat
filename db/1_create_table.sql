-- 削除処理
-- drop table if exists room;
-- drop table if exists message;
-- drop table if exists user;

create table `room` (
  `roomId` int not null auto_increment,
  `name` varchar(128) not null,
  `deleteFlg` tinyint default 0 not null,
  primary key (`roomId`)
);

create table `message` (
  `messageId` int not null auto_increment,
  `roomId` int default 0,
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
  `authId` text not null,
  `picture` text not null,
  `deleteFlg` tinyint default 0 not null,
  primary key (`userId`)
);

-- chatユーザーのパスワードを再設定すること
-- alter user chat identified with mysql_native_password by '';

-- create database test_chat;
-- create user test identified by 'test'; -- create user test identified with mysql_native_password by 'test'; でもいいかも？
-- grant all on test_chat.* to test;
-- alter user test identified with mysql_native_password by 'test';
