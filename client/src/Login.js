import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {useState} from 'react';
import "./css/loginStyle.css";
import client from "./axios";
import NavigationBar from './NavBar/NavigationBar'

function Login() {
  const { register, handleSubmit, errors,reset } = useForm();
  const [invalidCredentials, setinvalidCredentials] = useState(false)
  const [signupNavBar, setsignupNavBar] = useState(true);
  const history = useHistory();
  const onSubmit = (data) => {
    console.log(data);
    reset();
    const headers = {
      'Content-Type': 'application/json'
    }
    client.post('/login', {
      data: data
    }, {
      headers:headers
    })
    .then(res => {
      if (res.data === 'You have successfully logged in') {
        history.push('/homepage')
      }
      else {
        if (res.data === 'Please check your details login again') {
          setinvalidCredentials(true)
        }
      }
      return console.log(res.data)
    })
    
  };
  console.log(errors);

  const isEmpty = obj => {
    return Object.keys(obj).length === 0;
  }

  const validationForm = () => {
    if (!isEmpty(errors)) {
      if (errors.password != null && errors.Email != null) {
        console.log('yess')
        console.log(errors.password)
        return <div>
          <p style={{color: "red"}}>Enter valid email</p>
          <p style={{color: "red"}}>Your password is not valid, enter a password that has more than 6 characters</p>
        </div>
      }
      else if (errors.password != null && errors.Email == null) {
        return <p style={{color: "red"}}>Wrong password</p>
      }
      else if (errors.Email != null && errors.password == null) {
        return <p style={{color: "red"}}>Enter valid email</p>
      }
    }
    else {
      setinvalidCredentials(false)
    }
  }

  return (
    <div>
      <NavigationBar signupNavBar={signupNavBar}/>
      <h1 className="login">Log in</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="loginStyle">
        <label>Email</label>
        <input
          className='loginInput'
          type="text"
          name="Email"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        <label>Password</label>
        <input
          className='loginInput'
          name="password"
          type="password"
          ref={register({
          })}
        />
        {validationForm}
        {invalidCredentials && <p style={{color: "red"}}>Invalid user credentials</p>}
        <input className='loginInput' type="submit" />
      </form>
    </div>
  );
}

export default Login;
