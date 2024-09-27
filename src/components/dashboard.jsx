import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { TitleLarge, TitleSmall, BodyMedium, BodySmall, TitleMedium } from '../styles/StyledComponents';
import '../styles/dashboard.css';

const Box = ({ left, flex, children }) => (
  <div className={`box ${flex <= 3 ? 'smaller-box' : null} ${left ? 'left-box' : 'right-box'}`} style={{ flex: flex }}>
    {children}
  </div>
);

const getInitials = (courseName) => {
  return courseName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('');
};

const CourseRecently = ({ courses, handleClick }) => {
  return (
    <div className={courses.length > 0 ? 'course-grid has-courses' : 'course-grid'}>
      {courses.slice(0, 4).map((course, index) => (
        <div key={index} className='course-widget' onClick={() => handleClick(course.courseId)}>
          <BodySmall>{getInitials(course.name)}</BodySmall>
        </div>
      ))}
    </div>
  );
};

const ProgressSection = ({ completed, incomplete, enrolled, total, windowWidth }) => {
  const percentages = {
    completed: (completed / total) * 100,
    incomplete: (incomplete / total) * 100,
    enrolled: (enrolled / total) * 100,
  };

  const cumulativePercentage = {
    enrolled: percentages.enrolled + percentages.incomplete + percentages.completed,
    incomplete: percentages.incomplete + percentages.completed,
    completed: percentages.completed,
  };

  const renderProgressCircle = (value, color, text = '', textColor = '#3C4252') => (
    <div className="circle-wrapper">
      <CircularProgressbar
        value={value}
        text={text}
        styles={buildStyles({
          textSize: '16px',
          pathColor: color,
          textColor: textColor,
          trailColor: 'transparent',
        })}
      />
    </div>
  );

  return (
    <div className="progress-section">
      <div className="progress-info">
        <TitleMedium>Progress</TitleMedium>
        <div className="progress-circle">
          {renderProgressCircle(cumulativePercentage.enrolled, '#3C4252')}
          {renderProgressCircle(cumulativePercentage.incomplete, '#FFC501')}
          {renderProgressCircle(cumulativePercentage.completed, '#25D79B', `${total} Total`, '#3C4252')}
        </div>
      </div>
      {windowWidth >= 600 && (
        <div className="progress-details">
          {[
            { label: 'Completed', value: completed, color: '#25D79B' },
            { label: 'Incomplete', value: incomplete, color: '#FFC501' },
            { label: 'Enrolled', value: enrolled, color: '#3C4252' },
          ].map(({ label, value, color }) => (
            <div className="progress-row" key={label}>
              <div className="progress-color-box" style={{ backgroundColor: color }}></div>
              <div className="progress-text">
                <BodyMedium>{label}</BodyMedium>
                <BodyMedium>{value}</BodyMedium>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CompletedCourses = ({ completedCourses, handleClick, windowWidth }) => {
  return (
    <div className="achievements-container">
      <TitleMedium>Completed Courses</TitleMedium>
      {completedCourses.map((course, index) => (
        <CompletedCourseRow
          key={index}
          courseName={course.name}
          description={course.description}
          courseId={course.courseId}
          handleClick={handleClick}
          windowWidth={windowWidth}
        />
      ))}
    </div>
  );
};

const CompletedCourseRow = ({ courseName, description, courseId, handleClick, windowWidth }) => {
  return (
    <div className='achievement-column'>
      {windowWidth <= 600 && (
        <>
          <br />
          <hr />
        </>
      )}
      <div className="suggested-course-row" onClick={() => handleClick(courseId)}>
        <div className="suggested-course-icon"></div>
        <div className="archievement-text">
          <TitleSmall>{courseName}</TitleSmall>
          <BodySmall>{description}</BodySmall>
        </div>
      </div>
    </div>
  );
};

const Archievements = ({ achievements, windowWidth }) => {
  return (
    <div className="achievements-container">
      <TitleMedium>Archievements</TitleMedium>
      {achievements.map((achievement, index) => (
        <ArchievementRow 
          key={index} 
          name={achievement.name} 
          description={achievement.description} 
          windowWidth={windowWidth}
        />
      ))}
    </div>
  );
};

const ArchievementRow = ({ name, description, windowWidth }) => {
  return (
    <div className='archievement-column'>
      {windowWidth <= 600 && (
        <>
          <br />
          <hr />
        </>
      )}
      <div className="archievement-row">
        <div className="archievement-icon"></div>
        <div className="archievement-text">
          <TitleSmall>{name}</TitleSmall>
          <BodySmall>{description}</BodySmall>
        </div>
      </div>
    </div>
  );
};

const SuggestedCourses = ({ suggestedCourses, handleClick, windowWidth }) => {
  return (
    <div className="achievements-container">
      <TitleMedium>Suggested Courses</TitleMedium>
      {suggestedCourses.map((course, index) => (
        <SuggestedCourseRow
          key={index}
          rating={course.rating}
          courseName={course.name}
          description={course.description}
          courseId={course.courseId}
          handleClick={handleClick}
          windowWidth={windowWidth}
        />
      ))}
    </div>
  );
};

const SuggestedCourseRow = ({ rating, courseName, description, courseId, handleClick, windowWidth }) => {
  return (
    <div className='archievement-column'>
      {windowWidth <= 600 && (
        <>
          <br />
          <hr />
        </>
      )}
      <div className="suggested-course-row" onClick={() => handleClick(courseId)}>
        <div className="suggested-course-icon"></div>
        <div className="archievement-text">
          <div className="suggested-course-rating">
            <TitleSmall className='course-rating-text'>{courseName}</TitleSmall>
            <BodyMedium>{rating}</BodyMedium>
            <BodyMedium className='course-rating-icon' style={{ color: '#FFC501' }}>★</BodyMedium>
          </div>
          <BodySmall>{description}</BodySmall>
        </div>
      </div>
    </div>
  );
};

const UserInfoBox = ({ employee }) => {
  return (
    <div className="user-info-box">
      <div className="user-icon"></div>
      <div className="user-info-text">
        <TitleMedium>Name: {employee.name}</TitleMedium>
        <BodyMedium>Position: {employee.position}</BodyMedium>
        <BodyMedium>Department: {employee.department}</BodyMedium>
        <BodyMedium>Start Date: {employee.startDate}</BodyMedium>
        <BodyMedium>Email: {employee.email}</BodyMedium>
        <BodyMedium>Tel: {employee.tel}</BodyMedium>
      </div>
    </div>
  );
};

const CourseRow = ({ course, handleClick }) => {
  return (
    <tr onClick={() => handleClick(course.courseId)}>
      <td data-label="Assign By:"><BodyMedium>{course.assignBy}</BodyMedium></td>
      <td data-label="Date:"><BodyMedium>{course.date}</BodyMedium></td>
      <td data-label="Course Name:"><BodyMedium>{course.courseName}</BodyMedium></td>
      <td data-label="Platform:"><BodyMedium>{course.platform}</BodyMedium></td>
      <td data-label="Start Date:"><BodyMedium>{course.startDate}</BodyMedium></td>
      <td data-label="Duration:"><BodyMedium>{course.duration}</BodyMedium></td>
      <td data-label="Status:"><BodyMedium>{course.status}</BodyMedium></td>
    </tr>
  );
};

const Dashboard = ({ employee, achievements, completedCourses, courses, status, recentlyCourses, suggestedCourses }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='dashboard'>
      {windowWidth < 1200 && (
        <div className='user-box'>
          <UserInfoBox employee={employee} />
        </div>
      )}
      <div className="box-container">
        <div className={`column-container`}>
          <div className="row-box">
            <Box left={true} flex={windowWidth >= 600 ? 3 : 5}>
              <div className="recent-courses">
                <TitleMedium>Recently Courses</TitleMedium>
                <CourseRecently courses={recentlyCourses} handleClick={handleClick} />
              </div>
            </Box>
            <Box left={false} flex={windowWidth >= 900 ? 7 : 5}>
              <div className="progress-container">
                <ProgressSection completed={status.completed} incomplete={status.incomplete} enrolled={status.enrolled} total={status.completed + status.incomplete + status.enrolled} windowWidth={windowWidth} />
                {windowWidth >= 800 && (
                  <CompletedCourses completedCourses={completedCourses} handleClick={handleClick} windowWidth={windowWidth} />
                )}
              </div>
            </Box>
          </div>
          <div className="row-box">
            <Box left={true} flex={5}>
              <Archievements achievements={achievements} windowWidth={windowWidth} />
            </Box>
            <Box left={false} flex={5}>
              <SuggestedCourses suggestedCourses={suggestedCourses} handleClick={handleClick} windowWidth={windowWidth} />
            </Box>
          </div>
        </div>
        {windowWidth >= 1200 && (
          <div className='user-box'>
            <UserInfoBox employee={employee} />
          </div>
        )}
      </div>
      <TitleLarge>My Courses</TitleLarge>
      <table>
        <thead>
          <tr>
            <th><TitleSmall>Assign by</TitleSmall></th>
            <th><TitleSmall>Date</TitleSmall></th>
            <th><TitleSmall>Course Name</TitleSmall></th>
            <th><TitleSmall>Platform</TitleSmall></th>
            <th><TitleSmall>Start Date</TitleSmall></th>
            <th><TitleSmall>Duration</TitleSmall></th>
            <th><TitleSmall>Status</TitleSmall></th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <CourseRow key={index} course={course} handleClick={handleClick} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
