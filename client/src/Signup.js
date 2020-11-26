import { useForm } from "react-hook-form";
import { useState } from "react";
import "./css/formStyles.css";
import passwordImg from "./images/signup.jpg";
import { useHistory } from "react-router-dom";
import client from "./axios";
import isEmail from "validator/lib/isEmail";
import NavigationBar from "./NavBar/NavigationBar";

function Signup() {
  const { register, handleSubmit, errors } = useForm();
  const [userExisted, setUserExisted] = useState(false);
  const [loginNavBar, setloginNavBar] = useState(true);
  const history = useHistory();
  const onSubmit = (data) => {
    setUserExisted(false);
    const headers = {
      "Content-Type": "application/json",
    };
    client
      .post(
        "/signup",
        {
          data: data,
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        if (res.data === "User already exists") {
          console.log(res.data);
          setUserExisted(res.data);
        } else {
          history.push("/login");
        }
      });
  };
  console.log(errors);

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const validationForm = () => {
    if (!isEmpty(errors)) {
      if (errors.password != null && errors.Email != null) {
        console.log(errors.password);
        return (
          <div>
            <p style={{ color: "red" }}>Enter valid email</p>
            <p style={{ color: "red" }}>
              Your password is not valid, enter a password that has more than 6
              characters
            </p>
          </div>
        );
      } else if (errors.password != null && errors.Email == null) {
        return <p style={{ color: "red" }}>{errors.password.message}</p>;
      } else if (errors.Email != null && errors.password == null) {
        return <p style={{ color: "red" }}>Enter valid email</p>;
      }
    }
  };

  return (
    <div>
      <NavigationBar loginNavBar={loginNavBar} />
      <div className="flexItem">
        <div className="formDiv">
          <h1 className="createAccount">Create Account</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="formStyle">
            <label>Username</label>
            <input
              className="signUpInput"
              type="text"
              name="username"
              ref={register({
                required: true
              })}
              style={{ borderColor: errors.username && "red" }}
            />
            <label>Email</label>
            <input
              className="signUpInput"
              type="text"
              name="Email"
              ref={register({
                required: true,
                validate: (input) => isEmail(input),
              })}
              style={{ borderColor: errors.Email && "red" }}
            />
            <label>Password</label>
            <input
              className="signUpInput"
              name="password"
              type="password"
              ref={register({
                required: "You must specify a password",
                minLength: {
                  value: 6,
                  message: "Password must have at least 6 characters",
                },
              })}
              style={{ borderColor: errors.password && "red" }}
            />
            {validationForm()}
            {userExisted && <p style={{ color: "red" }}>User already exists</p>}
            <input className="signUpInput" type="submit" />
          </form>
        </div>
        <img src={passwordImg} alt="password source" className="passwordImg" />
      </div>
    </div>
  );
}

export default Signup;
