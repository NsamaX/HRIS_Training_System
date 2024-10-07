const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
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
  console.log('Connected to MySQL');
});

const fetchData = (query, params) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
};

app.get('/api/employees', async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Employee id required' });
  
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
  
  try {
    const [result] = await fetchData(query, [id]);
    if (!result) return res.status(404).json({ message: 'Employee not found' });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get('/api/recent-courses', async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'User id required' });

  const query = `
    WITH LatestCourses AS (
      SELECT 
        en.course_id, 
        c.name, 
        MAX(t.timestamp) AS latest_timestamp
      FROM 
        enrollments en
      INNER JOIN 
        transactions t ON t.user_id = en.student_id AND JSON_UNQUOTE(JSON_EXTRACT(t.description, '$.course')) = en.course_id
      INNER JOIN 
        training_courses c ON en.course_id = c.course_id
      WHERE 
        en.student_id = ?
      GROUP BY 
        en.course_id, c.name
    )
    SELECT 
      lc.course_id AS id, 
      lc.name, 
      lc.latest_timestamp AS timestamp
    FROM 
      LatestCourses lc
    ORDER BY 
      lc.latest_timestamp DESC
    LIMIT 4;
  `;

  try {
    const results = await fetchData(query, [id]);
    if (results.length === 0) return res.status(404).json({ message: 'No courses found' });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get('/api/courses-status', async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Student id required' });

  const query = `
    SELECT 
      SUM(CASE WHEN ec.status = 'completed' THEN 1 ELSE 0 END) AS completed,
      SUM(CASE WHEN ec.status = 'in-complete' THEN 1 ELSE 0 END) AS incomplete,
      SUM(CASE WHEN ec.status = 'in-progress' THEN 1 ELSE 0 END) AS enrolled
    FROM 
      enrollments ec
    WHERE 
      ec.student_id = ?
  `;

  try {
    const [result] = await fetchData(query, [id]);
    res.json(result || { completed: 0, incomplete: 0, enrolled: 0 });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get('/api/completed-courses', async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Student id required' });

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
      e.student_id = ? AND e.status = 'completed'
  `;

  try {
    const results = await fetchData(query, [id]);
    if (results.length === 0) return res.status(404).json({ message: 'No completed courses' });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get('/api/hall-of-fame', async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Employee id required' });

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

  try {
    const results = await fetchData(query, [id]);
    if (results.length === 0) return res.status(404).json({ message: 'Hall of Fame not found' });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get('/api/suggested-courses', async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Student id required' });

  const query = `
    SELECT 
      c.course_id AS id, 
      c.name, 
      c.description, 
      COALESCE(JSON_EXTRACT(c.rating, '$.score'), '0') AS score
    FROM 
      training_courses c
    LEFT JOIN 
      enrollments en ON en.course_id = c.course_id AND en.student_id = ?
    WHERE 
      en.status IS NULL 
    ORDER BY 
      score DESC
  `;

  try {
    const results = await fetchData(query, [id]);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get('/api/enrolled-courses', async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Employee id required' });

  const query = `
    SELECT en.course_id AS id, (
      SELECT 
        CONCAT(e2.first_name, ' ', e2.last_name) 
      FROM 
        employees e2 
      WHERE 
        e2.employee_id = en.user_enrolled_id
      ) AS assign_by,
      en.enrollment_date, 
      t.name, 
      t.date_start, 
      t.date_end, 
      t.duration, 
      t.status
    FROM 
      enrollments en 
    LEFT JOIN 
      training_courses t ON en.course_id = t.course_id 
    WHERE 
      en.student_id = ? && en.status IN ('in-complete', 'in-progress') && t.status NOT IN ('planned', 'canceled' )
  `;

  try {
    const results = await fetchData(query, [id]);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get('/api/courses', async (req, res) => {
  const { id } = req.query;

  const query = `
    SELECT 
      c.course_id AS id, 
      c.name, 
      c.description, 
      c.platform, 
      CONCAT(e.first_name, ' ', e.last_name) AS instructor, 
      c.date_start, 
      c.date_end, 
      c.duration, 
      g.name AS group_name, 
      JSON_EXTRACT(c.rating, '$.score') AS score, 
      c.status
    FROM 
      training_courses c 
    LEFT JOIN 
      training_groups g ON c.course_group_id = g.group_id
    LEFT JOIN 
      employees e ON c.instructor_id = e.employee_id
    WHERE 
      ${id ? 'c.course_id = ?' : 'c.status = \'ongoing\''}
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
  if (!course_id || !student_id) return res.status(400).json({ error: 'Both course_id and student_id required' });

  const query = `
    SELECT 
      e.status 
    FROM 
      enrollments e 
    WHERE 
      e.course_id = ? AND e.student_id = ?
  `;

  try {
    const [result] = await fetchData(query, [course_id, student_id]);
    res.json({ status: result ? result.status : null });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get('/api/course-rating', async (req, res) => {
  const { course_id } = req.query;
  if (!course_id) return res.status(400).json({ error: 'course_id required' });

  const query = `
    SELECT 
      JSON_EXTRACT(t.rating, '$.star') AS star 
    FROM 
      training_courses t 
    WHERE 
      t.course_id = ?
  `;

  try {
    const [result] = await fetchData(query, [course_id]);

    if (!result) return res.status(404).json({ error: 'Course not found' });

    const star = result.star;

    res.json({ star });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/course-vote', async (req, res) => {
  const { course_id, student_id } = req.query;
  if (!course_id || !student_id) {
    return res.status(400).json({ error: 'course_id and student_id are required' });
  }

  const query = `
    SELECT 
      rating AS vote 
    FROM 
      enrollments 
    WHERE 
      course_id = ? AND student_id = ?
  `;
  try {
    const result = await fetchData(query, [course_id, student_id]);
    if (result.length === 0) {
      return res.status(404).json({ error: 'Vote not found' });
    }
    res.json(result[0]);
  } catch (error) {
    console.error('Error fetching course vote:', error);
    res.status(500).json({ error: 'An error occurred while fetching course vote' });
  }
});

app.post('/api/course-vote', async (req, res) => {
  const { course_id, student_id, rating } = req.body;
  if (!course_id || !student_id || rating === undefined) {
    return res.status(400).json({ error: 'course_id, student_id, and rating are required' });
  }

  if (rating < 0 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 0 and 5' });
  }

  const fetchQuery = `
    SELECT 
      rating 
    FROM 
      enrollments 
    WHERE 
      course_id = ? AND student_id = ?
  `;
  let existingRating;
  try {
    const existingResult = await fetchData(fetchQuery, [course_id, student_id]);
    if (existingResult.length > 0) {
      existingRating = existingResult[0].rating;
    }
  } catch (error) {
    console.error('Error fetching existing rating:', error);
    return res.status(500).json({ error: 'An error occurred while fetching existing rating' });
  }

  let updateQuery = `
    SELECT 
      JSON_EXTRACT(rating, '$.star') AS star, 
      JSON_EXTRACT(rating, '$.score') AS score 
    FROM 
      training_courses 
    WHERE 
      course_id = ?
  `;
  let currentStars;
  let currentScore;
  try {
    const starResult = await fetchData(updateQuery, [course_id]);
    if (starResult.length > 0) {
      currentStars = JSON.parse(starResult[0].star);
      currentScore = starResult[0].score ? JSON.parse(starResult[0].score) : 0;
    } else {
      return res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    console.error('Error fetching course star ratings:', error);
    return res.status(500).json({ error: 'An error occurred while fetching course star ratings' });
  }

  if (existingRating) {
    currentStars[existingRating] = currentStars[existingRating] > 0 ? currentStars[existingRating] - 1 : 0;
  }
  
  currentStars[rating] = (currentStars[rating] || 0) + 1;

  const totalVotes = Object.values(currentStars).reduce((total, count) => total + count, 0);
  const weightedSum = Object.entries(currentStars).reduce((sum, [star, count]) => sum + (star * count), 0);
  const newScore = totalVotes > 0 ? (weightedSum / totalVotes) : 0;

  const updatedRatingJson = JSON.stringify({
    score: newScore,
    star: currentStars
  });

  const updateEnrollmentQuery = `UPDATE enrollments SET rating = ? WHERE course_id = ? AND student_id = ?`;
  const updateCourseQuery = `UPDATE training_courses SET rating = ? WHERE course_id = ?`;

  try {
    await fetchData(updateEnrollmentQuery, [rating, course_id, student_id]);
    await fetchData(updateCourseQuery, [updatedRatingJson, course_id]);

    res.status(200).json({ message: 'Vote updated successfully', updatedRating: updatedRatingJson });
  } catch (error) {
    console.error('Error updating course vote:', error);
    return res.status(500).json({ error: 'An error occurred while updating the course vote' });
  }
});

app.post('/api/enroll', async (req, res) => {
  const { course_id, student_id } = req.body;
  
  if (!course_id || !student_id) {
    return res.status(400).json({ error: 'course_id and student_id are required' });
  }

  const enrollmentDate = new Date().toISOString().slice(0, 10);
  const status = 'in-progress';
  const rating = 0;

  const query = `
    INSERT INTO enrollments (course_id, user_enrolled_id, student_id, enrollment_date, status, rating)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  try {
    await fetchData(query, [course_id, student_id, student_id, enrollmentDate, status, rating]);
    res.status(201).json({ message: 'Enrollment successful' });
  } catch (error) {
    console.error('Error enrolling student:', error);
    res.status(500).json({ error: 'An error occurred while enrolling the student' });
  }
});

app.delete('/api/unenroll', async (req, res) => {
  const { course_id, student_id } = req.body;
  
  if (!course_id || !student_id) {
    return res.status(400).json({ error: 'course_id and student_id are required' });
  }

  const query = `
    DELETE FROM enrollments
    WHERE course_id = ? AND student_id = ?
  `;

  try {
    await fetchData(query, [course_id, student_id]);
    res.status(200).json({ message: 'Unenrollment successful' });
  } catch (error) {
    console.error('Error unenrolling student:', error);
    res.status(500).json({ error: 'An error occurred while unenrolling the student' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
