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

// const RatingBar = ({ status, star, ratingMap, onRatingSelected }) => {
//   return (
//     <div className="rating-bar">
//       <TitleMedium>Rating</TitleMedium>
//       {Object.entries(ratingMap)
//         .sort((a, b) => b[0] - a[0])
//         .map(([stars, percentage]) => (
//           <RatingRow
//             key={stars}
//             status={status}
//             star={star}
//             stars={parseInt(stars)}
//             percentage={percentage}
//             onClick={() => onRatingSelected(parseInt(stars))}
//           />
//         ))}
//     </div>
//   );
// };

// const RatingRow = ({ status, star, stars, percentage, onClick }) => {
//   return (
//     <div className="rating-row" onClick={onClick}>
//       <p>{stars}</p>
//       {status === 'Graduated' && (
//         <span>{stars > star ? '☆' : '★'}</span>
//       )}
//       <div className="bar-container">
//         <div className="bar" style={{ width: `${percentage * 100}%` }} />
//       </div>
//     </div>
//   );
// };

// const ReviewAndEnrollButtons = ({ status }) => {
//   return (
//     <div className='title'>
//       {status === 'Graduated' && (
//         <>
//           <TitleMedium>Share your thoughts</TitleMedium>
//           <BodyMedium>Please share your ideas with others for the benefit of the organization's further development.</BodyMedium>
//         </>
//       )}
//       <div className="review-buttons">
//         {status === 'Graduated' ? (
//           <>
//             <ActionButton label="Write a review" />
//             <ActionButton label="Get Certificate" />
//           </>
//         ) : (
//           <ActionButton label="Enroll" />
//         )}
//       </div>
//     </div>
//   );
// };

const ActionButton = ({ label, onClick }) => {
  return (
    <button className="action-button" onClick={onClick}>
      <BodyMedium>{label}</BodyMedium>
    </button>
  );
};

const Course = ({ course, onRatingSelected }) => {
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
          {/* <RatingBar status={course.status} star={course.star} ratingMap={course.ratingMap} onRatingSelected={onRatingSelected} /> */}
          {/* <ReviewAndEnrollButtons status={course.status} /> */}
        </div>
      </div>
    </div>
  );
};

export default Course;
