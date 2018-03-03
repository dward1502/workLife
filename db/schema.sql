CREATE DATABASE worklife_db;

use worklife_db;

CREATE TABLE Suggestions (
	id INT NOT NULL AUTO_INCREMENT,
    text VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
) 