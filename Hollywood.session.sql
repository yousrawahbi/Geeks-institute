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