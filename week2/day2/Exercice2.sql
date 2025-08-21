--qst1 In the dvdrental database write a query to select all the columns from the “customer” table.
SELECT * FROM customer

--qst2 Write a query to display the names (first_name, last_name) using an alias named “full_name”
 SELECT (first_name, last_name)  as full_name FROM customer;

--qs3 Lets get all the dates that accounts were created. Write a query to select all the create_date from the “customer” table (there should be no duplicates).
SELECT DISTINCT create_date FROM customer;

--qst4 Write a query to get all the customer details from the customer table, it should be displayed in descending order by their first name.
SELECT * FROM customer ORDER BY first_name DESC;

--qst5 Write a query to get the film ID, title, description, year of release and rental rate in ascending order according to their rental rate.
SELECT film_id, title, description, release_year , rental_rate
FROM film
ORDER BY rental_rate ASC;

--qst6 Write a query to get the address, and the phone number of all customers living in the Texas district, these details can be found in the “address” table.
SELECT a.address, a.phone FROM address a
JOIN customer c ON a.address_id=c.address_id
WHERE a.district = 'Texas';


--qst7 Write a query to retrieve all movie details where the movie id is either 15 or 150.
SELECT * FRom film WHERE film_id IN (15,150);

--qst8 Write a query which should check if your favorite movie exists in the database. Have your query get the film ID, title, description, length and the rental rate, these details can be found in the “film” table.
 SELECT 
    film_id, title, description, length, rental_rate
FROM 
    film
WHERE 
    title='Me before you';

--qst9 No luck finding your movie? Maybe you made a mistake spelling the name. Write a query to get the film ID, title, description, length and the rental rate of all the movies starting with the two first letters of your favorite movie.
SELECT 
    film_id, title, description, length, rental_rate
FROM 
    film
WHERE 
    title ILIKE 'me%';

--qst10 Write a query which will find the 10 cheapest movies.
SELECT film_id, title, description, rental_rate, length
FROM film
ORDER BY rental_rate ASC LIMIT 10;

--qst11 Not satisfied with the results. Write a query which will find the next 10 cheapest movies.
--Bonus: Try to not use LIMIT.

SELECT film_id,title,description,rental_rate,length
FROM film
ORDER BY rental_rate ASC
LIMIT 10 OFFSET 10;

--qst12 Write a query which will join the data in the customer table and the payment table. You want to get the first name and last name from the curstomer table, as well as the amount and the date of every payment made by a customer, ordered by their id (from 1 to…).
SELECT c.customer_id, c.first_name, c.last_name,p.amount, p.payment_date
FROM customer c 
JOIN payment p ON  p.customer_id=c.customer_id
ORDER BY customer_id ASC


--qst13 You need to check your inventory. Write a query to get all the movies which are not in inventory.
SELECT f.film_id, f.title
FROM film f 
LEFT JOIN inventory i ON  f.film_id=i.film_id
WHERE film_id is NULL

--qst14 Write a query to find which city is in which country.


--qst15 Bonus You want to be able to see how your sellers have been doing? Write a query to get the customer’s id, names (first and last), the amount and the date of payment ordered by the id of the staff member who sold them the dvd.
