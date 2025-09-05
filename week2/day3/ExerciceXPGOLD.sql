--Exercice1

---qst1:Get a list of all rentals which are out (have not been returned).
--How do we identify these films in the database?
SELECT * 
FROM rental 
WHERE return_date IS NULL;

---qst2:Get a list of all customers who have not returned their rentals. Make sure to group your results.
SELECT c.customer_id, c.first_name, c.last_name, COUNT(r.rental_id) as outstanding_rentals
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
WHERE r.return_date IS NULL
GROUP BY c.customer_id, c.first_name, c.last_name
ORDER BY outstanding_rentals DESC;

---qst3:Get a list of all the Action films with Joe Swank.
SELECT f.film_id, f.title, f.description
FROM film f
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category cat ON fc.category_id = cat.category_id
WHERE a.first_name = 'JOE' 
  AND a.last_name = 'SWANK'
  AND cat.name = 'Action';


  --a view

CREATE VIEW film_details AS
SELECT f.*, a.first_name, a.last_name, cat.name as category_name
FROM film f
LEFT JOIN film_actor fa ON f.film_id = fa.film_id
LEFT JOIN actor a ON fa.actor_id = a.actor_id
LEFT JOIN film_category fc ON f.film_id = fc.film_id
LEFT JOIN category cat ON fc.category_id = cat.category_id;

--Exercice2

---qst1:
SELECT s.store_id, c.city, co.country
FROM store s
JOIN address a ON s.address_id = a.address_id
JOIN city c ON a.city_id = c.city_id
JOIN country co ON c.country_id = co.country_id;

---qst2:
SELECT s.store_id, 
       SUM(f.length) as total_minutes,
       ROUND(SUM(f.length) / 60, 2) as total_hours
FROM store s
JOIN inventory i ON s.store_id = i.store_id
JOIN film f ON i.film_id = f.film_id
WHERE i.inventory_id NOT IN (
    SELECT inventory_id 
    FROM rental 
    WHERE return_date IS NULL
)
GROUP BY s.store_id;

---qst3:


---qst4:


---qst5:


---qst6:


---qst7:
--Exercice1

---qst1:Get a list of all rentals which are out (have not been returned).
--How do we identify these films in the database?
SELECT * 
FROM rental 
WHERE return_date IS NULL;

---qst2:Get a list of all customers who have not returned their rentals. Make sure to group your results.
SELECT c.customer_id, c.first_name, c.last_name, COUNT(r.rental_id) as outstanding_rentals
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
WHERE r.return_date IS NULL
GROUP BY c.customer_id, c.first_name, c.last_name
ORDER BY outstanding_rentals DESC;

---qst3:Get a list of all the Action films with Joe Swank.
SELECT f.film_id, f.title, f.description
FROM film f
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category cat ON fc.category_id = cat.category_id
WHERE a.first_name = 'JOE' 
  AND a.last_name = 'SWANK'
  AND cat.name = 'Action';


  --a view

CREATE VIEW film_details AS
SELECT f.*, a.first_name, a.last_name, cat.name as category_name
FROM film f
LEFT JOIN film_actor fa ON f.film_id = fa.film_id
LEFT JOIN actor a ON fa.actor_id = a.actor_id
LEFT JOIN film_category fc ON f.film_id = fc.film_id
LEFT JOIN category cat ON fc.category_id = cat.category_id;

--Exercice2

---qst1:
SELECT s.store_id, c.city, co.country
FROM store s
JOIN address a ON s.address_id = a.address_id
JOIN city c ON a.city_id = c.city_id
JOIN country co ON c.country_id = co.country_id;

---qst2:
SELECT s.store_id, 
       SUM(f.length) as total_minutes,
       ROUND(SUM(f.length) / 60, 2) as total_hours
FROM store s
JOIN inventory i ON s.store_id = i.store_id
JOIN film f ON i.film_id = f.film_id
WHERE i.inventory_id NOT IN (
    SELECT inventory_id 
    FROM rental 
    WHERE return_date IS NULL
)
GROUP BY s.store_id;

---qst3:


---qst4:


---qst5:


---qst6:


---qst7: