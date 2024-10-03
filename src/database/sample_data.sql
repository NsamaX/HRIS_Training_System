INSERT INTO roles (name, description, permissions)
VALUES
(
    'Admin', 
    'System Administrator with full access', 
    '{
        "create": true, 
        "read": true, 
        "update": true,
         "delete": true
    }'
),
(
    'Manager', 
    'Design and plan courses for developing personnel in organizations', 
    '{
        "create": true, 
        "read": true, 
        "update": true,  
        "delete": false
    }'
),
(
    'Employee', 
    'Standard employee with limited access', 
    '{
        "create": false, 
        "read": true, 
        "update": true, 
        "delete": false
    }'
);

INSERT INTO positions (name, description)
VALUES
(
    'Project Manager', 
    'Oversees project execution and team coordination'
),
(
    'HR Manager', 
    'Manages human resources and employee relations'
),
(
    'Software Developer', 
    'Develops and maintains software applications'
),
(
    'Data Analyst', 
    'Analyzes and interprets complex data to assist in decision-making'
);

INSERT INTO departments (name, description)
VALUES
(
    'Project Management Office', 
    'Oversees project execution, team coordination, and ensures project delivery on time'
),
(
    'Human Resources', 
    'Manages employee recruitment, employee relations, and welfare'
),
(
    'IT Department', 
    'Handles all tech-related tasks, software development, data analysis, and support'
);

INSERT INTO employees (first_name, last_name, email, role_id, position_id, department_id, date_joined, status)
VALUES
(
    'John', 
    'Doe', 
    'john.doe@example.com', 
    1, 
    1, 
    1, 
    '2023-01-15', 
    'active'
),
(
    'Jane', 
    'Smith', 
    'jane.smith@example.com', 
    2, 
    2, 
    2, 
    '2022-07-20', 
    'active'
),
(
    'Alice', 
    'Johnson', 
    'alice.johnson@example.com', 
    3, 
    3, 
    3, 
    '2023-05-10', 
    'inactive'
),
(
    'Bob', 
    'Williams', 
    'bob.williams@example.com', 
    3, 
    4, 
    3, 
    '2021-09-05', 
    'terminated'
);

INSERT INTO auth (user_id, email, hashed_password)
VALUES
(
    1, 
    'john.doe@example.com', 
    '$2a$12$eEXAMPLEofHASHEDpassWORDexampleEXAMPLEHASHEDpass'
),
(
    2, 
    'jane.smith@example.com', 
    '$2a$12$eEXAMPLEofHASHEDpassWORDexampleEXAMPLEHASHEDpass'
),
(
    3, 
    'alice.johnson@example.com', 
    '$2a$12$eEXAMPLEofHASHEDpassWORDexampleEXAMPLEHASHEDpass'
),
(
    4, 
    'bob.williams@example.com', 
    '$2a$12$eEXAMPLEofHASHEDpassWORDexampleEXAMPLEHASHEDpass'
);

INSERT INTO training_groups (name, description)
VALUES
(
    'Leadership Skills', 
    'Courses focused on developing leadership abilities'
),
(
    'Technical Skills', 
    'Courses for improving technical knowledge and expertise'
),
(
    'Communication Skills', 
    'Courses to enhance communication in the workplace'
),
(
    'Time Management', 
    'Courses designed to improve efficiency and productivity through effective time management'
),
(
    'Project Management', 
    'Courses that cover project planning, execution, and delivery techniques'
);

INSERT INTO training_courses (course_group_id, name, description, platform, instructor_id, date_start, date_end, duration, status, rating)
VALUES
(
    1, 
    'Leadership 101', 
    'Introductory course on leadership principles', 
    'Onsite: Building Leadership',
    1, 
    '2024-01-10', 
    '2024-01-15', 
    5, 
    'planned',
    null
),
(
    2, 
    'Advanced Java Programming', 
    'Deep dive into Java for advanced users', 
    'Online: Udemy',
    1, 
    '2024-02-01', 
    '2024-02-10', 
    10, 
    'ongoing',
    '{
        "score": 4.39,
        "star": {
            "5": 60,
            "4": 25,
            "3": 10,
            "2": 4,
            "1": 1
        }
    }'
),
(
    2, 
    'Effective Communication', 
    'Improve communication skills in a professional setting', 
    'Zoom: xxx xxx xxxx',
    2, 
    '2024-03-05', 
    '2024-03-10', 
    5, 
    'planned',
    null
),
(
    1, 
    'Team Leadership Essentials', 
    'Focus on building effective team leadership skills', 
    'Zoom: xxx xxx xxxx',
    1, 
    '2024-04-01', 
    '2024-04-05', 
    5, 
    'planned',
    null
),
(
    2, 
    'Data Analysis with Python', 
    'Learn data analysis techniques using Python programming', 
    'Online: Udemy',
    3, 
    '2024-05-01', 
    '2024-05-15', 
    15, 
    'planned',
    null
);

INSERT INTO enrollments (course_id, user_enrolled_id, student_id, enrollment_date, status, rating)
VALUES
(
    1, 
    1,
    1, 
    '2024-01-05', 
    'completed',
    5
),
(
    2, 
    1,
    2, 
    '2024-01-30', 
    'in-progress',
    null
),
(
    3, 
    2,
    3, 
    '2024-02-25', 
    'enrolled',
    null
),
(
    3, 
    2,
    4, 
    '2024-02-25', 
    'enrolled',
    null
);

INSERT INTO action_types (name, description)
VALUES
(
    'Login', 
    'User logged into the system'
),
(
    'Logout', 
    'User logged out from the system'
),
(
    'Data Update', 
    'User updated a data record'
),
(
    'Training Enrollment', 
    'User enrolled in a training course'
),
(
    'Recent Courses', 
    'Report on the most recently completed courses by employees'
);

INSERT INTO transactions (action_type_id, user_id, description, timestamp)
VALUES
(1, 1, NULL, '2024-01-10 08:30:00'),
(2, 1, NULL, '2024-01-10 17:00:00'),
(3, 2, NULL, '2024-01-15 10:45:00'),
(4, 3, NULL, '2024-02-01 09:00:00'),
(5, 1, '{"course": 1}', '2024-02-01 10:23:00');

INSERT INTO report_types (name, description)
VALUES
(
    'Employee Performance', 
    'Report on employee performance evaluations'
),
(
    'Training Summary', 
    'Summary report of training courses and enrollments'
),
(
    'System Usage', 
    'Detailed report on system usage activities'
);

INSERT INTO reports (report_type_id, report_date, report_data)
VALUES
(
    1, 
    '2024-01-31', 
    'Performance evaluations for all employees in Q1 2024'
),
(
    2, 
    '2024-02-15', 
    'Summary of training courses conducted in January 2024'
),
(
    3, 
    '2024-03-01', 
    'Detailed system usage report for February 2024'
);

INSERT INTO achievements (name, description)
VALUES
(
    'Employee of the Month', 
    'Awarded to the best-performing employee of the month'
),
(
    'Outstanding Leadership', 
    'Recognizes exceptional leadership skills demonstrated by an employee'
),
(
    'Perfect Attendance', 
    'Awarded to employees with no absences for the year'
),
(
    'Innovation Award', 
    'Recognizes creative solutions implemented by an employee'
);

INSERT INTO hall_of_fame (employee_id, achievement_id)
VALUES
(1, 1),
(2, 2),
(3, 3),
(1, 4); 
