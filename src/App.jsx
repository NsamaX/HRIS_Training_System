import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import DashboardPage from './EMP/dashboard';
import CoursesPage from './EMP/courses';
import CoursePage from './EMP/course';
import CustomAppBar from './components/customAppBar';

const App = () => {
  const location = useLocation();

  const getSelectedPage = () => {
    const pageMap = {
      '/dashboard': 0,
      '/courses': 1,
      '/course': -1,
    };
    return pageMap[location.pathname] || 0;
  };

  return (
    <>
      <CustomAppBar selectedPage={getSelectedPage()} />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/course" element={<CoursePage />} />
      </Routes>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
