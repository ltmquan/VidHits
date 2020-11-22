import LogButton from './Button/LogButton';
import vidImg from './images/video-homepage.jpg';
import './css/styles.css';

function App() {
  return (
    <div>
      <img src = {vidImg} alt = 'Vid' className='vidHomePage'/>
      <div className='welcomeTextGroup'>
        <h1 className='welcomeText'>Welcome to VidHits</h1>
        <LogButton/>
      </div>
    </div>
  );
}

export default App;
