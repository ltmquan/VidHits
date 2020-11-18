import React from "react";
import logo from "../images/logo.png";
import { Navbar } from "react-bootstrap";

function NavigationBar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
        </Navbar.Brand>
        <h2 className='logoName'>VidHits</h2>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
