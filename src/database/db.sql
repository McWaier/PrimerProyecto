CREATE DATABASE database_links;
USE database_links;

CREATE TABLE usuarios(
    id INT(11)NOT NULL,
    nombre VARCHAR(25)NOT NULL,
    contraseña VARCHAR(60)NO NULL,
    nombre_completo VARCHAR(100) NOT NULL
);

ALTER TABLE usuarios
    ADD PRIMARY KEY (id);

ALTER TABLE usuarios
    MODIFY id INT (11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

DESCRIBE usuarios;

--TABLA LINKS
CREATE TABLE links(
    id INT(11)NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    descripcion TEXT,
    usuario_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);


ALTER TABLE links
    ADD PRIMARY KEY (id);

ALTER TABLE links
    MODIFY id INT (11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;