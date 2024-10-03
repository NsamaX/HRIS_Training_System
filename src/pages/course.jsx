import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Course from '../components/course';

const CoursesPage = () => {
  const [course, setCourse] = useState(null); 
  const location = useLocation();

  const getCourseIdFromUrl = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('id'); 
  };

  useEffect(() => {
    const courseId = getCourseIdFromUrl();
    
    if (courseId) {
      fetch(`http://localhost:5000/api/courses?id=${courseId}`)
        .then(response => response.json())
        .then(data => {
          console.log('Fetched course data:', data); 
          if (Array.isArray(data) && data.length > 0) {
            setCourse(data[0]);
          } else {
            console.error('Course data is not in expected format');
          }
        })
        .catch(error => console.error('Error fetching course data:', error));
    }
  }, [location]);

  const handleRatingSelected = (rating) => {
    console.log('Selected rating:', rating);
  };

  return (
    course ? (
      <Course 
        course={course}
        onRatingSelected={handleRatingSelected}
      />
    ) : (
      <p>Loading...</p>
    )
  );
};

export default CoursesPage;
