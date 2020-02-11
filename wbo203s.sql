select * from users;
insert into users (username, user_type,password) VALUES('Liddy',5,'L1u2c3k4');

show create table users;

CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `user_type` tinyint NOT NULL,
  `password` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `user_sessions` (
  `id` char(32) NOT NULL,
  `data` varchar(20000) NOT NULL,
  `createdAt` timestamp NOT NULL default '0000-00-00 00:00:00',
  `updatedAt` timestamp NOT NULL default '0000-00-00 00:00:00' on update CURRENT_TIMESTAMP,
  PRIMARY KEY  (`id`),
  KEY `createdAt` (`createdAt`),
  KEY `updatedAt` (`updatedAt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `user_login_sessions` (
  `session_id` varchar(128) COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB;
select session_id, from_unixtime(expires,'%Y-%m-%d %H:%i:%s') as expires,data from user_login_sessions;