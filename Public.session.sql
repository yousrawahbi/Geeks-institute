CREATE TABLE customers(
first_name VARCHAR(50),last_name VARCHAR(50)
);
CREATE TABLE items(
item VARCHAR(50), price INTEGER
);

INSERT INTO  items (item,price)
VALUES ('Small Desk',100),('Large desk',300),('Fan',80);

INSERT INTO customers (first_name,last_name)
VALUES ('Greg','Jones'),('Sandra','Jones'),('Scott','Scott'),('Trevor','Green'),('Melanie','Johnson') ;

--All the items with a price above 80 (80 not included).

SELECT item,price from items WHERE price>80

--All the items with a price below 300. (300 included)

SELECT item,price from items WHERE price<300

--All customers whose last name is ‘Smith’ (What will be your outcome?)

SELECT first_name, last_name from customers WHERE last_name='Smith'
--All customers whose last name is ‘Jones’.

SELECT first_name, last_name from customers WHERE last_name='Jones'

--All customers whose firstname is not ‘Scott’.
SELECT first_name, last_name from customers WHERE first_name!='Scott'

SELECT * FROM items
SELECT * FROM customers
ALTER TABLE items ADD COLUMN cu_id SERIAL PRIMARY KEY ;

DELETE FROM customers
WHERE id_cust IN (6,7,8,9,10)