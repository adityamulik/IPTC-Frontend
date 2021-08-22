import React, {useCallback, useState} from 'react';
import './UploadImages.css';
import {DropzoneArea} from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';

const UploadImages = () => {

  const [count, setCount] = useState(0);
  const [files, setFiles] = useState([]);

  const handleChange = (loadedFiles) => {
    setCount(loadedFiles.length);
    setFiles(loadedFiles);
  }

  const handleGetMetadata = () => {
    console.log('getMetadata');
  }

  const handleSetMetadata = () => {
    console.log('setMetadata');
    console.log(files);
  }

  return (
    <div className="upload-image-container">   
      <h4>Total images uploaded: {count}</h4>   
      <DropzoneArea 
        filesLimit={5000000}
        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
        dropzoneText="Drop or click to upload Images here."
        dropzoneClass="image-dropzone"
        showPreviewsInDropzone={false}
        onChange={loadedFiles => handleChange(loadedFiles)}
      />      
      <DropzoneArea
        filesLimit={1}
        acceptedFiles={['.xlsx', '.csv']}
        dropzoneText="Drop or click to upload excel here."
        dropzoneClass="image-dropzone"
      />
      <div className="button-container">
        <Button 
          variant="contained" 
          className="UploadButton"
          onClick={handleGetMetadata}
        >Get Metadata</Button>
        <Button 
          variant="contained" 
          className="UploadButton"
          onClick={handleSetMetadata}
        >Set Metadata</Button>
      </div>
    </div>
  )
}

export default UploadImages;