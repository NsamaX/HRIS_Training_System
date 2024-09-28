INSERT INTO roles (name, description, permissions)
VALUES
('Admin', 'System Administrator with full access', '{"create": true, "read": true, "update": true, "delete": true}'),
('Manager', 'Manages departments and employees', '{"create": true, "read": true, "update": true, "delete": false}'),
('Employee', 'Standard employee with limited access', '{"create": false, "read": true, "update": false, "delete": false}');

INSERT INTO positions (name, description)
VALUES
('Software Developer', 'Develops and maintains software applications'),
('HR Manager', 'Manages human resources and employee relations'),
('Project Manager', 'Oversees project execution and team coordination');

INSERT INTO departments (name, description)
VALUES
('IT Department', 'Handles all tech-related tasks and support'),
('Human Resources', 'Manages employee recruitment and welfare'),
('Sales Department', 'Responsible for sales and customer relationships');

INSERT INTO employees (first_name, last_name, email, role, position, department, date_joined, status)
VALUES
('John', 'Doe', 'john.doe@example.com', 1, 1, 1, '2023-01-15', 'active'),
('Jane', 'Smith', 'jane.smith@example.com', 2, 2, 2, '2022-07-20', 'active'),
('Alice', 'Johnson', 'alice.johnson@example.com', 3, 3, 3, '2023-05-10', 'inactive'),
('Bob', 'Williams', 'bob.williams@example.com', 3, 1, 2, '2021-09-05', 'terminated');

INSERT INTO auth (user_id, email, hashed_password)
VALUES
(1, 'john.doe@example.com', '$2a$12$eEXAMPLEofHASHEDpassWORDexampleEXAMPLEHASHEDpass'),
(2, 'jane.smith@example.com', '$2a$12$eEXAMPLEofHASHEDpassWORDexampleEXAMPLEHASHEDpass'),
(3, 'alice.johnson@example.com', '$2a$12$eEXAMPLEofHASHEDpassWORDexampleEXAMPLEHASHEDpass'),
(4, 'bob.williams@example.com', '$2a$12$eEXAMPLEofHASHEDpassWORDexampleEXAMPLEHASHEDpass');

INSERT INTO training_groups (name, description)
VALUES
('Leadership Skills', 'Courses focused on developing leadership abilities'),
('Technical Skills', 'Courses for improving technical knowledge and expertise'),
('Communication Skills', 'Courses to enhance communication in the workplace');

INSERT INTO training_courses (course_group, name, description, instructor, date_start, date_end, duration, status)
VALUES
(1, 'Leadership 101', 'Introductory course on leadership principles', 1, '2024-01-10', '2024-01-15', 5, 'planned'),
(2, 'Advanced Java Programming', 'Deep dive into Java for advanced users', 1, '2024-02-01', '2024-02-10', 10, 'ongoing'),
(3, 'Effective Communication', 'Improve communication skills in a professional setting', 2, '2024-03-05', '2024-03-10', 5, 'planned');

INSERT INTO enrollments (course, student, enrollment_date, status)
VALUES
(1, 1, '2024-01-05', 'enrolled'),
(2, 2, '2024-01-30', 'in-progress'),
(3, 3, '2024-02-25', 'enrolled'),
(3, 4, '2024-02-25', 'enrolled');

INSERT INTO action_types (name, description)
VALUES
('Login', 'User logged into the system'),
('Logout', 'User logged out from the system'),
('Data Update', 'User updated a data record'),
('Training Enrollment', 'User enrolled in a training course');

INSERT INTO transactions (action_type, user, timestamp)
VALUES
(1, 1, '2024-01-10 08:30:00'),
(2, 1, '2024-01-10 17:00:00'),
(3, 2, '2024-01-15 10:45:00'),
(4, 3, '2024-02-01 09:00:00');

INSERT INTO report_types (name, description)
VALUES
('Employee Performance', 'Report on employee performance evaluations'),
('Training Summary', 'Summary report of training courses and enrollments'),
('System Usage', 'Detailed report on system usage activities');

INSERT INTO reports (report_type, report_date, report_data)
VALUES
(1, '2024-01-31', 'Performance evaluations for all employees in Q1 2024'),
(2, '2024-02-15', 'Summary of training courses conducted in January 2024'),
(3, '2024-03-01', 'Detailed system usage report for February 2024');

INSERT INTO achievements (name, description)
VALUES
('Employee of the Month', 'Awarded to the best-performing employee of the month'),
('Outstanding Leadership', 'Recognizes exceptional leadership skills demonstrated by an employee'),
('Perfect Attendance', 'Awarded to employees with no absences for the year'),
('Innovation Award', 'Recognizes creative solutions implemented by an employee');

INSERT INTO hall_of_fame (employee_id, achievements)
VALUES
(1, 1),
(2, 2),
(3, 3),
(1, 4); 
