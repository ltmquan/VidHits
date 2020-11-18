import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './css/styles.css'
import NavigationBar from './NavBar/NavigationBar.js'
import Footer from './Footer/Footer.js'
import LogButton from './Button/LogButton';

function App() {
  return (
    <div>
      <NavigationBar/>
      <div>
        <h1 className='welcomeText'>Welcome to VidHits</h1>
        <LogButton/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
