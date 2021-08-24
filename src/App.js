import React from 'react';
import './App.css';
import UploadImages from './Components/UploadImages';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';

function App() {

  const [progress, setProgress] = React.useState(1);

  return (
    <div className="App">
       {/* <LinearProgress variant="determinate" value={progress} /> */}
      <Container maxWidth="sm">
        <h1>IPTC Automation</h1>
        <UploadImages />
      </Container>
    </div>
  );
}

export default App;
