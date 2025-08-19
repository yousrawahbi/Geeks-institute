CREATE TABLE customers(
first_name VARCHAR(50),last_name VARCHAR(50)
);
CREATE TABLE items(
item VARCHAR(50),price VARCHAR(50)
);

INSERT INTO  items (item,price)
VALUES ('Small Desk','100'),('Large desk','300'),('Fan','80');

UPDATE customers (first_name , last_name )
VALUES ('Greg','Jones') ,('Sandra','Jones'),('Scott','Scott'),('Trevor','Green') ,('Melanie','Johnson') ;

--All the items with a price above 80 (80 not included).

SELECT items from public WHERE price>80

--All the items with a price below 300. (300 included)

SELECT items from public WHERE price<300

--All customers whose last name is ‘Smith’ (What will be your outcome?)

SELECT items from public WHERE last_name=='Smith'
--All customers whose last name is ‘Jones’.

SELECT items from public WHERE 

--All customers whose firstname is not ‘Scott’.
SELECT items from public WHERE 



