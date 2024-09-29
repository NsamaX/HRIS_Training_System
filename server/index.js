const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hris_training_system',
  port: 3306,
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

app.get('/api/employees/:id', (req, res) => {
  const id = req.params.id; 
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

app.get('/api/hall-of-fame/:id', (req, res) => {
  const id = req.params.id; 
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
  const query = `
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
      training_groups g ON c.course_group_id = g.group_id`;

  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
