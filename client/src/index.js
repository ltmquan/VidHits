import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { Navbar } from "react-bootstrap";
import logo from './images/logo.png'
import Signup from "./Signup";
import Footer from './Footer/Footer'

ReactDOM.render(
  <div>
    <Router>
      <div>
        {/* Navbar */}
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
          <h2 className="logoName">VidHits</h2>
        </Navbar>

        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          {/* <Route path="/dashboard">
            <Dashboard />
          </Route>  */}
        </Switch>
        <Footer/>
      </div>
    </Router>
  </div>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
