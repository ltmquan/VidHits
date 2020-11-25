import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Signup from "./Signup";
import Footer from './Footer/Footer'
import Login from "./Login";
import Homepage from "./Homepage";

ReactDOM.render(
  <div>
    <Router>
      <div>
        {/* <NavigationBar/> */}
        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/homepage">
            <Homepage />
          </Route>
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
