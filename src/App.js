import React, { useState } from 'react';
import './App.css';

function App() {
  const [postType, setPostType] = useState('event');
  const [description, setDescription] = useState('');
  const [generatedPost, setGeneratedPost] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const handleFiles = (files) => {
    const file = files[0]; // Take the first file for simplicity
    if (file && file.type.startsWith('image/')) {
      const imgURL = URL.createObjectURL(file);
      setImagePreview(imgURL); // Set the image preview
    }
  };

  const generatePost = () => {
    setGeneratedPost(`Generated post for type: ${postType}, description: ${description}, ${imagePreview}`);
  };

  return (
    <div className="container">
      <h1 className="heading">SmartSync Media</h1>
      <div className="content">

        <div className="left">
          <select value={postType} onChange={(e) => setPostType(e.target.value)}>
            <option value="event">Event</option>
            <option value="daily-special">Daily Special</option>
            <option value="history">History</option>
          </select>
          <textarea
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
              <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '150px' }} />
            ) : (
              <p>Drag & drop an image here, or click to select one.</p>
            )}
          </div>
          <button className="generate-button" onClick={generatePost}>Generate</button>
        </div>

        <div className="preview">
          <h2>Preview</h2>
          <div className="preview-box">
            {generatedPost || 'Your post will appear here.'}
          </div>
          <button className="accept">✓</button>
          <button className="deny">✗</button>
        </div>

      </div>
    </div>
  );
}

export default App;
