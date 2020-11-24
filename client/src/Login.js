import { useForm } from "react-hook-form";
import "./css/loginStyle.css";
import client from "./axios";

function Login() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const headers = {
      'Content-Type': 'application/json'
    }
    client.post('/login', {
      data: data
    }, {
      headers:headers
    })
    .then(res => {
      console.log(res.data)
    })
    
  };
  console.log(errors);

  return (
    <div>
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
            required: "You must specify a password",
            minLength: {
              value: 6,
              message: "Password must have at least 6 characters",
            },
          })}
        />
        <input className='loginInput' type="submit" />
      </form>
    </div>
  );
}

export default Login;
