import React, { useState, useEffect } from 'react';
import { tokens } from "../../theme";
import { Box, CircularProgress, Typography, TextField, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import './AI_Generator.css';    //CSS is clashing with original theme used on this page


const AI_Generator = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputText, setInputText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [postType, setPostType] = useState('event');
  const [description, setDescription] = useState('');
  const [generatedPost, setGeneratedPost] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [showHeader, setShowHeader] = useState(false); // State to control visibility of the header
  const [showPreview, setShowPreview] = useState(false); // Controls whether to show the image preview

  const handleFiles = (files) => {
    const file = files[0]; // Take the first file for simplicity
    if (file && file.type.startsWith('image/')) {
      const imgURL = URL.createObjectURL(file);
      setImagePreview(imgURL); // Set the image preview
    }
  };

  const switchPages = () => {
    //Take the user to the preview page
    window.location.assign('/AI_Generator_Preview.jsx');
  }

  const generatePost = () => {
    if (description) {
      setGeneratedPost(`${description}`);
      setShowHeader(true); // Show the header when the post is generated
      setShowPreview(true); // Show the preview when the post is generated
    } else {
      setGeneratedPost('Please enter a description.');
      setShowPreview(true); // Show the preview even if the description is empty
    }
  };

  const clearPreview = () => {
    setGeneratedPost('Your post will appear here.');
    setImagePreview('');
    setShowPreview(false); // Reset preview visibility
  };

  const submitPost = () => {
    setGeneratedPost('Post published!');
    setShowPreview(true); // Ensure the preview is shown when the post is submitted
    setImagePreview('');   // Clear the image preview
    
    // Delay clearing the preview and image for a few seconds
    setTimeout(() => {
      setGeneratedPost(''); // Clear the generated post
      setShowPreview(false); // Hide the preview after 3 seconds
      setShowHeader(false);  // Hide the header
    }, 3000); // Delay of 3 seconds
  };

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

    <div className="container">
      <div className="content">

        <div className="left">
          <select className="dropDown" value={postType} 
          onChange={(e) => setPostType(e.target.value)}>
            <option value="Event">Event</option>
            <option value="Daily-special">Daily Special</option>
            <option value="History">History</option>
          </select>
          <textarea
            className="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div
            className="drop-area"
            onClick={() => document.getElementById('file-input').click()}
          >
            <input
              type="file"
              id="file-input"
              onChange={(e) => handleFiles(e.target.files)}
              style={{ display: 'none' }}
            />
            {imagePreview ? (
              <img id="uploadedImage" src={imagePreview} alt="Preview" 
              style={{ maxWidth: '100%', maxHeight: '150px' }} />
            ) : (
              <p>Drag & drop an image here, or click to select one.</p>
            )}
          </div>
          <Button
            variant="contained"
            className ="generate-button"
            //onClick={generatePost}
            onClick={switchPages}
          >
            Generate Image
          </Button>
        </div>
        
        <div className="middle">

        </div>

        <div className="preview">
          <h2>Preview</h2>
          <div className="preview-box">
            {showPreview ? (
              imagePreview ? (
                <div className="image-container">
                  <img src={imagePreview} alt="Preview" className="preview-image" />
                  <div className="text-overlay">
                    {showHeader && <h3 style={{ textAlign: 'center' }}>
                      {postType.charAt(0).toUpperCase() + postType.slice(1)}</h3>}
                    <p>{generatedPost || 'Your post will appear here.'}</p>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <h3>{postType}</h3>
                  <p>{generatedPost || 'Your post will appear here.'}</p>
                </div>
              )
            ) : (
              <div style={{ textAlign: 'center' }}>
                <p>Your preview will appear here once you generate a post.</p>
              </div>
            )}
          </div>
          <div class='submitButtons'>
            <button className="accept" onClick={submitPost}>SUBMIT</button>
            <button className="deny" onClick={() => {
            setGeneratedPost(''); setImagePreview(''); setShowHeader(false);
            setShowPreview(false); }}>CANCEL</button>
          </div>
        </div>
        

      </div>
    </div>
    </Box>
    
  );
};

export default AI_Generator;
