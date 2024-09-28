// เพิ่ม document ลงใน collection
db.positions.insertMany([
    { position_id: 1, name: "Software Engineer", description: "Develops, tests, and maintains software applications." },
    { position_id: 2, name: "Frontend Developer", description: "Specializes in building the user interface of applications using HTML, CSS, and JavaScript frameworks." },
    { position_id: 3, name: "Backend Developer", description: "Works on server-side logic, databases, and APIs." },
    { position_id: 4, name: "Full Stack Developer", description: "Handles both frontend and backend development." },
    { position_id: 5, name: "DevOps Engineer", description: "Focuses on automating software development and deployment processes." },
    { position_id: 6, name: "QA Engineer", description: "Responsible for testing software applications to ensure quality." },
    { position_id: 7, name: "Data Scientist", description: "Analyzes complex data to help organizations make informed decisions." },
    { position_id: 8, name: "Systems Analyst", description: "Evaluates and improves IT systems to meet business needs." },
    { position_id: 9, name: "Cybersecurity Analyst", description: "Protects computer systems and networks from security breaches." },
    { position_id: 10, name: "Cloud Solutions Architect", description: "Designs and manages cloud-based solutions." }
  ]);

  db.departments.insertMany([
    { department_id: 1, name: "Development", description: "Focuses on creating, testing, and maintaining software applications." },
    { department_id: 2, name: "Quality Assurance", description: "Ensures the quality of software products through systematic testing." },
    { department_id: 3, name: "IT Operations", description: "Manages the organization's IT infrastructure and ensures smooth operations." },
    { department_id: 4, name: "Data Science and Analytics", description: "Analyzes data to derive insights and support data-driven decisions." },
    { department_id: 5, name: "Cybersecurity", description: "Protects the organization’s data and systems from cyber threats." },
    { department_id: 6, name: "Product Management", description: "Defines product vision, strategy, and collaborates with other departments." }
  ]);
  
  db.employees.insertMany([
    {
      employee_id: 1,
      first_name: "Alice",
      last_name: "Smith",
      email: "alice.smith@example.com",
      phone_number: "123-456-7890",
      role: ObjectId("role_id_for_developer"), // Replace with actual ObjectId for Developer role
      position: ObjectId("position_id_for_backend_dev"), // Replace with actual ObjectId for Backend Developer position
      department: ObjectId("department_id_for_development"), // Replace with actual ObjectId for Development department
      date_joined: new Date("2023-01-15"),
      status: "active"
    },
    {
      employee_id: 2,
      first_name: "Bob",
      last_name: "Johnson",
      email: "bob.johnson@example.com",
      phone_number: "234-567-8901",
      role: ObjectId("role_id_for_qa"), // Replace with actual ObjectId for QA role
      position: ObjectId("position_id_for_qa_engineer"), // Replace with actual ObjectId for QA Engineer position
      department: ObjectId("department_id_for_quality_assurance"), // Replace with actual ObjectId for QA department
      date_joined: new Date("2022-03-10"),
      status: "active"
    },
    {
      employee_id: 3,
      first_name: "Charlie",
      last_name: "Brown",
      email: "charlie.brown@example.com",
      phone_number: "345-678-9012",
      role: ObjectId("role_id_for_operations"), // Replace with actual ObjectId for IT Operations role
      position: ObjectId("position_id_for_system_admin"), // Replace with actual ObjectId for System Administrator position
      department: ObjectId("department_id_for_it_operations"), // Replace with actual ObjectId for IT Operations department
      date_joined: new Date("2021-06-25"),
      status: "active"
    },
    {
      employee_id: 4,
      first_name: "David",
      last_name: "Wilson",
      email: "david.wilson@example.com",
      phone_number: "456-789-0123",
      role: ObjectId("role_id_for_data_science"), // Replace with actual ObjectId for Data Science role
      position: ObjectId("position_id_for_data_scientist"), // Replace with actual ObjectId for Data Scientist position
      department: ObjectId("department_id_for_data_science"), // Replace with actual ObjectId for Data Science department
      date_joined: new Date("2021-09-01"),
      status: "active"
    },
    {
      employee_id: 5,
      first_name: "Eve",
      last_name: "Davis",
      email: "eve.davis@example.com",
      phone_number: "567-890-1234",
      role: ObjectId("role_id_for_cybersecurity"), // Replace with actual ObjectId for Cybersecurity role
      position: ObjectId("position_id_for_security_analyst"), // Replace with actual ObjectId for Security Analyst position
      department: ObjectId("department_id_for_cybersecurity"), // Replace with actual ObjectId for Cybersecurity department
      date_joined: new Date("2020-11-18"),
      status: "active"
    },
    {
      employee_id: 6,
      first_name: "Frank",
      last_name: "Miller",
      email: "frank.miller@example.com",
      phone_number: "678-901-2345",
      role: ObjectId("role_id_for_product_management"), // Replace with actual ObjectId for Product Management role
      position: ObjectId("position_id_for_product_manager"), // Replace with actual ObjectId for Product Manager position
      department: ObjectId("department_id_for_product_management"), // Replace with actual ObjectId for Product Management department
      date_joined: new Date("2019-04-22"),
      status: "active"
    },
    {
      employee_id: 7,
      first_name: "Grace",
      last_name: "Taylor",
      email: "grace.taylor@example.com",
      phone_number: "789-012-3456",
      role: ObjectId("role_id_for_frontend_dev"), // Replace with actual ObjectId for Frontend Developer role
      position: ObjectId("position_id_for_frontend_developer"), // Replace with actual ObjectId for Frontend Developer position
      department: ObjectId("department_id_for_development"), // Replace with actual ObjectId for Development department
      date_joined: new Date("2022-08-15"),
      status: "active"
    },
    {
      employee_id: 8,
      first_name: "Hannah",
      last_name: "Anderson",
      email: "hannah.anderson@example.com",
      phone_number: "890-123-4567",
      role: ObjectId("role_id_for_backend_dev"), // Replace with actual ObjectId for Backend Developer role
      position: ObjectId("position_id_for_backend_developer"), // Replace with actual ObjectId for Backend Developer position
      department: ObjectId("department_id_for_development"), // Replace with actual ObjectId for Development department
      date_joined: new Date("2023-07-20"),
      status: "active"
    }
  ]);
  
  db.auth.insertMany([
    {
      user_id: ObjectId("employee_id_for_alice"), // Replace with actual ObjectId for Alice
      email: "alice.smith@example.com",
      hashed_password: "hashed_password_for_alice" // Replace with actual hashed password
    },
    {
      user_id: ObjectId("employee_id_for_bob"), // Replace with actual ObjectId for Bob
      email: "bob.johnson@example.com",
      hashed_password: "hashed_password_for_bob" // Replace with actual hashed password
    },
    {
      user_id: ObjectId("employee_id_for_charlie"), // Replace with actual ObjectId for Charlie
      email: "charlie.brown@example.com",
      hashed_password: "hashed_password_for_charlie" // Replace with actual hashed password
    },
    {
      user_id: ObjectId("employee_id_for_david"), // Replace with actual ObjectId for David
      email: "david.wilson@example.com",
      hashed_password: "hashed_password_for_david" // Replace with actual hashed password
    },
    {
      user_id: ObjectId("employee_id_for_eve"), // Replace with actual ObjectId for Eve
      email: "eve.davis@example.com",
      hashed_password: "hashed_password_for_eve" // Replace with actual hashed password
    },
    {
      user_id: ObjectId("employee_id_for_frank"), // Replace with actual ObjectId for Frank
      email: "frank.miller@example.com",
      hashed_password: "hashed_password_for_frank" // Replace with actual hashed password
    },
    {
      user_id: ObjectId("employee_id_for_grace"), // Replace with actual ObjectId for Grace
      email: "grace.taylor@example.com",
      hashed_password: "hashed_password_for_grace" // Replace with actual hashed password
    },
    {
      user_id: ObjectId("employee_id_for_hannah"), // Replace with actual ObjectId for Hannah
      email: "hannah.anderson@example.com",
      hashed_password: "hashed_password_for_hannah" // Replace with actual hashed password
    }
  ]);

  db.training_groups.insertMany([
    {
      group_id: 1,
      name: "Frontend Development",
      description: "Group focused on frontend technologies such as HTML, CSS, and JavaScript."
    },
    {
      group_id: 2,
      name: "Backend Development",
      description: "Group dedicated to backend programming languages like Java, Python, and Node.js."
    },
    {
      group_id: 3,
      name: "Data Science",
      description: "Group exploring data analysis, machine learning, and big data technologies."
    },
    {
      group_id: 4,
      name: "DevOps Practices",
      description: "Group covering DevOps methodologies, CI/CD pipelines, and cloud technologies."
    }
  ]);

  db.training_courses.insertMany([
    {
      course_id: 1,
      name: "Introduction to HTML",
      description: "Learn the basics of HTML and how to create web pages.",
      course_group: ObjectId("group_id_for_frontend_development"), // Replace with actual ObjectId for the group
      instructor: ObjectId("employee_id_for_john"), // Replace with actual ObjectId for the instructor
      status: "planned",
      date_start: ISODate("2024-10-01"),
      date_end: ISODate("2024-10-30")
    },
    {
      course_id: 2,
      name: "CSS Fundamentals",
      description: "An introductory course on styling web pages with CSS.",
      course_group: ObjectId("group_id_for_frontend_development"),
      instructor: ObjectId("employee_id_for_jane"),
      status: "ongoing",
      date_start: ISODate("2024-09-15"),
      date_end: ISODate("2024-10-15")
    },
    {
      course_id: 3,
      name: "JavaScript Essentials",
      description: "Get started with JavaScript and learn how to make interactive web applications.",
      course_group: ObjectId("group_id_for_frontend_development"),
      instructor: ObjectId("employee_id_for_alice"),
      status: "completed",
      date_start: ISODate("2024-08-01"),
      date_end: ISODate("2024-08-30")
    },
    {
      course_id: 4,
      name: "Introduction to Java",
      description: "Learn the fundamentals of Java programming.",
      course_group: ObjectId("group_id_for_backend_development"),
      instructor: ObjectId("employee_id_for_bob"),
      status: "planned",
      date_start: ISODate("2024-11-01"),
      date_end: ISODate("2024-11-30")
    },
    {
      course_id: 5,
      name: "Python for Data Analysis",
      description: "An overview of Python programming for data analysis and visualization.",
      course_group: ObjectId("group_id_for_data_science"),
      instructor: ObjectId("employee_id_for_charlie"),
      status: "ongoing",
      date_start: ISODate("2024-09-10"),
      date_end: ISODate("2024-10-10")
    },
    {
      course_id: 6,
      name: "Node.js Basics",
      description: "Learn to build backend applications using Node.js.",
      course_group: ObjectId("group_id_for_backend_development"),
      instructor: ObjectId("employee_id_for_david"),
      status: "completed",
      date_start: ISODate("2024-07-01"),
      date_end: ISODate("2024-07-31")
    },
    {
      course_id: 7,
      name: "Machine Learning with Python",
      description: "An introduction to machine learning concepts and Python libraries.",
      course_group: ObjectId("group_id_for_data_science"),
      instructor: ObjectId("employee_id_for_eve"),
      status: "planned",
      date_start: ISODate("2024-12-01"),
      date_end: ISODate("2024-12-31")
    },
    {
      course_id: 8,
      name: "DevOps Fundamentals",
      description: "Learn the principles and practices of DevOps.",
      course_group: ObjectId("group_id_for_devops_practices"),
      instructor: ObjectId("employee_id_for_frank"),
      status: "ongoing",
      date_start: ISODate("2024-10-05"),
      date_end: ISODate("2024-11-05")
    },
    {
      course_id: 9,
      name: "Advanced CSS Techniques",
      description: "Explore advanced techniques for styling websites with CSS.",
      course_group: ObjectId("group_id_for_frontend_development"),
      instructor: ObjectId("employee_id_for_grace"),
      status: "planned",
      date_start: ISODate("2024-11-15"),
      date_end: ISODate("2024-12-15")
    },
    {
      course_id: 10,
      name: "RESTful API Development",
      description: "Learn how to create RESTful APIs using Java and Spring Boot.",
      course_group: ObjectId("group_id_for_backend_development"),
      instructor: ObjectId("employee_id_for_hannah"),
      status: "ongoing",
      date_start: ISODate("2024-09-20"),
      date_end: ISODate("2024-10-20")
    },
    {
      course_id: 11,
      name: "Data Visualization with Python",
      description: "Learn to create visualizations with Python libraries like Matplotlib.",
      course_group: ObjectId("group_id_for_data_science"),
      instructor: ObjectId("employee_id_for_ian"),
      status: "planned",
      date_start: ISODate("2024-11-01"),
      date_end: ISODate("2024-12-01")
    },
    {
      course_id: 12,
      name: "Introduction to Cloud Computing",
      description: "Get an overview of cloud computing concepts and services.",
      course_group: ObjectId("group_id_for_devops_practices"),
      instructor: ObjectId("employee_id_for_julia"),
      status: "completed",
      date_start: ISODate("2024-06-01"),
      date_end: ISODate("2024-06-30")
    },
    {
      course_id: 13,
      name: "Git and Version Control",
      description: "Learn to use Git for version control in software development.",
      course_group: ObjectId("group_id_for_devops_practices"),
      instructor: ObjectId("employee_id_for_kate"),
      status: "ongoing",
      date_start: ISODate("2024-10-01"),
      date_end: ISODate("2024-10-31")
    },
    {
      course_id: 14,
      name: "Full-Stack Development Bootcamp",
      description: "Comprehensive training in both frontend and backend development.",
      course_group: ObjectId("group_id_for_frontend_development"), // Can be assigned based on your structure
      instructor: ObjectId("employee_id_for_liam"),
      status: "planned",
      date_start: ISODate("2024-12-01"),
      date_end: ISODate("2025-01-31")
    }
  ]);

  db.enrollments.insertMany([
    {
      enrollment_id: 1,
      course: ObjectId("course_id_for_html"), // Replace with actual ObjectId for the course
      student: ObjectId("employee_id_for_john"), // Replace with actual ObjectId for the student
      enrollment_date: ISODate("2024-10-01"),
      grade: "A",
      status: "completed"
    },
    {
      enrollment_id: 2,
      course: ObjectId("course_id_for_css"), // Replace with actual ObjectId for the course
      student: ObjectId("employee_id_for_jane"),
      enrollment_date: ISODate("2024-09-15"),
      grade: "B+",
      status: "completed"
    },
    {
      enrollment_id: 3,
      course: ObjectId("course_id_for_javascript"), // Replace with actual ObjectId for the course
      student: ObjectId("employee_id_for_alice"),
      enrollment_date: ISODate("2024-08-01"),
      grade: "A-",
      status: "completed"
    },
    {
      enrollment_id: 4,
      course: ObjectId("course_id_for_java"), // Replace with actual ObjectId for the course
      student: ObjectId("employee_id_for_bob"),
      enrollment_date: ISODate("2024-11-01"),
      grade: "A",
      status: "enrolled"
    },
    {
      enrollment_id: 5,
      course: ObjectId("course_id_for_python_data_analysis"), // Replace with actual ObjectId for the course
      student: ObjectId("employee_id_for_charlie"),
      enrollment_date: ISODate("2024-09-10"),
      grade: "B",
      status: "in-progress"
    },
    {
      enrollment_id: 6,
      course: ObjectId("course_id_for_nodejs"), // Replace with actual ObjectId for the course
      student: ObjectId("employee_id_for_david"),
      enrollment_date: ISODate("2024-07-01"),
      grade: "C+",
      status: "completed"
    }
  ]);

  db.reports.insertMany([
    {
      report_id: 1,
      report_type: ObjectId("report_type_id_for_attendance"), // Replace with actual ObjectId for the report type
      report_date: ISODate("2024-10-15"),
      report_data: "Attendance report for October 2024 showing employee presence and absences."
    },
    {
      report_id: 2,
      report_type: ObjectId("report_type_id_for_performance"), // Replace with actual ObjectId for the report type
      report_date: ISODate("2024-09-30"),
      report_data: "Performance review for employees for Q3 2024."
    },
    {
      report_id: 3,
      report_type: ObjectId("report_type_id_for_training"), // Replace with actual ObjectId for the report type
      report_date: ISODate("2024-08-20"),
      report_data: "Summary of training courses attended by employees in August 2024."
    },
    {
      report_id: 4,
      report_type: ObjectId("report_type_id_for_feedback"), // Replace with actual ObjectId for the report type
      report_date: ISODate("2024-09-10"),
      report_data: "Employee feedback report regarding training effectiveness."
    },
    {
      report_id: 5,
      report_type: ObjectId("report_type_id_for_recruitment"), // Replace with actual ObjectId for the report type
      report_date: ISODate("2024-07-25"),
      report_data: "Recruitment report detailing candidates interviewed in Q2 2024."
    }
  ]);

  db.transactions.insertMany([
    {
      transaction_id: 1,
      action_type: ObjectId("action_type_id_for_login"), // Replace with actual ObjectId for the action type
      user: ObjectId("employee_id_for_user_1"), // Replace with actual ObjectId for the user
      timestamp: ISODate("2024-09-15T08:30:00Z")
    },
    {
      transaction_id: 2,
      action_type: ObjectId("action_type_id_for_course_enrollment"), // Replace with actual ObjectId for the action type
      user: ObjectId("employee_id_for_user_2"), // Replace with actual ObjectId for the user
      timestamp: ISODate("2024-09-20T09:15:00Z")
    },
    {
      transaction_id: 3,
      action_type: ObjectId("action_type_id_for_training_completion"), // Replace with actual ObjectId for the action type
      user: ObjectId("employee_id_for_user_3"), // Replace with actual ObjectId for the user
      timestamp: ISODate("2024-09-22T14:00:00Z")
    },
    {
      transaction_id: 4,
      action_type: ObjectId("action_type_id_for_report_generation"), // Replace with actual ObjectId for the action type
      user: ObjectId("employee_id_for_user_4"), // Replace with actual ObjectId for the user
      timestamp: ISODate("2024-09-25T11:45:00Z")
    },
    {
      transaction_id: 5,
      action_type: ObjectId("action_type_id_for_training_feedback"), // Replace with actual ObjectId for the action type
      user: ObjectId("employee_id_for_user_5"), // Replace with actual ObjectId for the user
      timestamp: ISODate("2024-09-28T10:00:00Z")
    },
    {
      transaction_id: 6,
      action_type: ObjectId("action_type_id_for_account_update"), // Replace with actual ObjectId for the action type
      user: ObjectId("employee_id_for_user_6"), // Replace with actual ObjectId for the user
      timestamp: ISODate("2024-09-28T15:30:00Z")
    }
  ]);
  
  db.action_types.insertMany([
    {
      action_type_id: 1,
      name: 'User Login',
      description: 'When a user logs into the system.'
    },
    {
      action_type_id: 2,
      name: 'Course Enrollment',
      description: 'When a user enrolls in a training course.'
    },
    {
      action_type_id: 3,
      name: 'Training Completion',
      description: 'When a user completes a training course.'
    },
    {
      action_type_id: 4,
      name: 'Report Generation',
      description: 'When a report is generated by the user.'
    }
  ]);
  