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
      p.name AS position, 
      d.name AS department,
      e.date_joined
    FROM 
      employees e 
    LEFT JOIN 
      positions p ON e.position_id = p.position_id 
    LEFT JOIN 
      departments d ON e.department_id = d.department_id 
    WHERE 
      e.employee_id = ?
  `;

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

app.get('/api/recent-courses', (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.status(400).json({ error: 'User id is required' });
  }

  const query = `
    SELECT 
      c.course_id AS id,
      c.name,
      t.timestamp
    FROM 
      enrollments en
    LEFT JOIN 
      transactions t ON t.user_id = en.student_id 
        AND JSON_UNQUOTE(JSON_EXTRACT(t.description, '$.course')) = en.course_id
    LEFT JOIN 
      training_courses c ON JSON_UNQUOTE(JSON_EXTRACT(t.description, '$.course')) = c.course_id
    WHERE 
      en.student_id = ?
    ORDER BY 
      en.enrollment_date DESC 
    LIMIT 4;
  `;

  db.query(query, [id], (error, results) => {
    if (error) {
      console.error('Database error:', error); 
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'No courses found for this user' });
    }

    res.json(results);
  });
});

app.get('/api/course-status', (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.status(400).json({ error: 'Student id is required' });
  }

  const query = `
    SELECT 
      SUM(CASE WHEN ec.status = 'completed' THEN 1 ELSE 0 END) AS completed,
      SUM(CASE WHEN ec.status = 'in-complete' THEN 1 ELSE 0 END) AS incomplete,
      SUM(CASE WHEN ec.status = 'enrolled' THEN 1 ELSE 0 END) AS enrolled
    FROM 
      enrollments ec
    WHERE 
      ec.student_id = ?;
  `;

  db.query(query, [id], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Database error' });
    }
    
    const response = results.length > 0 ? results[0] : { completed: 0, incomplete: 0, inprogress: 0, enrolled: 0 };
    res.json(response);
  });
});

app.get('/api/completed-courses', (req, res) => {
  const id = req.query.id;
  
  if (!id) {
    return res.status(400).json({ error: 'Student id is required' });
  }

  const query = `
    SELECT 
      e.course_id AS id,
      t.name,
      t.description
    FROM 
      enrollments e
    LEFT JOIN 
      training_courses t ON e.course_id = t.course_id
    WHERE 
      e.student_id = ? AND e.status = 'completed';
  `;

  db.query(query, [id], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No completed courses found for this student' });
    }

    res.json(results);
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
      h.employee_id = ?
  `;

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

app.get('/api/suggested-courses', (req, res) => {
  const query = `
    SELECT 
      c.course_id AS id, 
      c.name, 
      c.description,
      json_extract(c.rating, '$.score') AS score
    FROM 
      training_courses c 
    LEFT JOIN 
      training_groups g ON c.course_group_id = g.group_id
    ORDER BY
      json_extract(c.rating, '$.score') DESC;
  `;

  db.query(query, (error, results) => {
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
      en.course_id AS id,
      (SELECT 
          CONCAT(e2.first_name, ' ', e2.last_name) 
        FROM 
          employees e2 
        WHERE 
          e2.employee_id = en.user_enrolled_id
      ) AS 'assign_by',
      en.enrollment_date,
      t.name,
      t.date_start,
      t.date_end,
      t.duration,
      t.status
    FROM 
      enrollments en 
    LEFT JOIN 
      employees e ON en.student_id = e.employee_id 
    LEFT JOIN 
      training_courses t ON en.course_id = t.course_id 
    WHERE 
      en.student_id = ?
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

app.get('/api/courses', (req, res) => {
  const id = req.query.id;
  
  let query = `
    SELECT 
      c.course_id AS id, 
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
  
  if (id) {
    query += ` WHERE c.course_id = ?`;
  }
  
  db.query(query, id ? [id] : [], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
