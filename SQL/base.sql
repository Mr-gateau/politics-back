CREATE TABLE post (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user VARCHAR(50),
    key_post VARCHAR(50),
    title VARCHAR(50),
    intro VARCHAR(100),
    content VARCHAR(500),
    depend INT,
    burn INT,
    cold INT
);

DROP TABLE depends;

CREATE TABLE depends (
    id INT PRIMARY KEY,
    depend_name VARCHAR(50)
);

INSERT INTO depends (id, depend_name) VALUES 
(1, 'Economic'),
(2, 'Ecologic'),
(3, 'Religious'),
(4, 'Technologie'),
(5, 'Vegan'),
(6, 'Extrem'),
(7, 'Conceptual');

CREATE TABLE admins (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(50),
    password VARCHAR(50)
);