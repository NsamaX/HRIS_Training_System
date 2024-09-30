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

const UserInfoBox = ({ employee }) => {
  const hasName = employee.first_name && employee.last_name;

  return (
    <div className="user-info-box">
      <div className="user-icon"></div>
      <div className="user-info-text">
        <TitleMedium>Name: {`${employee.first_name || ''} ${employee.last_name || ''}`}</TitleMedium>
        <BodyMedium>Email: {employee.email}</BodyMedium>
        <BodyMedium>Position: {employee.position}</BodyMedium>
        <BodyMedium>Department: {employee.department}</BodyMedium>
        <BodyMedium>Start Date: {hasName ? new Date(employee.date_joined).toLocaleDateString() : ''}</BodyMedium>
      </div>
    </div>
  );
};

const CourseRecently = ({ courses, handleClick }) => {
  return (
    <div className={courses.length > 0 ? 'course-grid has-courses' : 'course-grid'}>
      {courses.slice(0, 4).map((course, index) => (
        <div key={index} className='course-widget' onClick={() => handleClick(course.id)}>
          <BodySmall>{getInitials(course.name)}</BodySmall>
        </div>
      ))}
    </div>
  );
};

const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('');
};

const ProgressSection = ({ completed, incomplete, enrolled, windowWidth }) => {
  console.log(completed, incomplete, enrolled);
  const total = completed + incomplete + enrolled;
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
          {renderProgressCircle(cumulativePercentage.enrolled, enrolled === 0 ? '#D9D9D9' : '#3C4252')}
          {renderProgressCircle(cumulativePercentage.incomplete, incomplete === 0 ? '#D9D9D9' : '#FFC501')}
          {renderProgressCircle(cumulativePercentage.completed, completed === 0 ? '#D9D9D9' : '#25D79B', `${total} Total`, '#3C4252')}
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

const CompletedCourses = ({ courses, handleClick, windowWidth }) => {
  return (
    <div className="achievements-container">
      <TitleMedium>Completed Courses</TitleMedium>
      {courses.map((course, index) => (
        <CompletedCourseRow
          key={index}
          name={course.name}
          description={course.description}
          id={course.id}
          handleClick={handleClick}
          windowWidth={windowWidth}
        />
      ))}
    </div>
  );
};

const CompletedCourseRow = ({ name, description, id, handleClick, windowWidth }) => {
  return (
    <div className='achievement-column'>
      {windowWidth <= 600 && (
        <>
          <br />
          <hr />
        </>
      )}
      <div className="suggested-course-row" onClick={() => handleClick(id)}>
        <div className="suggested-course-icon"></div>
        <div className="archievement-text">
          <TitleSmall>{name}</TitleSmall>
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

const SuggestedCourses = ({ courses, handleClick, windowWidth }) => {
  return (
    <div className="achievements-container">
      <TitleMedium>Suggested Courses</TitleMedium>
      {courses.map((course, index) => (
        <SuggestedCourseRow
          key={index}
          name={course.name}
          description={course.description}
          score={course.score}
          id={course.id}
          handleClick={handleClick}
          windowWidth={windowWidth}
        />
      ))}
    </div>
  );
};

const SuggestedCourseRow = ({ name, description, score, id, handleClick, windowWidth }) => {
  return (
    <div className='archievement-column'>
      {windowWidth <= 600 && (
        <>
          <br />
          <hr />
        </>
      )}
      <div className="suggested-course-row" onClick={() => handleClick(id)}>
        <div className="suggested-course-icon"></div>
        <div className="archievement-text">
          <div className="suggested-course-score">
            <TitleSmall className='course-score-text'>{name}</TitleSmall>
            {score !== null && (
              <>
                <BodyMedium>{score}</BodyMedium>
                <BodyMedium className='course-score-icon' style={{ color: '#FFC501' }}>★</BodyMedium>
              </>
            )}
          </div>
          <BodySmall>{description}</BodySmall>
        </div>
      </div>
    </div>
  );
};

const CourseRow = ({ course, handleClick }) => {
  return (
    <tr onClick={() => handleClick(course.id)}>
      <td data-label="Assign By:"><BodyMedium>{course.assign_by}</BodyMedium></td>
      <td data-label="Enroll Date:"><BodyMedium>{new Date(course.enrollment_date).toLocaleDateString()}</BodyMedium></td>
      <td data-label="Course Name:"><BodyMedium>{course.name}</BodyMedium></td>
      <td data-label="Start Date:"><BodyMedium>{new Date(course.date_start).toLocaleDateString()}</BodyMedium></td>
      <td data-label="End Date:"><BodyMedium>{new Date(course.date_end).toLocaleDateString()}</BodyMedium></td>
      <td data-label="Duration:"><BodyMedium>{course.duration}</BodyMedium></td>
      <td data-label="Status:"><BodyMedium>{course.status}</BodyMedium></td>
    </tr>
  );
};

const Dashboard = ({ employee, recentlyCourses, status, completedCourses, achievements, suggestedCourses, courses }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleClick = (id) => {
    navigate(`/course/${id}`);
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
                <ProgressSection 
                  completed={status.completed} 
                  incomplete={status.incomplete} 
                  enrolled={status.enrolled} 
                  windowWidth={windowWidth} 
                />
                {windowWidth >= 800 && (
                  <CompletedCourses courses={completedCourses} handleClick={handleClick} windowWidth={windowWidth} />
                )}
              </div>
            </Box>
          </div>
          <div className="row-box">
            <Box left={true} flex={5}>
              <Archievements achievements={achievements} windowWidth={windowWidth} />
            </Box>
            <Box left={false} flex={5}>
              <SuggestedCourses courses={suggestedCourses} handleClick={handleClick} windowWidth={windowWidth} />
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
            <th><TitleSmall>Enroll Date</TitleSmall></th>
            <th><TitleSmall>Course Name</TitleSmall></th>
            <th><TitleSmall>Start Date</TitleSmall></th>
            <th><TitleSmall>End Date</TitleSmall></th>
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
