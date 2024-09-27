import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Button, Tooltip } from '@mui/material';
import { CalendarMonthRounded, MenuBookRounded, NotificationsNoneRounded, MailOutlineRounded, LogoutRounded } from '@mui/icons-material';
import '../styles/customAppBar.css';

const CustomAppBar = ({ selectedPage }) => {
  const navigate = useNavigate(); 

  const navItemsLeft = [
    { text: 'Dashboard', icon: <CalendarMonthRounded />, index: 0, path: '/dashboard' },
    { text: 'Courses', icon: <MenuBookRounded />, index: 1, path: '/courses' },
  ];

  const navItemsRight = [
    { text: 'Notification', icon: <NotificationsNoneRounded />, index: -1 },
    { text: 'example@gmail.com', icon: <MailOutlineRounded />, index: -1 },
    { text: 'Signout', icon: <LogoutRounded />, index: -1 },
  ];

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  const handleSignout = () => {
    console.log('User signed out');
    navigate('/signin');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <div className="toolbar-container">
          {navItemsLeft.map((item, idx) => (
            <Button
              key={idx}
              color={selectedPage === item.index ? 'inherit' : 'secondary'}
              onClick={() => handleNavigation(item.path)}
              startIcon={item.icon}
              className={`nav-button ${selectedPage === item.index ? 'active' : ''}`} 
            >
              {item.text}
            </Button>
          ))}
        </div>
        <div>
          {navItemsRight.map((item, idx) => (
            <Tooltip key={idx} title={item.text}>
              <IconButton
                className="icon-button" 
                color="inherit"
                onClick={item.text === 'Signout' ? handleSignout : null}
              >
                {item.icon}
              </IconButton>
            </Tooltip>
          ))}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
