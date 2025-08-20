CREATE TABLE actors(
 actor_id SERIAL PRIMARY KEY,
 first_name VARCHAR (50) NOT NULL,
 last_name VARCHAR (100) NOT NULL,
 age DATE NOT NULL,
 number_oscars SMALLINT NOT NULL
)

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES('Matt','Damon','08/10/1970', 5);

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES('George','Clooney','06/05/1961', 2);

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES('Lana','Queen','16/08/1987', 4);

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES('Hanna','Jimm','24/11/1994', 6);

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES('Sam','Good','10/10/1977', 1),('Max','Moon','16/08/1996', 3),('Joe','More','11/11/2003', 1);

SELECT * FROM actors
 --qst1 Count how many actors are in the table

SELECT COUNT(*) AS actor_count FROM actors;

 --qst2 Try to add a new actor with some blank fields. 
 --What do you think the outcome will be ?
INSERT INTO actors (first_name, last_name, age, number_oscars) 
VALUES ('Clara', NULL, NULL, 1);

-- Erreur, car on a déclaré Date et last_name NOT NULL donc on doit les remplir
