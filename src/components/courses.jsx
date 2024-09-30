import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TitleLarge, TitleMedium, BodyLarge, BodyMedium, BodySmall } from '../styles/StyledComponents';
import '../styles/courses.css';

const Header = ({ filterOptions }) => {
  return (
    <header>
      <div className="header">
        <TitleLarge className="header-title">Empower Your Journey</TitleLarge>
        <div>
          <BodyLarge className="header-subtitle">Explore courses designed to elevate your skills and enhance your career. Start learning today, and achieve your goals.</BodyLarge>
        </div>
        <div className="search-box">
          <BodyMedium>Search courses...</BodyMedium>
          <IconButton><SearchIcon /></IconButton>
        </div>
      </div>
      <div className='separator'>
        <Separator filterOptions={filterOptions} />
      </div>
    </header>
  );
};

const Separator = ({ filterOptions }) => {
  const buildFilterButton = (filter) => (
    <Button variant="outlined" className="filter-button" key={filter}>
      <BodyMedium>{filter}</BodyMedium>
    </Button>
  );

  return (
    <section className="separator">
      {Object.keys(filterOptions).map((filter) => buildFilterButton(filter))}
    </section>
  );
};

const FilterButton = ({ filter, selectedFilters, setSelectedFilters, filterOptions }) => {
  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedFilters((prev) => ({
      ...prev,
      [filter]: newValue === 'Cancel' ? null : newValue,
    }));
  };

  return (
    <div className="filter-button-container">
      <FormControl variant="outlined" fullWidth>
        <InputLabel>{filter}</InputLabel>
        <Select
          value={selectedFilters[filter] || ''}
          onChange={handleChange}
          displayEmpty
          className="filter-select"
          IconComponent={() => <span className="filter-icon">▼</span>}
        >
          {filterOptions[filter]?.map((value) => (
            <MenuItem key={value} value={value}>{value}</MenuItem>
          ))}
          <MenuItem value="Cancel">Cancel</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

const CourseNotFound = () => {
  return (
    <div className="course-not-found">
      <TitleLarge>No courses found 404.</TitleLarge>
    </div>
  );
};

const Courses = ({ courses }) => {
  return (
    <div className="course-list">
      <TitleLarge>Courses</TitleLarge>
      <CourseList courses={courses} />
    </div>
  );
};

const CourseList = ({ courses }) => {
  return (
    <div className="course-list-container">
      {courses.map((course) => {
        return (
          <div key={course.course_id}>
            <CourseBox course={course} />
          </div>
        );
      })}
    </div>
  );
};

const CourseBox = ({ course }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/course/${course.course_id}`);
  };

  return (
    <article className="course-box">
      <div className="course-image" onClick={handleClick}>
        {/* image */}
      </div>
      <div className="course-info title">
        <TitleMedium onClick={handleClick}>{course.name}</TitleMedium>
        <BodyMedium onClick={handleClick}>{course.description}</BodyMedium>
        <BodyMedium onClick={handleClick}>Duration: {course.duration} days</BodyMedium>
        <BodyMedium onClick={handleClick}>Start Date: {new Date(course.date_start).toLocaleDateString()}</BodyMedium>
        <BodyMedium onClick={handleClick}>End Date: {new Date(course.date_end).toLocaleDateString()}</BodyMedium>
        <BodyMedium onClick={handleClick}>Group Name: {course.group_name}</BodyMedium>
      </div>
    </article>
  );
};

const ContactSection = ({ contactSections }) => {
  return (
    <footer className="contact-section">
      <div className="contact-box">
        <div className="contact-info">
          {contactSections.map((section) => (
            <div key={section.title} className="contact-item">
              <InfoSection title={section.title} info={section.info} />
            </div>
          ))}
        </div>
      </div>
      <BodySmall className="footer-text">© 2024 Training Company Ltd. All rights reserved.</BodySmall>
    </footer>
  );
};

const InfoSection = ({ title, info }) => {
  return (
    <section className="info-section title">
      <TitleMedium>{title}</TitleMedium>
      {Object.entries(info).map(([key, value]) => (
        <BodyMedium key={key}>{`${key}: ${value}`}</BodyMedium>
      ))}
    </section>
  );
};

export { Header, CourseNotFound, Courses, ContactSection };
