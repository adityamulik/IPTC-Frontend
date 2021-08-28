import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './UploadImages.css';
import {DropzoneArea} from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';

const FileDownload = require('js-file-download');

const UploadImages = () => {

  const [count, setCount] = useState(0);
  const [files, setFiles] = useState([]);
  const [excelFile, setExcelFile] = useState([]);
  const [uploaded, setUploaded] = useState(true);  


  useEffect(() => {
    if (count > 0 && excelFile !== undefined) {
      setUploaded(false);
    } else {
      setUploaded(true);
    }
  }, [count, excelFile]);

  const handleChange = (loadedFiles) => {
    setCount(loadedFiles.length);
    // console.log(loadedFiles);
    setFiles(loadedFiles)          
  }

  const handleExcelFile = loadedFiles => {
    // console.log(loadedFiles[0]);
    setExcelFile(loadedFiles[0]);   
  }

  const handleGetMetadata = (e) => {
    e.preventDefault();
    // console.log('getMetadata');    
  }

  const handleSetMetadata = (e) => {
    e.preventDefault();

    let form_data = new FormData();

    files.map(file => {
      form_data.append('images', file)
      return true;
    })    
    form_data.append('excel', excelFile)

    let url = 'http://127.0.0.1:8000/api/save-metadata';

    axios.post(url, form_data, {
      responseType: 'arraybuffer',
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
      .then(res => {
        const blob = new Blob([res.data], {
          type: 'application/zip'
        })
        const filename = 'images.zip';
        FileDownload(blob, filename);
      })
      .catch(err => console.log(err));
  }

  const handleValidateExcel = () => {

  };

  const handleDownloadExcelTemplate = () => {
    window.open(process.env.PUBLIC_URL + "/iptc_metadata.csv", 'Download');
  }

  return (
    <div className="upload-image-container">   
      <h4>Total images uploaded: {count}</h4>   
      <DropzoneArea 
        filesLimit={5000000}
        maxFileSize={100000000}
        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
        dropzoneText="Drop or click to upload Images here."
        dropzoneClass="image-dropzone"
        showPreviewsInDropzone={false}
        onChange={loadedFiles => handleChange(loadedFiles)}
      />      
      <DropzoneArea
        filesLimit={1}
        acceptedFiles={['.csv']}
        dropzoneText="Drop or click to upload csv file here."
        dropzoneClass="image-dropzone"
        onChange={loadedFiles => handleExcelFile(loadedFiles)}
      />
      <Button 
        variant="contained" 
        className="uploadbutton"
        onClick={handleGetMetadata}
        disabled={uploaded}
      >Get Metadata</Button>
      <Button 
        variant="contained" 
        className="uploadbutton"
        onClick={handleSetMetadata}
        disabled={uploaded}
      >Set Metadata</Button>
      <Button 
        variant="contained" 
        className="uploadbutton"
        onClick={handleValidateExcel}
        disabled={uploaded}
      >Validate</Button>
      <Button 
        variant="contained" 
        className="uploadbutton"
        onClick={handleDownloadExcelTemplate}
      >CSV Template</Button>     
    </div>
  )
}

export default UploadImages;