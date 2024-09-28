import React, { useEffect, useState } from 'react';
import Dashboard from '../components/dashboard'; 

const achievements = [
  { name: "Achievement 1", description: "Completed course on JavaScript with a score of 95%" },
  { name: "Achievement 2", description: "Top performer in React workshop, awarded certificate of excellence" },
  { name: "Achievement 3", description: "Completed advanced course on React with a score of 92%" },
  { name: "Achievement 4", description: "Top performer in JavaScript workshop, recognized for innovative solutions" },
  { name: "Achievement 5", description: "Successfully completed HTML and CSS fundamentals course" },
  { name: "Achievement 6", description: "Top performer in HTML workshop, led group discussions" },
  { name: "Achievement 7", description: "Received Employee of the Month award for exceptional performance" },
  { name: "Achievement 8", description: "Participated in hackathon and won 1st place" },
];

const recentlyCourses = [
  { id: 1, name: 'JavaScript Fundamentals', status: 'Completed' },
  { id: 2, name: 'React Basics', status: 'In Progress' },
  { id: 3, name: 'Advanced CSS Techniques', status: 'Not Started' },
  { id: 4, name: 'Node.js for Beginners', status: 'Completed' },
];

const completedCourses = [
  { courseId: 1, name: 'JavaScript Fundamentals', description: 'A comprehensive course on JavaScript covering all the basics.' },
  { courseId: 3, name: 'HTML & CSS for Beginners', description: 'Learn the fundamentals of web development with HTML and CSS.' },
  { courseId: 4, name: 'Node.js Basics', description: 'Introduction to server-side development using Node.js.' },
  { courseId: 1, name: 'JavaScript Fundamentals', description: 'A comprehensive course on JavaScript covering all the basics.' },
  { courseId: 3, name: 'HTML & CSS for Beginners', description: 'Learn the fundamentals of web development with HTML and CSS.' },
  { courseId: 4, name: 'Node.js Basics', description: 'Introduction to server-side development using Node.js.' },
  { courseId: 1, name: 'JavaScript Fundamentals', description: 'A comprehensive course on JavaScript covering all the basics.' },
  { courseId: 3, name: 'HTML & CSS for Beginners', description: 'Learn the fundamentals of web development with HTML and CSS.' },
  { courseId: 4, name: 'Node.js Basics', description: 'Introduction to server-side development using Node.js.' },
];

const courses = [
  { id: 1, assignBy: 'John Doe', date: 'March 10, 2022', courseName: 'JavaScript Fundamentals', platform: 'Coursera', startDate: 'March 10, 2022', duration: '2 weeks', status: 'Completed' },
  { id: 2, assignBy: 'Jane Smith', date: 'April 15, 2022', courseName: 'React Basics', platform: 'Udemy', startDate: 'April 15, 2022', duration: '3 weeks', status: 'In Progress' },
  { id: 3, assignBy: 'Alice Johnson', date: 'May 1, 2022', courseName: 'HTML & CSS for Beginners', platform: 'edX', startDate: 'May 1, 2022', duration: '4 weeks', status: 'Completed' },
  { id: 4, assignBy: 'Bob Brown', date: 'May 15, 2022', courseName: 'Node.js Basics', platform: 'LinkedIn Learning', startDate: 'May 15, 2022', duration: '2 weeks', status: 'Not Started' },
];

const status = {
  completed: 16,
  incomplete: 5,
  enrolled: 2,
};

const suggestedCourses = [
  { name: "JavaScript for Beginners", description: "Learn the basics of JavaScript and start building interactive web pages.", rating: 4.8 },
  { name: "Advanced CSS Techniques", description: "Master advanced CSS techniques to enhance your web development skills.", rating: 4.5 },
  { name: "Introduction to Node.js", description: "Get started with Node.js and learn how to build server-side applications.", rating: 4.7 },
  { name: "React for Beginners", description: "A comprehensive course on building React applications from scratch.", rating: 4.9 },
];

const DashboardPage = () => {
  const [employee, setEmployee] = useState({});
  // const [achievements, setAchievements] = useState([]);
  // const [completedCourses, setCompletedCourses] = useState([]);
  // const [courses, setCourses] = useState([]);
  // const [status, setStatus] = useState({});
  // const [recentlyCourses, setRecentlyCourses] = useState([]);
  // const [suggestedCourses, setSuggestedCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/employees/0')
      .then(response => response.json())
      .then(data => {
        setEmployee(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
        setLoading(false);
      });
  }, []);  

  return (
    <Dashboard 
      employee={employee} 
      achievements={achievements}
      completedCourses={completedCourses}
      courses={courses} 
      status={status} 
      recentlyCourses={recentlyCourses}
      suggestedCourses={suggestedCourses}
    />
  );
};

export default DashboardPage;
