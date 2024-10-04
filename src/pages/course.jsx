import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Course from '../components/course';

const CoursesPage = () => {
  const [course, setCourse] = useState(null);
  const [courseStatus, setCourseStatus] = useState(null);
  const [courseRatings, setCourseRatings] = useState(new Map());
  const [error, setError] = useState(null); 
  const location = useLocation();

  const getCourseIdFromUrl = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('id');
  };

  useEffect(() => {
    const courseId = getCourseIdFromUrl();

    if (!courseId) {
      setError("Course information not found in URL");
      return;
    }

    // Fetch course data
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

    // Fetch course status
    fetch(`http://localhost:5000/api/course-status?course_id=${courseId}&student_id=1`)
      .then(response => {
        if (!response.ok) {
          console.error('Error status:', response.status);
          if (response.status === 404) {
            return { status: '' };
          }
          return response.text().then(text => { throw new Error(text); });
        }
        return response.json();
      })
      .then(data => {
        setCourseStatus(data.status || '');
      })
      .catch(error => {
        console.error('Error fetching course status:', error);
        setCourseStatus('');
      });

    // Fetch course rating and store in Map
    fetch(`http://localhost:5000/api/course-rating?course_id=${courseId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch course rating');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.star) {
          const ratingsMap = new Map(Object.entries(data.star));
          console.log(ratingsMap);
          setCourseRatings(ratingsMap);
        } else {
          console.error('Course rating data is not in expected format');
          setError('Unexpected course rating data format');
        }
      })
      .catch(error => {
        console.error('Error fetching course rating:', error);
        setError('Error fetching course rating');
      });

  }, [location]);

  const handleRatingSelected = (rating) => {
    console.log('Selected rating:', rating);
  };

  return (
    <div>
      {error ? (
        <p className='status'>{error}</p>
      ) : course ? (
        <Course 
          course={course}
          rating={courseRatings}
          status={courseStatus}
          onRatingSelected={handleRatingSelected}
        />
      ) : (
        <p className='status'>Loading...</p>
      )}
    </div>
  );
};

export default CoursesPage;
