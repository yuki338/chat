-- 削除処理
-- alter table user drop column `authId`;
-- alter table user drop column `picture`;

alter table user add column `authId` text not null after `name`;
alter table user add column `picture` text not null after `authId`;
