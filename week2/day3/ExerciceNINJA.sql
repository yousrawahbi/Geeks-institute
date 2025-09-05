--Ex1

---qst1:Retrieve all films with a rating of G or PG, which are are not currently rented

SELECT f.film_id,f.title,f.rating,f.description,f.length,i.inventory_id,s.store_id,s.address_id
FROM film f
JOIN inventory i ON f.film_id = i.film_id
LEFT JOIN rental r ON i.inventory_id = r.inventory_id
WHERE f.rating IN ('G', 'PG')AND r.rental_id IS NULL  -- This ensures the film is not currently rented
ORDER BY f.title, s.store_id;

---qst1:
