import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Course from '../components/course';

const CoursesPage = () => {
  const [course, setCourse] = useState(null);
  const [courseStatus, setCourseStatus] = useState(null);
  const [error, setError] = useState(null); 
  const location = useLocation();

  const getCourseIdFromUrl = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('id');
  };

  useEffect(() => {
    const courseId = getCourseIdFromUrl();
    
    if (courseId) {
      fetch(`http://localhost:5000/api/courses?id=${courseId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch course data');
          }
          return response.json();
        })
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            setCourse(data[0]);
          } else {
            console.error('Course data is not in expected format');
          }
        })
        .catch(error => {
          console.error('Error fetching course data:', error);
          setError('Error fetching course data');
        });

      fetch(`http://localhost:5000/api/course-status?course_id=${courseId}&student_id=${1}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch course status');
          }
          return response.json();
        })
        .then(data => {
          console.log('Fetched course status:', data);
          setCourseStatus(data.status); 
        })
        .catch(error => {
          console.error('Error fetching course status:', error);
          setError('Error fetching course status');
        });
    }
  }, [location]);

  const handleRatingSelected = (rating) => {
    console.log('Selected rating:', rating);
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {course ? (
        <Course 
          course={course}
          onRatingSelected={handleRatingSelected}
        />
      ) : (
        <p>Loading...</p>
      )}
      {courseStatus && <p>Course Status: {courseStatus}</p>} 
    </div>
  );
};

export default CoursesPage;
