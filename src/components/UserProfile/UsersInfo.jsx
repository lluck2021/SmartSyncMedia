import React, { useState, useEffect } from 'react';
import { tokens } from "../../theme";
import { Box, Typography, CircularProgress, useTheme } from '@mui/material';
import image from './menu.png';

const UsersInfo = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">{`Error: ${error}`}</Typography>
      </Box>
    );
  }

  const firstUser = users.length > 0 ? users[0] : null;

  return (
    <Box p={3} m="40px 0 0 0" height="auto">
      {/* Welcome Box */}
      <Box
        p={2}
        m="20px 0"
        sx={{
          border: `2px solid ${colors.primary[200]}`,
          borderRadius: '8px',
          backgroundColor: colors.background.default,
          boxShadow: 2
        }}
      >
        <Typography variant="h4">Welcome Madonna</Typography>
      </Box>

      {/* Display the menu image */}
      <Box display="flex" justifyContent="center" m="20px 0">
        <img src={image}
          alt="Menu"
          width="600"
          height="auto" />

      </Box>

      {firstUser ? (
        <Box>
          <Box display="flex" m="40px 0 0 0" height="auto">
            <Typography variant="h3">Madonna</Typography>
          </Box>
          <Box
            p={4}
            sx={{
              border: `3px solid ${colors.secondary[200]}`,
              borderRadius: '8px',
              backgroundColor: colors.background.default,
              boxShadow: 3,
            }}
          >
            <Typography variant="h3" gutterBottom>
              User Information
            </Typography>
            <Typography variant="h5" p={1}>Username: MaBowie</Typography>
            <Typography variant="h5" p={1}>Email: grmabowie@gmail.com</Typography>
            <Typography variant="h5" p={1}>Phone: (641) 660-3029</Typography>
            <Typography variant="h5" p={1}>Website: https://www.mahaskachamber.org/directory/bridgets_public_house/</Typography>
          </Box>
        </Box>
      ) : (
        <Typography>No users available</Typography>
      )}
    </Box>
  );
};

export default UsersInfo;