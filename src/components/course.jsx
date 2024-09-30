import React from 'react';
import { TitleLarge, TitleMedium, BodyMedium } from '../styles/StyledComponents';
import '../styles/course.css';

const CourseDescription = ({ courseData }) => {
  return (
    <div class='title'>
      <TitleMedium>{courseData.name}</TitleMedium>
      <BodyMedium>
        {courseData.description}
        <br />
        Duration: {courseData.duration}
        <br />
        Rating: {courseData.rating}
        <br />
        Instructor: {courseData.instructor}
        <br />
        Category: {courseData.category}
        <br />
        Status: {courseData.status}
        <br />
        {courseData.status !== 'Not enrolled' && (
          <>Meeting ID: <span className="meeting-id">{courseData.meetingID}</span></>
        )}
        </BodyMedium>
    </div>
  );
};

const RatingBar = ({ status, star, ratingMap, onRatingSelected }) => {
  return (
    <div className="rating-bar">
      <TitleMedium>Rating</TitleMedium>
      {Object.entries(ratingMap)
        .sort((a, b) => b[0] - a[0])
        .map(([stars, percentage]) => (
          <RatingRow
            key={stars}
            status={status}
            star={star}
            stars={parseInt(stars)}
            percentage={percentage}
            onClick={() => onRatingSelected(parseInt(stars))}
          />
        ))}
    </div>
  );
};

const RatingRow = ({ status, star, stars, percentage, onClick }) => {
  return (
    <div className="rating-row" onClick={onClick}>
      <p>{stars}</p>
      {status === 'Graduated' && (
        <span>{stars > star ? '☆' : '★'}</span>
      )}
      <div className="bar-container">
        <div className="bar" style={{ width: `${percentage * 100}%` }} />
      </div>
    </div>
  );
};

const ReviewAndEnrollButtons = ({ status }) => {
  return (
    <div className='title'>
      {status === 'Graduated' && (
        <>
          <TitleMedium>Share your thoughts</TitleMedium>
          <BodyMedium>Please share your ideas with others for the benefit of the organization's further development.</BodyMedium>
        </>
      )}
      <div className="review-buttons">
        {status === 'Graduated' ? (
          <>
            <ActionButton label="Write a review" />
            <ActionButton label="Get Certificate" />
          </>
        ) : (
          <ActionButton label="Enroll" />
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

const Course = ({ courseData, onRatingSelected }) => {
  return (
    <div class='course-content'>
      <div class='title'>
        <TitleLarge>{courseData.group}</TitleLarge>
      </div>
      <div class='course-columns'>
        <div class='course-left-column'>
          {/* image */}
        </div>
        <div class='course-right-column'>
          <CourseDescription courseData={courseData} />
          <RatingBar status={courseData.status} star={courseData.star} ratingMap={courseData.ratingMap} onRatingSelected={onRatingSelected} />
          <ReviewAndEnrollButtons status={courseData.status} />
        </div>
      </div>
    </div>
  );
};

export default Course;
