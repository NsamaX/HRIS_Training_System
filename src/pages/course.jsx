import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Course from '../components/course';

const fetchCourseData = async (course_id) => {
  const response = await fetch(`http://localhost:5000/api/courses?id=${course_id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch course data');
  }
  return response.json();
};

const CoursesPage = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [error, setError] = useState(null);
  const initialStar = courseData?.rating.vote;
  const ratingMap = courseData?.rating.star;

  const [star, setStar] = useState(initialStar || 0);

  useEffect(() => {
    const loadCourseData = async () => {
      try {
        const data = await fetchCourseData(id);
        setCourseData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadCourseData();
  }, [id]);

  const handleRatingSelected = (selectedStars) => {
    if (selectedStars === star) {
      setStar(0);
    } else {
      setStar(selectedStars);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!courseData) {
    return <div>Loading...</div>;
  }

  return (
    <Course 
      courseData={courseData}
      star={star}
      ratingMap={ratingMap}
      onRatingSelected={handleRatingSelected}
    />
  );
};

export default CoursesPage;
