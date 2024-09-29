import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import DashboardPage from './pages/dashboard';
import CoursesPage from './pages/courses';
import CoursePage from './pages/course';
import CustomAppBar from './components/customAppBar';

const App = () => {
  const location = useLocation(); 

  const getSelectedPage = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 0; 
      case '/courses':
        return 1; 
      case '/course':
        return -1; 
      default:
        return 0;
    }
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
