import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  // /auth/login
  try {
    console.log(userInfo);
    const login = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });
    console.log(login)
    if (!login.ok) {
      throw new Error(`HTTP error! status: ${login.status}`);
    }
    
    const response = await login.json();
    console.log(response);
    return response;
  } catch (err) {
    console.error('Error during login:', err);
    return null;
  }
}



export { login };
