CREATE DATABASE student_database;

USE student_database;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255) NOT NULL
);
