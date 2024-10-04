import React from 'react';
import { TitleLarge, TitleMedium, BodyMedium } from '../styles/StyledComponents';
import '../styles/course.css';

const CourseDescription = ({ course }) => {
  console.log(course);
  return (
    <div className='title'>
      <TitleMedium>{course.name}</TitleMedium>
      <BodyMedium>
        {course.description}
        <br />
        Duration: {course.duration} hours 
        <br />
        Rating: {course.score != null ? course.score : 'N/A'}
        <br />
        Instructor: {course.instructor}
        <br />
        Start Date: {new Date(course.date_start).toLocaleDateString()}
        <br />
        End Date: {new Date(course.date_end).toLocaleDateString()}
        <br />
        {course.platform}
      </BodyMedium>
    </div>
  );
};

const RatingBar = ({ status, ratingMap, userVote, onRatingSelected }) => {
  const totalVotes = Array.from(ratingMap.values()).reduce((a, b) => a + b, 0);

  return (
    <div className="rating-bar">
      <TitleMedium>Rating</TitleMedium>
      {Array.from(ratingMap.entries())
        .sort((a, b) => b[0] - a[0])
        .map(([star, votes]) => {
          const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
          return (
            <RatingRow
              key={star}
              status={status}
              star={star}
              vote={userVote}
              percentage={percentage}
              onClick={() => onRatingSelected(star)}
            />
          );
        })}
    </div>
  );
};

const RatingRow = ({ status, star, vote, percentage, onClick }) => {
  return (
    <div className="rating-row" onClick={status === 'completed' ? onClick : null}>
      <BodyMedium>{star}</BodyMedium>
      <p className={star <= vote.vote ? "vote" : ""}>★</p>
      <div className="bar-container">
        <div className="bar" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};

const ReviewAndEnrollButtons = ({ status, onEnroll }) => {
  return (
    <div className='title'>
      {status === 'completed' && (
        <>
          <TitleMedium>Share your thoughts</TitleMedium>
          <BodyMedium>Please share your ideas with others for the benefit of the organization's further development.</BodyMedium>
        </>
      )}
      <div className="review-buttons">
        {status === 'completed' ? (
          <>
            <ActionButton label="Write a review" />
            <ActionButton label="Get Certificate" />
          </>
        ) : (
          <ActionButton label="Enroll" onClick={onEnroll} />
        )}
      </div>
    </div>
  );
};

const ActionButton = ({ label, onClick }) => {
  return (
    <button className="action-button" onClick={onClick}>
      <BodyMedium>{label}</BodyMedium>
    </button>
  );
};

const Course = ({ course, rating, status, userVote, onRatingSelected, onEnroll }) => {
  return (
    <div className='course-content'>
      <div className='title'>
        <TitleLarge>{course.group_name}</TitleLarge>
      </div>
      <div className='course-columns'>
        <div className='course-left-column'>
          {/* image */}
        </div>
        <div className='course-right-column'>
          <CourseDescription course={course} />
          {status === 'completed' && (
            <RatingBar 
              status={status} 
              ratingMap={rating} 
              userVote={userVote}
              onRatingSelected={onRatingSelected} 
            />
          )}
          <ReviewAndEnrollButtons status={status} onEnroll={onEnroll} />
        </div>
      </div>
    </div>
  );
};

export default Course;
