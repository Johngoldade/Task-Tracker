// React hooks and functions
import { useState, FormEvent, ChangeEvent } from "react";
// Import needed functions from other files
import Auth from '../utils/auth';
import { login } from "../api/authAPI";


// Function to login
const Login = () => {
  // Set username and password to empty strings
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  // Set data to true
  const [isData, setIsData] = useState(true)


  // Add values to the username and password on an event action
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };


  // If login data is returned from the server, login and set the token to local storage
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      data ? setIsData(true) : setIsData(false)
      Auth.login(data.token);
    } catch (err) {
      console.error('Failed to login', err);
    }
  };


  // Login page component HTML
  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label >Username</label>
        <input 
          type='text'
          name='username'
          value={loginData.username || ''}
          onChange={handleChange}
        />
      <label>Password</label>
        <input 
          type='password'
          name='password'
          value={loginData.password || ''}
          onChange={handleChange}
        />
        <button type='submit'>Submit Form</button>
        <div>
          { isData ? <h4></h4> : <h4>Invalid Credentials! Please check your username or password and try again.</h4>}
        </div>
      </form>
    </div>
    
  )
};

// Export component
export default Login;
