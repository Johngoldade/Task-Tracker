// Import JSON web token function and type
import { JwtPayload, jwtDecode } from 'jwt-decode';

// Class to handle JWT token verification/ logged in, logged out functionality
class AuthService {
  getProfile() {
    const token = this.getToken()
    const decodedToken = jwtDecode<JwtPayload>(token)
    return decodedToken
  }

  loggedIn() {
    const token = this.getToken()
    const isLoggedIn = token === '' ? false : true
    return isLoggedIn
  }
  
  isTokenExpired(token: string) {
    const tokenExpiration = jwtDecode<JwtPayload>(token).exp
    if (tokenExpiration) {
      const time = Date.now() / 1000
      // Copilot helped me cleanup my last two lines here
      const isExpired = time > tokenExpiration
      return isExpired
    }
  }

  getToken(): string {
    const token: string = localStorage.getItem('token') || ''
    return token
  }

  login(idToken: string) {
    localStorage.setItem('token', idToken)
    window.location.assign('/')
  }

  logout() {
    localStorage.removeItem('token')
    window.location.assign('/')
  }
}

// Export AuthService class
export default new AuthService();
