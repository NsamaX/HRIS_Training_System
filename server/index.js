const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

const fetchData = (query, params) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (error, results) => {
      if (error) return reject('Database error');
      resolve(results);
    });
  });
};

app.get('/api/employees', async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Employee id is required' });
  
  const query = `
    SELECT e.first_name, e.last_name, e.email, p.name AS position, d.name AS department, e.date_joined
    FROM employees e
    LEFT JOIN positions p ON e.position_id = p.position_id
    LEFT JOIN departments d ON e.department_id = d.department_id
    WHERE e.employee_id = ?
  `;
  
  try {
    const results = await fetchData(query, [id]);
    if (results.length === 0) return res.status(404).json({ message: 'Employee not found' });
    res.json(results[0]);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get('/api/recent-courses', async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'User id is required' });

  const query = `
    SELECT c.course_id AS id, c.name, t.timestamp
    FROM enrollments en
    INNER JOIN transactions t ON t.user_id = en.student_id 
        AND JSON_UNQUOTE(JSON_EXTRACT(t.description, '$.course')) = en.course_id
    INNER JOIN training_courses c ON en.course_id = c.course_id
    WHERE en.student_id = ?
    ORDER BY en.enrollment_date DESC 
    LIMIT 4;
  `;

  try {
    const results = await fetchData(query, [id]);
    if (results.length === 0) return res.status(404).json({ message: 'No courses found for this user' });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get('/api/courses-status', async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Student id is required' });

  const query = `
    SELECT 
      SUM(CASE WHEN ec.status = 'completed' THEN 1 ELSE 0 END) AS completed,
      SUM(CASE WHEN ec.status = 'in-complete' THEN 1 ELSE 0 END) AS incomplete,
      SUM(CASE WHEN ec.status = 'in-progress' THEN 1 ELSE 0 END) AS in-progress
    FROM enrollments ec
    WHERE ec.student_id = ?
  `;

  try {
    const results = await fetchData(query, [id]);
    res.json(results.length > 0 ? results[0] : { completed: 0, incomplete: 0, enrolled: 0 });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get('/api/completed-courses', async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Student id is required' });

  const query = `
    SELECT e.course_id AS id, t.name, t.description
    FROM enrollments e
    LEFT JOIN training_courses t ON e.course_id = t.course_id
    WHERE e.student_id = ? AND e.status = 'completed'
  `;

  try {
    const results = await fetchData(query, [id]);
    if (results.length === 0) return res.status(404).json({ message: 'No completed courses found for this student' });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get('/api/hall-of-fame', async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Employee id is required' });

  const query = `
    SELECT a.name, a.description
    FROM hall_of_fame h 
    LEFT JOIN achievements a ON h.achievement_id = a.achievement_id 
    WHERE h.employee_id = ?
  `;

  try {
    const results = await fetchData(query, [id]);
    if (results.length === 0) return res.status(404).json({ message: 'Hall of Fame not found for this employee' });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get('/api/suggested-courses', async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'student_id is required' });
  }

  const query = `
    SELECT c.course_id AS id, 
           c.name, 
           c.description, 
           COALESCE(JSON_EXTRACT(c.rating, '$.score'), '0') AS score
    FROM training_courses c
    LEFT JOIN training_groups g ON c.course_group_id = g.group_id
    LEFT JOIN enrollments en ON en.course_id = c.course_id AND en.student_id = ?
    WHERE en.student_id IS NULL 
    ORDER BY score DESC
  `;

  try {
    const results = await fetchData(query, [id]); 

    res.json(results);
  } catch (error) {
    console.error('Error fetching suggested courses:', error);
    res.status(500).json({ error: 'An error occurred while fetching suggested courses' });
  }
});

app.get('/api/enrolled-courses', async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Employee id is required' });

  const query = `
    SELECT en.course_id AS id,
      (SELECT CONCAT(e2.first_name, ' ', e2.last_name) FROM employees e2 WHERE e2.employee_id = en.user_enrolled_id) AS assign_by,
      en.enrollment_date, t.name, t.date_start, t.date_end, t.duration, t.status
    FROM enrollments en 
    LEFT JOIN training_courses t ON en.course_id = t.course_id 
    WHERE en.student_id = ? && en.status != 'complete'
  `;

  try {
    const results = await fetchData(query, [id]);
    if (results.length === 0) return res.status(404).json({ message: 'No courses found for this employee' });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get('/api/courses', async (req, res) => {
  const { id } = req.query;

  const query = `
    SELECT c.course_id AS id, c.name AS name, c.description, c.platform, CONCAT(e.first_name, " ", e.last_name) AS instructor, c.date_start, c.date_end, c.duration, g.name AS group_name, JSON_EXTRACT(c.rating, '$.score') AS score
    FROM training_courses c 
    LEFT JOIN training_groups g ON c.course_group_id = g.group_id
    LEFT JOIN employees e ON c.instructor_id = e.employee_id
    ${id ? 'WHERE c.course_id = ?' : ''}
  `;

  try {
    const results = await fetchData(query, id ? [id] : []);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get('/api/course-status', async (req, res) => {
  const { course_id, student_id } = req.query;

  if (!course_id || !student_id) {
    return res.status(400).json({ error: 'Both course_id and student_id are required' });
  }

  const query = `
    SELECT e.status 
    FROM enrollments e 
    WHERE e.course_id = ? 
      AND e.student_id = ?
  `;

  try {
    const result = await fetchData(query, [course_id, student_id]);

    if (result.length === 0) {
      return res.json({ status: null });
    }

    res.json({ status: result[0].status });
  } catch (error) {
    console.error('Error fetching course status:', error);
    res.status(500).json({ error: 'An error occurred while fetching course status' });
  }
});

app.get('/api/course-rating', async (req, res) => {
  const { course_id } = req.query;

  if (!course_id) {
    return res.status(400).json({ error: 'course_id is required' });
  }

  const query = `
    SELECT JSON_EXTRACT(t.rating, '$.star') AS star 
    FROM training_courses t
    WHERE t.course_id = ?
  `;

  try {
    const result = await fetchData(query, [course_id]);

    if (result.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const star = result[0].star;

    if (star !== null) {
      res.json({ star: JSON.parse(star) });
    } else {
      res.status(404).json({ error: 'Rating not found' });
    }
  } catch (error) {
    console.error('Error fetching course rating:', error);
    res.status(500).json({ error: 'An error occurred while fetching course rating' });
  }
});

app.get('/api/course-vote', async (req, res) => {
  const { course_id, student_id } = req.query;

  if (!course_id || !student_id) {
    return res.status(400).json({ error: 'course_id and student_id are required' });
  }

  const query = `
    SELECT rating AS vote
    FROM enrollments 
    WHERE course_id = ? AND student_id = ?`;

  try {
    const result = await fetchData(query, [course_id, student_id]);

    res.json(result[0]);
  } catch (error) {
    console.error('Error fetching course rating:', error);
    res.status(500).json({ error: 'An error occurred while fetching course rating' });
  }
});

app.post('/api/update-course-vote', async (req, res) => {
  const { course_id, student_id, rating } = req.body;

  if (rating < 0 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 0 and 5' });
  }

  const query = `
    UPDATE enrollments
    SET rating = ?
    WHERE course_id = ? AND student_id = ?
  `;

  try {
    const result = await fetchData(query, [rating, course_id, student_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'No existing vote found for this course and user' });
    }

    res.status(200).json({ message: 'Vote updated successfully' });
  } catch (error) {
    console.error('Error updating course vote:', error);
    res.status(500).json({ error: 'An error occurred while updating the course vote' });
  }
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
