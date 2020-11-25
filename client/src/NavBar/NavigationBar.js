import React from "react";
import logo from "../images/logo.png";
import { Navbar } from "react-bootstrap";
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
        {props.loginNavBar && <a href='/login' className='loginNavBar'>Login</a>}
        {props.signupNavBar && <a href='/signup' className='signupNavBar'>Sign Up</a>}
        {props.nameNavBar && <h3 className='nameNavBar'>Welcome {props.nameNavBar}!</h3>}
      </Navbar>
    </div>
  );
}

export default NavigationBar;
