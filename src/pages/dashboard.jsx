import React, { useEffect, useState } from 'react';
import Dashboard from '../components/dashboard'; 

const DashboardPage = () => {
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
  
  // const status = {
  //   completed: 16,
  //   incomplete: 5,
  //   enrolled: 2,
  // };
  
  // const suggestedCourses = [
  //   { name: "JavaScript for Beginners", description: "Learn the basics of JavaScript and start building interactive web pages.", rating: 4.8 },
  //   { name: "Advanced CSS Techniques", description: "Master advanced CSS techniques to enhance your web development skills.", rating: 4.5 },
  //   { name: "Introduction to Node.js", description: "Get started with Node.js and learn how to build server-side applications.", rating: 4.7 },
  //   { name: "React for Beginners", description: "A comprehensive course on building React applications from scratch.", rating: 4.9 },
  // ];

  const [employee, setEmployee] = useState({});
  const [achievements, setAchievements] = useState([]);
  // const [recentlyCourses, setRecentlyCourses] = useState([]);
  // const [completedCourses, setCompletedCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [statusCount, setStatusCount] = useState({
    'completed': 0,
    'in-progress': 0,
    'enrolled': 0,
  });
  const [suggestedCourses, setSuggestedCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/employees?id=1')
      .then(response => response.json())
      .then(data => {
        setEmployee(data);
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
      });

    fetch('http://localhost:5000/api/hall-of-fame?id=1')
      .then(response => response.json())
      .then(data => {
        setAchievements(data);
      })
      .catch(error => {
        console.error('Error fetching achievements data:', error);
      });

      fetch('http://localhost:5000/api/enrolled-courses?id=1')
      .then(response => response.json())
      .then(data => {
        setCourses(data);

        const statusMap = {
          'completed': 0,
          'incompleted': 0,
          'enrolled': 0,
        };

        data.forEach(course => {
          if (statusMap[course.status] !== undefined) {
            statusMap[course.status]++;
          }
        });

        setStatusCount(statusMap);
      })
      .catch(error => {
        console.error('Error fetching courses data:', error);
      });
  }, []); 
  

  return (
    <Dashboard 
      employee={employee} 
      achievements={achievements}
      completedCourses={completedCourses}
      courses={courses} 
      status={statusCount} 
      recentlyCourses={recentlyCourses}
      suggestedCourses={suggestedCourses}
    />
  );
};

export default DashboardPage;
