CREATE TABLE film(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    year INTEGER
)

CREATE TABLE ganre(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    film_id INTEGER,
    FOREIGN KEY (film_id) REFERENCES film(id)
)