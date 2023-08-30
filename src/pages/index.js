// pages/index.js
import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import Chat from '../components/Chat';

const Home = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = async (files) => {
    // Create a FormData object and append the uploaded files
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
    });

    try {
      // Send the file upload request to the backend
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('response status ', response.status);
      // Check if the upload was successful
      if (response.status === 200) {
        // Redirect to the chat page
        window.location.href = 'http://localhost:3000/chat'; // Change '/chat' to your chat page URL
      }
    } catch (error) {
      console.error('File upload error:', error);
    }
  };

  return (
    <div>
      <h1>Chat Application</h1>
      
      {/* Render the FileUpload component */}
      <FileUpload onFileUpload={handleFileUpload} />
      
      {/* Display the uploaded file names */}
      {uploadedFiles.length > 0 && (
        <div>
          <h2>Uploaded Files:</h2>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
