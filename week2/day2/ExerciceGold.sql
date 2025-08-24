--EXERCICE1

---qs1 
SELECT rating, COUNT(*) AS number_of_films
FROM film
GROUP BY rating
ORDER BY number_of_films DESC;

---qst2

SELECT film_id, title, rating, length, rental_rate
FROM film
WHERE rating IN ('G', 'PG-13')
    AND length < 120
    AND rental_rate < 3.00
ORDER BY title ;

---qst3

UPDATE customer 
SET 
    first_name = 'YourFirstName',
    last_name = 'YourLastName',
    email = 'your_email@example.com',
    active = true,
    last_update = CURRENT_TIMESTAMP
WHERE customer_id = 1;

---EXERCICE3
--qst1 Create a table named purchases

CREATE TABLE purchases(
 id SERIAL PRIMARY KEY,
 id_cust INTEGER NOT NULL,
 item_id INTEGER NOT NULL,
 quantity_purchased INTEGER NOT NULL
)

--qst2 insert purchases for the customers
--Scott Scott bought one fan

INSERT INTO purchases (id_cust, id_item, quantity_purchased)
VALUES (
    (SELECT id_cust FROM customers WHERE first_name = 'Scott' AND last_name = 'Scott'),
    (SELECT id_item FROM items WHERE item = 'Fan'),
    1
);

--Melanie Johnson bought ten large desks

INSERT INTO purchases (id_cust, id_item, quantity_purchased)
VALUES (
    (SELECT id_cust FROM customers WHERE first_name= 'Melanie' AND last_name='Johnson'),
    (SELECT id_item FROM items WHERE item= 'Large desk'),
    10
);

--Greg Jones bougth two small desks

INSERT INTO purchases (id_cust, id_item, quantity_purchased)
VALUES (
    (SELECT id_cust FROM customers WHERE first_name= 'Greg' AND last_name='Jones'),
    (SELECT id_item FROM items WHERE item= 'Small Desk'),
    2
);
--Test
SELECT * FROM purchases;

----qst2 Use SQL to get the following from the database:
---1
--All purchases. Is this information useful to us?

SELECT * FROM purchases;
--those informations are not useful enough, we need informations of the customers


--All purchases, joining with the customers table.
SELECT p.id, p.id_item, c.first_name, c.last_name,p.quantity_purchased
FROM purchases p
JOIN customers c ON  p.id_cust=c.id_cust


--Purchases of the customer with the ID equal to 5.

SELECT * FROM purchases
WHERE id_cust= '5';

--Purchases for a large desk AND a small desk

SELECT p.id,s.item, s.price, c.first_name, c.last_name,p.quantity_purchased
FROM purchases p
JOIN customers c ON  p.id_cust=c.id_cust
JOIN items s ON  s.id_item=p.id_item
WHERE item= 'Large desk' OR item= 'Small Desk'


