import React, { useState } from 'react';
import './App.css';
import Replicate from "replicate";

const replicate = new Replicate({
  auth: 'YOUR_REPLICATE_API_KEY', // Replace with your API key
});

function App() {
  const [postType, setPostType] = useState('event');
  const [description, setDescription] = useState('');
  const [generatedPost, setGeneratedPost] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFiles = (files) => {
    const file = files[0];
    if (file && file.type.startsWith('image/')) {
      const imgURL = URL.createObjectURL(file);
      setImagePreview(imgURL);
      setError('');
    } else {
      setError('Please upload a valid image file.');
    }
  };

  const generatePost = async () => {
    setLoading(true);
    setError('');

    try {
      const input = {
        prompt: "black forest gateau cake spelling out the words \"FLUX SCHNELL\", tasty, food photography, dynamic shot"
      };
      const output = await replicate.run("black-forest-labs/flux-schnell", { input });
      
      setGeneratedPost(`Generated post for type: ${postType}, description: ${description}, Image: ${output[0]}`);
    } catch (err) {
      setError('Error generating the post. Please try again.');
    } finally {
      setLoading(false);
    }
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
          <button className="generate-button" onClick={generatePost} disabled={loading}>
            {loading ? 'Generating...' : 'Generate'}
          </button>
          {error && <p className="error">{error}</p>}
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
