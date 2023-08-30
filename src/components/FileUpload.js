// components/FileUpload.js
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from '../utils/axiosConfig'; // Import the Axios instance

const FileUpload = ({ onFileUpload }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [fileFormatError, setFileFormatError] = useState(false); // State for file format error

  const onDrop = useCallback(async (acceptedFiles) => {
    if (uploading) return;

    // Check if any uploaded file has an invalid format (not TXT or PDF)
    const invalidFile = acceptedFiles.find(
      (file) => !['application/pdf', 'text/plain'].includes(file.type)
    );

    if (invalidFile) {
      setFileFormatError(true);
      return;
    }

    setUploading(true);

    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append('file', file);
    });

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setUploadSuccess(true);
        setFileFormatError(false); // Reset the file format error state
        onFileUpload(acceptedFiles);
        window.location.href = '/chat';
      }
    } catch (error) {
      console.error('File upload error:', error);
    } finally {
      setUploading(false);
    }
  }, [onFileUpload, uploading]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ['.txt', '.pdf'], // Only accept TXT and PDF files
  });

  return (
    <div>
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        <p>Drag & drop a TXT or PDF file here or click to select one</p>
      </div>
      {fileFormatError && (
        <p>File format incorrect. Please upload a TXT or PDF file.</p>
      )}
      {uploading && <p>Uploading...</p>}
      {uploadSuccess && <p>File uploaded successfully!</p>}
    </div>
  );
};

export default FileUpload;
