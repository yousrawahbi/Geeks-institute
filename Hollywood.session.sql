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

SELECT * FROM actors;

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES('Lana','Queen','16/08/1987', 4);

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES('Hanna','Jimm','24/11/1994', 6);

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES('Sam','Good','10/10/1977', 1),('Max','Moon','16/08/1996', 3),('Joe','More','11/11/2003', 1);

SELECT * FROM actors WHERE first_name = 'Matt';

SELECT * FROM actors WHERE number_oscars >= 3;

SELECT last_name FROM actors WHERE first_name != 'Matt' ;

SELECT first_name, last_name FROM actors WHERE first_name = 'Matt'  AND 
last_name = 'Damon' ;

SELECT first_name, last_name FROM actors WHERE first_name = 'Matt'  AND 
last_name = 'Clooney' ;

SELECT first_name, last_name FROM actors WHERE first_name = 'Matt'  OR  
number_oscars = 2 ;

SELECT * FROM actors WHERE last_name LIKE '%mon%';

SELECT first_name FROM actors WHERE last_name LIKE '%y'
SELECT first_name FROM actors WHERE last_name LIKE 'da%'
SELECT first_name FROM actors WHERE last_name ILIKE 'da%'
SELECT * FROM actors LIMIT 1;
SELECT * FROM actors WHERE age > '1960-01-01' LIMIT 1;
SELECT * FROM actors WHERE age > '1960-01-01' LIMIT 3 OFFSET 2;
SELECT * FROM actors WHERE age > '1960-01-01' ORDER BY first_name ASC

UPDATE actors 
SET age='1970-01-01' 
WHERE first_name='Matt' AND last_name='Damon'
RETURNING 
    actor_id,
    first_name, 
    last_name,
    age;

DELETE FROM actors WHERE actor_id=4
RETURNING actor_id, first_name, last_name, number_oscars;


 SELECT COUNT(*) AS actor_count FROM actors;

 INSERT INTO actors (first_name, last_name, age, number_oscars) 
VALUES ('Clara', NULL, NULL, 1);

--Aggregate functions

SELECT avg(number_oscars) AS average_number_oscars FROM actors;

SELECT count(first_name) AS total_names FROM actors;

SELECT count(*) FROM actors;

SELECT max(number_oscars) AS best_actor FROM actors;

SELECT min(number_oscars) AS worst_actor FROM actors;

SELECT sum(number_oscars) AS total_oscars FROM actors;

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES('Matt','Ross','03/01/1970', 0);

SELECT * FROM actors;

SELECT DISTINCT first_name FROM actors;

SELECT DISTINCT first_name FROM actors ORDER BY first_name DESC;

SELECT * FROM actors WHERE first_name in ('Matt','Lea','Davis');

SELECT * FROM actors WHERE first_name not in ('Matt','Lea','Davis');

SELECT * FROM actors WHERE age between '1961-01-01' and '1962-01-01';


INSERT INTO actors (first_name, last_name, age, number_oscars) VALUES('George','Clooney','06/05/1961 ', 1);

SELECT first_name, last_name, sum(number_oscars) FROM actors GROUP BY first_name, last_name;

SELECT first_name, last_name, sum(number_oscars) FROM actors GROUP BY first_name, last_name 
ORDER BY min(number_oscars);

--ex agg func

--Get the average number of oscars in the table

SELECT avg(number_oscars) AS average_number_oscars FROM actors;

--Get distinct actors depending on their number of oscars

SELECT DISTINCT number_oscars FROM actors

--Get the actors born after 01/01/1970

SELECT first_name, last_name, age FROM actors WHERE age > '01/01/1970'

--Get the actors which names are David, Morgan or Will

SELECT * FROM actors WHERE first_name in ('David','Morgan','Will')


--- HAVING & UNION

SELECT number_oscars, COUNT(*) as actor_count
FROM actors 
GROUP BY number_oscars
HAVING COUNT(*) >= 2;

SELECT 'Has Oscar' as status, COUNT(*) as count
FROM actors
WHERE number_oscars > 0
UNION
SELECT 'No Oscar' as status, COUNT(*) as count
FROM actors 
WHERE number_oscars = 0;


--Foreign key

CREATE TABLE movies(
 movie_id SERIAL,
 movie_title VARCHAR (50) NOT NULL,
 movie_story TEXT,
 actor_playing_id INTEGER,
 PRIMARY KEY (movie_id),
 FOREIGN KEY (actor_playing_id) REFERENCES actors (actor_id)
);

INSERT INTO movies (movie_title, movie_story, actor_playing_id) VALUES
    ( 'Good Will Hunting', 
    'Written by Affleck and Damon, the film follows 20-year-old South Boston janitor Will Hunting',
    (SELECT actor_id from actors WHERE first_name='Matt' AND last_name='Damon')),
    ( 'Oceans Eleven', 
    'American heist film directed by Steven Soderbergh and written by Ted Griffin.', 
    (SELECT actor_id from actors WHERE first_name='Matt' AND last_name='Damon'));

SELECT * FROM movies