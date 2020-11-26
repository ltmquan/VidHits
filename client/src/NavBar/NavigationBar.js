import React from "react";
import logo from "../images/logo.png";
import { Navbar, Button } from "react-bootstrap";
import '../css/styles.css'

function NavigationBar(props) {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
        </Navbar.Brand>
        <h2 className='logoName'>VidHits</h2>
        {props.loginNavBar && <Button href='/login' variant="outline-light" className='loginNavBar'>Login</Button>}
        {props.signupNavBar && <Button href='/signup' variant="outline-light" className='signupNavBar'>Sign Up</Button>}
        {props.nameNavBar && <h3 className='nameNavBar'>Welcome {props.nameNavBar}!</h3>}
        {props.logOutButton && <Button href = '/login' variant="outline-light" className='logOutButton'>Log Out</Button>}
      </Navbar>
    </div>
  );
}

export default NavigationBar;
