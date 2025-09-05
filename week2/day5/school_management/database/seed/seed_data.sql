-- Insert sample teachers
INSERT INTO teachers (first_name, last_name, email, phone, hire_date, specialty) VALUES
('John', 'Smith', 'john.smith@school.edu', '555-1234', '2018-08-15', 'Mathematics'),
('Emily', 'Johnson', 'emily.johnson@school.edu', '555-5678', '2019-01-20', 'Science'),
('Michael', 'Williams', 'michael.williams@school.edu', '555-9012', '2017-03-10', 'History'),
('Sarah', 'Brown', 'sarah.brown@school.edu', '555-3456', '2020-08-25', 'English'),
('David', 'Jones', 'david.jones@school.edu', '555-7890', '2016-05-12', 'Physical Education'),
('Jennifer', 'Miller', 'jennifer.miller@school.edu', '555-2345', '2018-11-30', 'Art'),
('Robert', 'Davis', 'robert.davis@school.edu', '555-6789', '2019-09-05', 'Music'),
('Lisa', 'Garcia', 'lisa.garcia@school.edu', '555-0123', '2017-12-18', 'Computer Science'),
('Thomas', 'Rodriguez', 'thomas.rodriguez@school.edu', '555-4567', '2020-02-22', 'Foreign Languages'),
('Susan', 'Wilson', 'susan.wilson@school.edu', '555-8901', '2018-06-08', 'Social Studies');

-- Insert sample courses
INSERT INTO courses (title, code, description, credits, teacher_id) VALUES
('Algebra I', 'MATH101', 'Introduction to algebraic concepts and methods', 4, 1),
('Biology', 'SCI201', 'Study of living organisms and their interactions', 4, 2),
('World History', 'HIST301', 'Survey of world history from ancient times to present', 3, 3),
('English Literature', 'ENG401', 'Study of major works in English literature', 3, 4),
('Physical Education', 'PE501', 'Development of physical fitness and sports skills', 2, 5),
('Art Fundamentals', 'ART601', 'Introduction to principles and techniques of art', 3, 6),
('Music Theory', 'MUS701', 'Fundamentals of music notation and composition', 3, 7),
('Computer Programming', 'CS801', 'Introduction to programming concepts', 4, 8),
('Spanish I', 'LANG901', 'Beginning Spanish language course', 3, 9),
('Government', 'SOC1001', 'Study of political systems and governance', 3, 10);

-- Insert sample students
INSERT INTO students (first_name, last_name, email, phone, enrollment_date, major) VALUES
('James', 'Taylor', 'james.taylor@student.school.edu', '555-1111', '2022-08-20', 'Computer Science'),
('Mary', 'Anderson', 'mary.anderson@student.school.edu', '555-2222', '2022-08-20', 'Biology'),
('William', 'Thomas', 'william.thomas@student.school.edu', '555-3333', '2022-08-20', 'Mathematics'),
('Patricia', 'Jackson', 'patricia.jackson@student.school.edu', '555-4444', '2022-08-20', 'English'),
('Christopher', 'White', 'christopher.white@student.school.edu', '555-5555', '2022-08-20', 'History'),
('Linda', 'Harris', 'linda.harris@student.school.edu', '555-6666', '2022-08-20', 'Art'),
('Daniel', 'Martin', 'daniel.martin@student.school.edu', '555-7777', '2022-08-20', 'Music'),
('Barbara', 'Thompson', 'barbara.thompson@student.school.edu', '555-8888', '2022-08-20', 'Physical Education'),
('Paul', 'Garcia', 'paul.garcia@student.school.edu', '555-9999', '2022-08-20', 'Foreign Languages'),
('Jessica', 'Martinez', 'jessica.martinez@student.school.edu', '555-0000', '2022-08-20', 'Social Studies'),
('Mark', 'Robinson', 'mark.robinson@student.school.edu', '555-1212', '2023-01-15', 'Computer Science'),
('Elizabeth', 'Clark', 'elizabeth.clark@student.school.edu', '555-2323', '2023-01-15', 'Biology'),
('Donald', 'Rodriguez', 'donald.rodriguez@student.school.edu', '555-3434', '2023-01-15', 'Mathematics'),
('Jennifer', 'Lewis', 'jennifer.lewis@student.school.edu', '555-4545', '2023-01-15', 'English'),
('George', 'Lee', 'george.lee@student.school.edu', '555-5656', '2023-01-15', 'History');

-- Insert sample enrollments
INSERT INTO enrollments (student_id, course_id, enrollment_date) VALUES
(1, 8, '2023-08-25'), (1, 1, '2023-08-25'), (1, 3, '2023-08-25'),
(2, 2, '2023-08-25'), (2, 5, '2023-08-25'), (2, 10, '2023-08-25'),
(3, 1, '2023-08-25'), (3, 8, '2023-08-25'), (3, 4, '2023-08-25'),
(4, 4, '2023-08-25'), (4, 9, '2023-08-25'), (4, 6, '2023-08-25'),
(5, 3, '2023-08-25'), (5, 10, '2023-08-25'), (5, 7, '2023-08-25'),
(6, 6, '2023-08-25'), (6, 2, '2023-08-25'), (6, 4, '2023-08-25'),
(7, 7, '2023-08-25'), (7, 1, '2023-08-25'), (7, 9, '2023-08-25'),
(8, 5, '2023-08-25'), (8, 8, '2023-08-25'), (8, 3, '2023-08-25'),
(9, 9, '2023-08-25'), (9, 6, '2023-08-25'), (9, 2, '2023-08-25'),
(10, 10, '2023-08-25'), (10, 7, '2023-08-25'), (10, 1, '2023-08-25');

-- Insert sample grades
INSERT INTO grades (student_id, course_id, grade, semester, year) VALUES
(1, 8, 3.8, 'Fall', 2023), (1, 1, 3.5, 'Fall', 2023), (1, 3, 4.0, 'Fall', 2023),
(2, 2, 3.2, 'Fall', 2023), (2, 5, 3.9, 'Fall', 2023), (2, 10, 3.7, 'Fall', 2023),
(3, 1, 3.6, 'Fall', 2023), (3, 8, 3.8, 'Fall', 2023), (3, 4, 3.4, 'Fall', 2023),
(4, 4, 3.9, 'Fall', 2023), (4, 9, 3.1, 'Fall', 2023), (4, 6, 3.7, 'Fall', 2023),
(5, 3, 3.3, 'Fall', 2023), (5, 10, 3.8, 'Fall', 2023), (5, 7, 3.5, 'Fall', 2023);
ALTER TABLE grades 
ALTER COLUMN grade TYPE DECIMAL(4,2) 
USING (grade * 5); -- Convert existing 4.0 scale to 20-point scale

-- Add a check constraint for the new grading scale
ALTER TABLE grades 
ADD CONSTRAINT grade_range_check 
CHECK (grade >= 0 AND grade <= 20);

ALTER TABLE grades DROP CONSTRAINT IF EXISTS grades_grade_check;