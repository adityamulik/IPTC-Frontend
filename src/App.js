import './App.css';
import UploadImages from './Components/UploadImages';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <h1>IPTC Automation</h1>
        <UploadImages />
      </Container>
    </div>
  );
}

export default App;
