

SELECT first_name, last_name 
FROM customers 
ORDER BY last_name ASC, first_name ASC 
LIMIT 2;

DELETE FROM purchases 
WHERE id_cust = (
    SELECT id_cust FROM customers WHERE first_name = 'Scott' AND last_name = 'Scott'
);

SELECT * FROM customers 
WHERE first_name = 'Scott' AND last_name = 'Scott';

SELECT p.*, c.first_name, c.last_name 
FROM purchases p 
LEFT JOIN customers c ON p.id_cust = c.id_cust;

SELECT p.*, c.first_name, c.last_name 
FROM purchases p 
INNER JOIN customers c ON p.id_cust = c.id_cust;
