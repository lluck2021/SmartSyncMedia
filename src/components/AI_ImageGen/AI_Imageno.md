import React, { useState, useRef } from 'react';
import { Box, Typography, CircularProgress, useTheme, TextField, Button } from '@mui/material';
import default_image from "./assets/Background_image.jpg";
import background_image from "./assets/transparent.png";

const AI_Image = () => {
  const theme = useTheme();
  const [imageUrl, setImageUrl] = useState("/");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef();

  const imageGenerator = async () => {
    const input = inputRef.current.value;

    if (!input) {
      alert("Please enter a prompt.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.openai.com/v1/images/generations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Using environment variable for API key
          'User-Agent': 'Chrome',
        },
        body: JSON.stringify({
          prompt: input,
          n: 1,
          size: "512x512",
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }

      const data = await response.json();
      const imageUrl = data.data && data.data[0]?.url;

      if (imageUrl) {
        setImageUrl(imageUrl);
      } else {
        setError('No image generated. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while generating the image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="flex-start" padding={2} height="150px" width="100%">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="150px"
          width="100%"
          marginBottom={2}
          sx={{
            backgroundImage: `url(${background_image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '8px',
            boxShadow: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: 100,
              fontWeight: 'bold',
              color: "orange",
              fontFamily: 'Lobster, cursive',
            }}
          >
            <span style={{ color: "green" }}>AI</span>
            <span style={{ color: "orange" }}> Generator</span>
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          borderRadius: '8px',
          backgroundColor: "white",
          boxShadow: 3,
          m: 2,
          p: 2,
          display: "inline-flex",
          alignItems: "left",
          justifyContent: "space-between",
          flexDirection: 'column',
          marginTop: 8,
        }}
      >
        <Box sx={{ p: 3, alignItems: "center", justifyContent: "space-between", flexDirection: 'column', width: "100%" }}>
          <TextField
            id="outlined-controlled"
            label="USER INPUT"
            inputRef={inputRef}
            style={{ width: "100%", height: "10%" }}
            sx={{
              backgroundColor: 'white',
              flex: 1,
              boxShadow: 3,
              borderWidth: 1,
              padding: 0.5
            }}
          />

          <Button
            onClick={imageGenerator}
            sx={{
              backgroundColor: "orange",
              boxShadow: 3,
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="white" /> : 'Generate Image'}
          </Button>
        </Box>

        {error && (
          <Typography color="error" sx={{ textAlign: "center", mt: 2 }}>
            {error}
          </Typography>
        )}

        {/* Loading state visual */}
        {loading && !imageUrl && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
            <CircularProgress size={60} color="primary" />
          </Box>
        )}

        {/* Image display */}
        <Box
          component="img"
          alt="AI Image"
          src={imageUrl === "/" ? default_image : imageUrl}
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "800px",
            objectFit: "cover",
            marginTop: 20,
          }}
          sx={{
            border: `3px solid ${theme.palette.primary.main}`,
            borderRadius: '8px',
            backgroundColor: 'white',
            boxShadow: 3,
            p: 1
          }}
        />
      </Box>
    </>
  );
};

export default AI_Image;
