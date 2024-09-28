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
  db.query('SELECT * FROM employees WHERE employee_id = ?', [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(results[0]);
  });
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
