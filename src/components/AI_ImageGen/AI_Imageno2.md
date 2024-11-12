import React, { useState, useRef, useEffect } from 'react';
import { tokens } from "../../theme";
import { Box, Typography, CircularProgress, useTheme, TextField, Button } from '@mui/material';
import default_image from "./assets/Background_image.jpg";
import background_image from "./assets/transparent.png";

const AI_Image = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //AI IMAGE GENERATION

  const [image_url, setImageUrl] = useState("/");
  const inputRef = useRef();

  const imageGenerator = async (input) => {
    if (inputRef.current.value === "") {
      return 0;
    }
    console.log(inputRef.current.value);

    const response = await fetch(`https://api.openai.com/v1/images/generations`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':
            `Bearer sk-2nkD4eEHTP37NaPD2Rxhun9S3QFZRH2pFa5TMeUM4OT3BlbkFJFOFtk_7oGNLEEKeDbxaBYuoVwBs1gLnD9Fa5n9ihIA`,
          'User-Agent': 'Chrome',
        },
        body: JSON.stringify({
          prompt: '${inputRef.current.value}',
          n: 1,
          size: "512x512",
        }),
      }
    );
    let data = await response.json();
    let data_array = data.data;
    console.log(data);
    setImageUrl(data_array[0].url);
  }


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
              fontSize: 100, // Set font size
              fontWeight: 'bold', // Set font weight
              color: "orange", // Set text color
              fontFamily: 'Lobster, cursive', // Apply the fancy font
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
        <Box
          sx={{
            p: 3,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: 'column',
            width: "1000px",
          }}

        >
          <TextField
            id="outlined-controlled"
            label="USER INPUT"
            inputRef={inputRef}  //GET VALUE
            style={{
              width: "100%",
              height: "10%",
            }}
            sx={{
              backgroundColor: colors.secondary[900],
              flex: 1,
              boxShadow: 3,
              borderWidth: 1,
              padding: 0.5
            }}
          />

          <Button
            onClick={() => { imageGenerator() }}
            sx={{
              backgroundColor: "orange",
              boxShadow: 3,

            }}
          >
            Generate Image
          </Button>

        </Box>



        <Box
          component="img"
          alt="AI Image"
          src={image_url === "/" ? default_image : image_url}
          style={{
            width: "600px",
            height: "600px",
            objectFit: "cover",
          }}
          sx={{
            border: `3px solid ${colors.secondary[200]}`,
            borderRadius: '8px',
            backgroundColor: colors.background.default,
            boxShadow: 3,
            p: 1
          }}
        />


      </Box>
    </>




  );
};

export default AI_Image;
