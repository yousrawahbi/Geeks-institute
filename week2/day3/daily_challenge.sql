--create two tables
CREATE TABLE Customer (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(45) NOT NULL
);

CREATE TABLE Customer_profile (
  id SERIAL PRIMARY KEY,
  isLoggedIn BOOLEAN DEFAULT false,
  customer_id INTEGER UNIQUE NOT NULL,
  CONSTRAINT fk_customer 
    FOREIGN KEY (customer_id) 
    REFERENCES Customer(id)
);
-- insert customers
INSERT INTO customer(first_name, last_name)
VALUES('John','Doe'),('Jerome','Lalu'),('Lea','Rive');

--Test 
SELECT * FROM customer;
SELECT * FROM customer_profile;

--John is loggedIn
INSERT INTO Customer_profile (isLoggedIn, customer_id)
VALUES (true, (SELECT id FROM Customer WHERE first_name = 'John' AND last_name = 'Doe'));

--Jerome is not logged in
INSERT INTO Customer_profile (isLoggedIn, customer_id)
VALUES (false, (SELECT id FROM Customer WHERE first_name = 'Jerome'AND last_name = 'Lalu'));


---Use the relevant types of Joins to display:

--The first_name of the LoggedIn customers

SELECT first_name FROM customer c
JOIN customer_profile p ON p.customer_id= c.id
WHERE p.isLoggedIn = true;

--All the customers first_name and isLoggedIn columns - even the customers those who don’t have a profile.

SELECT c.first_name, p.isLoggedIn
FROM customer c
LEFT JOIN customer_profile p ON p.customer_id= c.id


--The number of customers that are not LoggedIn

SELECT COUNT(*) FROM customer c
INNER JOIN customer_profile p ON p.customer_id= c.id
WHERE p.isLoggedIn = false;

--TO BE CONTINUED....