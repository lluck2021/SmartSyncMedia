import React, { useState, useEffect } from 'react';
import { tokens } from "../../theme";
import { Box, CircularProgress, Typography, TextField, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const AI_Generator = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputText, setInputText] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Your data fetching logic here
    // Example: fetchPosts().then(...).catch(setError).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress/>
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

  return (
    <Box p={3} m="40px 0 0 0" height="10vh">
      <TextField
        label="Enter text"
        variant="outlined"
        fullWidth
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        sx={{
          marginBottom: 2,
          bgcolor: 'black', // Set background color to black
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white', // Set border color to white
            },
            '&:hover fieldset': {
              borderColor: 'gray', // Change border color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: 'lightgray', // Change border color when focused
            },
          },
          color: 'white', // Set text color to white
        }}
      />
      <Box
        width="100%"
        height="200px"
        border={`2px dashed ${colors.primary[200]}`} // Use theme colors directly
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor={colors.primaryAccent[200]}
        sx={{ position: 'relative' }}
      >
        {/* Placeholder for the image */}
        {imageUrl ? (
          <img src={imageUrl} alt="Generated" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <Typography color={colors.primary[200]}>Image will appear here</Typography>
        )}
      </Box>
      <Button
        variant="contained"
        color="error" // Set button color to red
        onClick={() => {
          // Logic to set the image URL
        }}
        sx={{ marginTop: 2 }}
      >
        Generate Image
      </Button>
    </Box>
  );
};

export default AI_Generator;
