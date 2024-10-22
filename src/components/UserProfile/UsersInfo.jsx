import React, { useState, useEffect } from 'react';
import { tokens } from "../../theme";
import { Box, Typography, CircularProgress, useTheme } from '@mui/material';

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
    <Box p={3} m="40px 0 0 0" height="10vh">
      {firstUser ? (
        <Box>
          <Box display="flex" m="40px 0 0 0" height="auto">
            <Typography variant="h3">{firstUser.name}</Typography>
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
            <Typography variant="h5" p={1}>Username: {firstUser.username}</Typography>
            <Typography variant="h5" p={1}>Email: {firstUser.email}</Typography>
            <Typography variant="h5" p={1}>Phone: {firstUser.phone}</Typography>
            <Typography variant="h5" p={1}>Website: {firstUser.website}</Typography>
          </Box>
        </Box>
      ) : (
        <Typography>No users available</Typography>
      )}
    </Box>
  );
};

export default UsersInfo;
