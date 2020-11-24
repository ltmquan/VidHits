import { useForm } from "react-hook-form";
import "./css/formStyles.css";
import passwordImg from "./images/password.jpg";
import { useHistory } from "react-router-dom";
import client from "./axios";

function Signup() {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const onSubmit = (data) => {
    console.log(data);
    const headers = {
      'Content-Type': 'application/json'
    }
    client.post('/signup', {
      data: data
    }, {
      headers:headers
    })
    .then(res => {
      if (res.data === 'User already exists') {
        console.log(res.data)
      }
      else {
        history.push("/login");
      }
     
    })
    
  };
  console.log(errors);

  return (
    <div className="flexItem">
      <div>
        <h1 className="createAccount">Create Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="formStyle">
          <label>Email</label>
          <input
            className="signUpInput"
            type="text"
            name="Email"
            ref={register({ required: true, pattern: /^\S+@\S+$/i })}
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
          />
          <input className="signUpInput" type="submit" />
        </form>
      </div>
      <img src={passwordImg} alt="password source" className="passwordImg" />
    </div>
  );
}

export default Signup;
