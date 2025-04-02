import { JwtPayload, jwtDecode } from 'jwt-decode';


class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken()
    const decodedToken = jwtDecode<JwtPayload>(token)
    return decodedToken
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken()
    const isLoggedIn = token === '' ? false : true
    return isLoggedIn
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    const tokenExpiration = jwtDecode<JwtPayload>(token).exp
    if (tokenExpiration) {
      const time = Date.now() / 1000
      // Cleanup w CoPilot
      const isExpired = time > tokenExpiration
      return isExpired
    }
  }

  getToken(): string {
    // TODO: return the token
    const token: string = localStorage.getItem('token') || ''
    return token
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
    // Grok
    if (!idToken) {
      console.log(idToken)
    }
    localStorage.setItem('token', idToken)
    window.location.assign('/')
  }

  logout() {
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
    localStorage.removeItem('token')
    window.location.assign('/')
  }
}

export default new AuthService();
