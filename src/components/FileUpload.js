// components/FileUpload.js
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from '../utils/axiosConfig';

const FileUpload = () => {
  const onDrop = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append('file', file);
    });

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload response:', response.data);
      console.log('Response status:', response.status);
      // Handle the response from the backend as needed
      if (response.status === 200) {
        // Redirect to the chat page
        window.location.href = '/chat'; // Change '/chat' to your chat page URL
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
      <input {...getInputProps()} />
      <p>Drag & drop a file here or click to select one</p>
    </div>
  );
};

export default FileUpload;
