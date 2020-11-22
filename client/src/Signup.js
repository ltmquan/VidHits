import { useForm } from "react-hook-form";
import "./css/formStyles.css";
import passwordImg from "./images/password.jpg";

function Signup() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <div className='flexItem'>
      <form onSubmit={handleSubmit(onSubmit)} className="formStyle">
        <label>Email</label>
        <input
          type="text"
          name="Email"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        <label>Password</label>
        <input
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
        <input type="submit" />
      </form>
      <img src={passwordImg} alt='password source' className='passwordImg'/>
    </div>
  );
}

export default Signup;
