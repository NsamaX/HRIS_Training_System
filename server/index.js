const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

app.get('/api/employees', (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: 'Employee id is required' });
  }
  
  const query = `
    SELECT 
      e.first_name,
      e.last_name,
      e.email,
      e.date_joined,
      p.name AS position, 
      d.name AS department 
    FROM 
      employees e 
    LEFT JOIN 
      positions p ON e.position_id = p.position_id 
    LEFT JOIN 
      departments d ON e.department_id = d.department_id 
    WHERE 
      e.employee_id = ?`;

  db.query(query, [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(results[0]);
  });
});

app.get('/api/hall-of-fame', (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: 'Employee id is required' });
  }

  const query = `
    SELECT 
      a.name, 
      a.description 
    FROM 
      hall_of_fame h 
    LEFT JOIN 
      achievements a ON h.achievement_id = a.achievement_id 
    WHERE 
      h.employee_id = ?`;

  db.query(query, [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Hall of Fame not found for this employee' });
    }
    res.json(results);
  });
});

app.get('/api/courses', (req, res) => {
  const courseId = req.query.id;
  
  let query = `
    SELECT 
      c.course_id, 
      c.name AS name, 
      c.description, 
      c.date_start, 
      c.date_end, 
      c.duration, 
      g.name AS group_name 
    FROM 
      training_courses c 
    LEFT JOIN 
      training_groups g ON c.course_group_id = g.group_id
  `;
  
  if (courseId) {
    query += ` WHERE c.course_id = ?`;
  }
  
  db.query(query, courseId ? [courseId] : [], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

app.get('/api/enrolled-courses', (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: 'Employee id is required' });
  }
  
  const query = `
    SELECT 
      en.course_id,
      (SELECT 
          CONCAT(e2.first_name, ' ', e2.last_name) 
        FROM 
          employees e2 
        WHERE 
          e2.employee_id = en.user_enrolled_id
      ) AS 'assign_by',
      en.enrollment_date,
      t.name AS course_name,
      t.date_start,
      t.date_end,
      t.duration,
      t.status
    FROM 
      enrollments en 
    JOIN 
      employees e ON en.student_id = e.employee_id 
    JOIN 
      training_courses t ON en.course_id = t.course_id 
    WHERE 
      en.enrollment_id = ?
  `;

  db.query(query, [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'No courses found for this employee' });
    }
    res.json(results);
  });
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
