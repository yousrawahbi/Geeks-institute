---Create
--Create a database called bootcamp.

CREATE DATABASE bootcamp

--Create a table called students.
--Add the following columns:id, last_name, first_name, birth_date
CREATE TABLE students(
 id SERIAL PRIMARY KEY,
 last_name VARCHAR (20) NOT NULL,
 first_name VARCHAR (20) NOT NULL,
 birth_date DATE NOT NULL
)

--Insert the data seen above to the students table. Find the most efficient way to insert the data.
INSERT INTO students (first_name, last_name, birth_date) VALUES
('Marc', 'Benichou', '02/11/1998'),
('Yoan', 'Cohen', '03/12/2010'),
('Lea', 'Benichou', '27/07/1987'),
('Amelia', 'Dux', '07/04/1996'),
('David', 'Grez', '14/06/2003'),
('Omer', 'Simpson', '03/10/1980');

--Insert your last_name, first_name and birth_date to the students table (Take a look at the id given).
INSERT INTO students (first_name, last_name, birth_date) VALUES
('Yousra', 'Wahbi', '24/11/1994')
RETURNING id;

---Select
--Fetch all of the data from the table.

SELECT * FROM students

--Fetch all of the students first_names and last_names.

SELECT first_name, last_name FROM students;

--Fetch the student which id is equal to 2.

SELECT first_name, last_name FROM students
WHERE id=2

--Fetch the student whose last_name is Benichou AND first_name is Marc.

SELECT first_name, last_name FROM students
WHERE last_name='Benichou' AND first_name='Marc'

--Fetch the students whose last_names are Benichou OR first_names are Marc.

SELECT first_name, last_name FROM students
WHERE last_name='Benichou' OR first_name='Marc'

--Fetch the students whose first_names contain the letter a.

SELECT first_name, last_name FROM students
WHERE  first_name ILIKE '%a%'

--Fetch the students whose first_names start with the letter a.

SELECT first_name, last_name FROM students
WHERE  first_name ILIKE 'a%'

--Fetch the students whose first_names end with the letter a.

SELECT first_name, last_name FROM students
WHERE  first_name LIKE '%a'

--Fetch the students whose second to last letter of their first_names are a (Example: Leah).

SELECT first_name, last_name FROM students
WHERE  first_name LIKE '%a%'

--Fetch the students whose id’s are equal to 1 AND 3 .

SELECT first_name, last_name FROM students
WHERE  id=1 OR id=3

--Fetch the students whose birth_dates are equal to or come after 1/01/2000. (show all their info

SELECT * FROM students
WHERE birth_date>'2000/01/01'
