import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Course from '../components/course';

const CoursesPage = () => {
  const [course, setCourse] = useState(null);
  const [courseStatus, setCourseStatus] = useState('');
  const [courseRatings, setCourseRatings] = useState(new Map());
  const [userVote, setUserVote] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const section = { student_id: 1 }; 

  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch: ${url}`);
    return await response.json();
  };

  const fetchCourseData = async () => {
    const courseId = new URLSearchParams(location.search).get('id');
    setLoading(true);
    try {
      const [courseData, statusData, ratingData, voteData] = await Promise.all([
        fetchData(`http://localhost:5000/api/courses?id=${courseId}`),
        fetchData(`http://localhost:5000/api/course-status?course_id=${courseId}&student_id=${section.student_id}`),
        fetchData(`http://localhost:5000/api/course-rating?course_id=${courseId}`),
        fetchData(`http://localhost:5000/api/course-vote?course_id=${courseId}&student_id=${section.student_id}`),
      ]);
      
      setCourse(courseData[0]);
      setCourseStatus(statusData.status || '');
      setCourseRatings(new Map(Object.entries(ratingData.star || {})));
      setUserVote(voteData);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRatingSelected = async (rating) => {
    const newVote = rating;
    setUserVote(newVote);
    
    try {
      await fetch('http://localhost:5000/api/course-vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course_id: course.id, student_id: section.student_id, rating: newVote }),
      });
      fetchCourseData();
    } catch (err) {
      console.error('Error updating vote:', err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, [location]);

  return (
    <div>
      {loading ? (
        <p className='status'>Loading...</p>
      ) : error ? (
        <p className='status'>{error}</p>
      ) : course ? (
        <Course 
          course={course}
          rating={courseRatings}
          status={courseStatus}
          userVote={userVote}
          onRatingSelected={handleRatingSelected}
        />
      ) : (
        <p className='status'>Course not found.</p>
      )}
    </div>
  );
};

export default CoursesPage;
