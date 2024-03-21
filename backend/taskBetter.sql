DROP SCHEMA IF EXISTS task_better;
CREATE SCHEMA task_better;
USE task_better;

CREATE TABLE user (
    user_id INTEGER NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(120) NOT NULL,
    PRIMARY KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO user (username, password) VALUES ('admin account', 'secretkey');