CREATE TABLE IF NOT EXISTS public."Person"
(
    "Id" bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    "Fullname" text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Person_pkey" PRIMARY KEY ("Id")
)


CREATE TABLE IF NOT EXISTS public."Ganre"
(
    "Id" bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    "Ganre_Name" text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Ganre_pkey" PRIMARY KEY ("Id")
)


CREATE TABLE IF NOT EXISTS public.film
(
    "Id" bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    "Title" text COLLATE pg_catalog."default" NOT NULL,
    "ProductionYear" numeric NOT NULL,
    "CountryOfOrigin" text COLLATE pg_catalog."default" NOT NULL,
    "Tagline" text COLLATE pg_catalog."default",
    "DirectorId" bigint,
    "ScenarioId" bigint,
    "ProducerId" bigint,
    "OperatorId" bigint,
    "ComposerId" bigint,
    "ArtistId" bigint,
    "EditorId" bigint,
    "Budget" bigint NOT NULL,
    "Marketing" bigint NOT NULL,
    "USAFees" bigint NOT NULL,
    "WorldFees" bigint NOT NULL,
    "RussianPremier" date,
    "WorldPremier" date NOT NULL,
    "DVDRelease" date,
    "AgeLimit" numeric,
    "RatingsMPAA" text COLLATE pg_catalog."default",
    "Duration" numeric NOT NULL,
    CONSTRAINT film_pkey PRIMARY KEY ("Id"),
    CONSTRAINT "ArtistFKey" FOREIGN KEY ("ArtistId")
        REFERENCES public."Person" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "ComposerFKey" FOREIGN KEY ("ComposerId")
        REFERENCES public."Person" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "DirectorFKey" FOREIGN KEY ("DirectorId")
        REFERENCES public."Person" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "EditorFKey" FOREIGN KEY ("EditorId")
        REFERENCES public."Person" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "OperatorFKey" FOREIGN KEY ("OperatorId")
        REFERENCES public."Person" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "ProducerFKey" FOREIGN KEY ("ProducerId")
        REFERENCES public."Person" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "ScenarioFKey" FOREIGN KEY ("ScenarioId")
        REFERENCES public."Person" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)


CREATE TABLE IF NOT EXISTS public."Spectators"
(
    "Id" bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    "Country" text COLLATE pg_catalog."default" NOT NULL,
    "Count" bigint,
    "FilmId" bigint NOT NULL,
    CONSTRAINT "Spectators_pkey" PRIMARY KEY ("Id"),
    CONSTRAINT "FilmFKey" FOREIGN KEY ("FilmId")
        REFERENCES public.film ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)


CREATE TABLE IF NOT EXISTS public."FilmGanre"
(
    "FilmId" bigint NOT NULL,
    "GanreId" bigint NOT NULL,
    CONSTRAINT "FilmGanre_pkey" PRIMARY KEY ("FilmId", "GanreId"),
    CONSTRAINT "FilmFKey" FOREIGN KEY ("FilmId")
        REFERENCES public.film ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "GanreFKey" FOREIGN KEY ("GanreId")
        REFERENCES public."Ganre" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)


CREATE TABLE IF NOT EXISTS public."MainRoles"
(
    "FilmId" bigint NOT NULL,
    "PersonId" bigint NOT NULL,
    CONSTRAINT "MainRoles_pkey" PRIMARY KEY ("FilmId", "PersonId"),
    CONSTRAINT "FilmFKey" FOREIGN KEY ("FilmId")
        REFERENCES public.film ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "PersonFKey" FOREIGN KEY ("PersonId")
        REFERENCES public."Person" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)


CREATE TABLE IF NOT EXISTS public."RolesDuplicated"
(
    "FilmId" bigint NOT NULL,
    "PersonId" bigint NOT NULL,
    CONSTRAINT "RolesDuplicated_pkey" PRIMARY KEY ("FilmId", "PersonId"),
    CONSTRAINT "FilmFKey" FOREIGN KEY ("FilmId")
        REFERENCES public.film ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "PersonFKey" FOREIGN KEY ("PersonId")
        REFERENCES public."Person" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)