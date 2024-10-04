import React, { useState, useEffect } from 'react';
import { Header, Courses, ContactSection, CourseNotFound } from '../components/courses';

const CoursesPage = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
      .then(response => response.json())
      .then(setCourses)
      .catch(console.error);
  }, []);

  const filterOptions = {
    'Course Group': ['Personal Development', 'Management', 'Digital Marketing', 'Sales Techniques', 'Project Management', 'Innovation', 'Team Dynamics'],
    'Difficulty Level': ['Beginner', 'Intermediate', 'Advanced'],
    'Duration': ['Less than 1 day', '1-3 days', 'More than 3 days'],
    'Learning Method': ['Online', 'In-person', 'Hybrid', 'Self-paced'],
    'Learning Goals': ['Improve Communication Skills', 'Enhance Time Management', 'Build Leadership Skills', 'Foster Team Collaboration', 'Develop Problem-Solving Abilities'],
  };

  const contactSections = [
    {
      title: 'Contact Us',
      info: {
        Address: '123 Corporate Avenue, Bangkok, Thailand 10100',
        Phone: '+66 2 345 6789',
        Email: 'support@trainingcompany.com',
        'Business Hours': 'Monday - Friday, 9:00 AM - 6:00 PM',
      },
    },
    {
      title: 'Follow Us',
      info: {
        Facebook: 'facebook.com/TrainingCompany',
        Twitter: 'twitter.com/TrainingCompany',
        LinkedIn: 'linkedin.com/company/TrainingCompany',
        Instagram: 'instagram.com/TrainingCompany',
      },
    },
    {
      title: 'Legal',
      info: {
        'Privacy Policy': 'privacy-policy.com',
        'Terms of Service': 'terms-of-service.com',
        'Cookie Policy': 'cookie-policy.com',
      },
    },
  ];

  return (
    <div>
      <Header filterOptions={filterOptions} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      {courses.length ? <Courses courses={courses} /> : <CourseNotFound />}
      <ContactSection contactSections={contactSections} />
    </div>
  );
};

export default CoursesPage;
