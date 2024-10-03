import React, { useEffect, useState } from 'react';
import Dashboard from '../components/dashboard';

const DashboardPage = () => {
  const [employee, setEmployee] = useState({});
  const [recentlyCourses, setRecentlyCourses] = useState([]);
  const [status, setStatus] = useState({});
  const [completedCourses, setCompletedCourses] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [suggestedCourses, setSuggestedCourses] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const employeeId = 1;

    const fetchData = async (url, setter) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setter(data);
      } catch (error) {
        console.error(`Error fetching ${url}:`, error);
      }
    };

    fetchData(`http://localhost:5000/api/employees?id=${employeeId}`, setEmployee);
    fetchData(`http://localhost:5000/api/recent-courses?id=${employeeId}`, setRecentlyCourses);
    fetchData(`http://localhost:5000/api/course-status?id=${employeeId}`, setStatus);
    fetchData(`http://localhost:5000/api/completed-courses?id=${employeeId}`, setCompletedCourses);
    fetchData(`http://localhost:5000/api/hall-of-fame?id=${employeeId}`, setAchievements);
    fetchData(`http://localhost:5000/api/suggested-courses?id=${employeeId}`, setSuggestedCourses);
    fetchData(`http://localhost:5000/api/enrolled-courses?id=${employeeId}`, setCourses);
  }, []);

  return (
    <Dashboard 
      employee={employee}
      recentlyCourses={recentlyCourses}
      status={status}
      completedCourses={completedCourses}
      achievements={achievements}
      suggestedCourses={suggestedCourses}
      courses={courses}
    />
  );
};

export default DashboardPage;
