-- Create database
CREATE DATABASE booklive;

-- Use the database
USE booklive;

-- Table to store user information
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
    json_token VARCHAR(255);
);

-- Table to store book information
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,                -- Identificador único para cada libro
    user_id INT NOT NULL,                             -- Identificador del usuario que posee el libro
    title VARCHAR(255) NOT NULL,                      -- Título del libro
    author VARCHAR(255) NOT NULL,                     -- Autor del libro
    cover_image VARCHAR(255) NOT NULL,                -- URL de la imagen de portada
    rating INT CHECK (rating BETWEEN 1 AND 5),        -- Calificación del libro (1 a 5)
    category VARCHAR(50),                             -- Categoría del libro 
    description TEXT,                                 -- Descripción del libro
    FOREIGN KEY (user_id) REFERENCES users(id)       -- Llave foránea que referencia a la tabla users
);

-- Table to store wishlist items
CREATE TABLE wishlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    author VARCHAR(255) NOT NULL,  
    cover_image VARCHAR(255) NOT NULL,   
    price DECIMAL(10, 2),  
    link VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

--comandos
SHOW COLUMNS FROM wishlist;
SELECT * FROM wishlist;


