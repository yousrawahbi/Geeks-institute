---Exercice 1
--Part1


--Get a list of all the languages, from the language table.

SELECT name FROM language

--Get a list of all films joined with their languages –
-- select the following details : film title, description, and language name.
 SELECT f.title, f.description, l.name
 FROM film f
 INNER JOIN language l ON f.language_id= l.language_id;

--Get all languages, even if there are no films in those languages –
--select the following details : film title, description, and language name.

SELECT  l.name, f.title, f.description
 FROM film f
RIGHT JOIN language l ON f.language_id= l.language_id;


--Create a new table called new_film with the following columns :
--id, name. Add some new films to the table.

CREATE TABLE new_film (
    id SERIAL PRIMARY KEY,
    name VARCHAR (20) NOT NULL
);


INSERT INTO new_film (name)
VALUES('Break rules'),
        ('calm down'),
        ('Real world');
--Test
SELECT * FROM new_film;

--Create a new table called customer_review, which will contain film reviews that customers will make.

CREATE TABLE customer_review (
    review_id SERIAL PRIMARY KEY NOT NULL,
    flm_id INTEGER NOT NULL,
    language_id INTEGER NOT NULL,
    title VARCHAR (50) NOT NULL,
    review TEXT NOT NULL,
    score INTEGER NOT NULL CHECK (score BETWEEN 1 AND 10),
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (flm_id) REFERENCES new_film (id) ON DELETE CASCADE,
    FOREIGN KEY (language_id) REFERENCES language (language_id) ON DELETE RESTRICT
);

INSERT INTO customer_review (flm_id,language_id,title,review,score)
VALUES(2,1,'A Masterpeice','A breathtaking and moving drama about memory and loss. Beautifully shot and perfectly acted, it’s a quiet film that leaves a loud, lasting impact.',9),
    (1,1,'Waste of time','A dull and predictable sci-fi thriller. With wooden acting, a terrible script, and boring CGI, it’s a complete waste of time.',1);

--test
SELECT * FROM customer_review;

--Delete a film that has a review from the new_film table, what happens to the customer_review table?

DELETE FROM new_film WHERE id = 1;
--the film will be deleted from the table customer_review too



--Exercice2

--Use UPDATE to change the language of some films. Make sure that you use valid languages.
SELECT * FROM language;
UPDATE film
SET language_id = 5
WHERE film_id IN (1, 2);


--Which foreign keys (references) are defined for the customer table? How does this affect the way in which we INSERT into the customer table?

--store_id and adress_id



--We created a new table called customer_review. Drop this table. Is this an easy step, or does it need extra checking?
DROP TABLE customer_review;
--easy step

--Find out how many rentals are still outstanding (ie. have not been returned to the store yet).

SELECT COUNT(*) 
FROM rental 
WHERE return_date IS NULL;

--Find the 30 most expensive movies which are outstanding (ie. have not been returned to the store yet)

SELECT f.title, f.rental_rate
FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
WHERE r.return_date IS NULL
ORDER BY f.rental_rate DESC
LIMIT 30;

--Your friend is at the store, and decides to rent a movie. He knows he wants to see 4 movies, but he can’t remember their names. Can you help him find which movies he wants to rent?

    --1st film 

SELECT f.title, f.description
FROM film f
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id
WHERE a.first_name = 'Penelope' AND a.last_name = 'Monroe'
AND f.description ILIKE '%sumo wrestler%';

    --2nd film 

SELECT title, length, rating FROM film
WHERE length < 60  AND rating = 'R' AND description ILIKE '%documentary%';

    --3rd film 

SELECT f.title, p.amount, r.return_date FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
JOIN customer c ON r.customer_id = c.customer_id
JOIN payment p ON r.rental_id = p.rental_id
WHERE c.first_name = 'Matthew'  AND c.last_name = 'Mahan' AND p.amount > 4.00
AND r.return_date BETWEEN '2005-07-28' AND '2005-08-01';

    --4th film 

SELECT f.title, f.description, f.replacement_cost FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
JOIN customer c ON r.customer_id = c.customer_id
WHERE c.first_name = 'Matthew'  AND c.last_name = 'Mahan'
AND (f.title ILIKE '%boat%' OR f.description ILIKE '%boat%')
ORDER BY f.replacement_cost DESC
LIMIT 1;