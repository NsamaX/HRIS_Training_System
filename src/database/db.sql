CREATE TABLE roles (
  role_id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  permissions JSON
);

CREATE TABLE positions (
  position_id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(15),
    role INT,
    position INT,
    department INT,
    date_joined DATE NOT NULL,
    status ENUM('active', 'inactive', 'terminated'),
    FOREIGN KEY (role) REFERENCES roles(role_id),
    FOREIGN KEY (position) REFERENCES positions(position_id),
    FOREIGN KEY (department) REFERENCES departments(department_id)
);

CREATE TABLE auth (
    user_id INT,
    email VARCHAR(255) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES employees(employee_id)
);

CREATE TABLE training_groups (
    group_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE training_courses (
    course_id INT PRIMARY KEY,
    course_group INT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    instructor INT,
    date_start DATE NOT NULL,
    date_end DATE NOT NULL,
    duration INT NOT NULL,
    status ENUM('planned', 'ongoing', 'completed', 'canceled') NOT NULL,
    FOREIGN KEY (course_group) REFERENCES training_groups(group_id),
    FOREIGN KEY (instructor) REFERENCES employees(employee_id)
);

CREATE TABLE enrollments (
    enrollment_id INT PRIMARY KEY,
    course INT,
    student INT,
    enrollment_date DATE NOT NULL,
    status ENUM('enrolled', 'in-progress', 'completed', 'failed') NOT NULL,
    FOREIGN KEY (course) REFERENCES training_courses(course_id),
    FOREIGN KEY (student) REFERENCES employees(employee_id)
);

CREATE TABLE action_types (
    action_type_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE transactions (
    transaction_id INT PRIMARY KEY,
    action_type INT,
    user INT,
    timestamp DATETIME NOT NULL,
    FOREIGN KEY (action_type) REFERENCES action_types(action_type_id),
    FOREIGN KEY (user) REFERENCES employees(employee_id)
);

CREATE TABLE report_types (
    report_type_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE reports (
    report_id INT PRIMARY KEY,
    report_type INT,
    report_date DATE NOT NULL,
    report_data TEXT,
    FOREIGN KEY (report_type) REFERENCES report_types(report_type_id)
);

CREATE TABLE achievements (
    achievement_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE hall_of_fame (
    employee_id INT,
    achievements INT,
    PRIMARY KEY (employee_id, achievements),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (achievements) REFERENCES achievements(achievement_id)
);
