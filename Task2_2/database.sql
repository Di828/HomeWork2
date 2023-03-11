CREATE TABLE film
(
    film_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    title text,
    yr numeric,
    CONSTRAINT film_pkey PRIMARY KEY (film_id)
)

CREATE TABLE genre
(
    genre_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    name text,
    CONSTRAINT genre_pkey PRIMARY KEY (genre_id)
)

CREATE TABLE filmgenre
(
    film_id bigint NOT NULL,
    genre_id bigint NOT NULL,
    CONSTRAINT filmgenre_pkey PRIMARY KEY (film_id, genre_id),
    CONSTRAINT filmgenre_film_id_fk FOREIGN KEY (film_id)
        REFERENCES film (film_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT filmgenre_genre_id_fk FOREIGN KEY (genre_id)
        REFERENCES genre (genre_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
)