CREATE DATABASE lee;

use lee;

CREATE TABLE this(
    idx int(11) not null auth_increment primary key,
    userid varchar(50) not null,
    userpw varchar(50) not null,
    token text,
    username varchar(50) not null,
    ymd varchar(50) not null,
    gender varchar(50) not null,
    email varchar(50),
    tel varchar(50) not null,
) auto_increment=1 default charset=utf8mb4;
