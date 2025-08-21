--qst1 All items, ordered by price (lowest to highest).
SELECT * FROM items ORDER BY price ASC

--qst2 Items with a price above 80 (80 included), ordered by price (highest to lowest).
SELECT * FROM items WHERE price >=80 ORDER BY price DESC;
ALTER TABLE items
ADD COLUMN id_item SERIAL PRIMARY KEY;
-- qst3 The first 3 customers in alphabetical order of the first name (A-Z) 
exclude the primary key column from the results.
SELECT * exclude id_cust
FROM customers  
ORDER BY first_name LIMIT 3;

--All last names (no other columns!), in reverse alphabetical order (Z-A)

SELECT last_name FROM customers ORDER BY last_name DESC
