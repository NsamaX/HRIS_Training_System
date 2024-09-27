import React, { useState } from 'react';
import { Header, Courses, ContactSection, CourseNotFound } from '../components/courses';

const filterOptions = {
  'Course Group': [
    'Personal Development',
    'Management',
    'Digital Marketing',
    'Sales Techniques',
    'Project Management',
    'Innovation',
    'Team Dynamics',
  ],
  'Difficulty Level': [
    'Beginner',
    'Intermediate',
    'Advanced',
  ],
  'Duration': [
    'Less than 1 day',
    '1-3 days',
    'More than 3 days',
  ],
  'Learning Method': [
    'Online',
    'In-person',
    'Hybrid',
    'Self-paced',
  ],
  'Learning Goals': [
    'Improve Communication Skills',
    'Enhance Time Management',
    'Build Leadership Skills',
    'Foster Team Collaboration',
    'Develop Problem-Solving Abilities',
  ],
};

const courses = [
  {
    'id': '1',
    'name': 'Digital Marketing',
    'details': {
      'Group': 'Online Strategies',
      'Instructor': 'Kanya Wong',
      'Start Date': '20 March 2024',
      'Duration': '1 day (8 hours)',
    },
    'rating': {
      'score': 4.5,
      'star': {
        5: 0.6,
        4: 0.25,
        3: 0.1,
        2: 0.04,
        1: 0.01,
      },
      'vote': 0,
    },
  },
];

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

const CoursesPage = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    'Course Group': '',
    'Difficulty Level': '',
    'Duration': '',
    'Learning Method': '',
    'Learning Goals': '',
  });

  return (
    <div>
      <Header filterOptions={filterOptions} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      
      {courses.length === 0 ? (
        <CourseNotFound />
      ) : (
        <Courses courses={courses} />
      )}

      <ContactSection contactSections={contactSections} />
    </div>
  );
};

export default CoursesPage;
