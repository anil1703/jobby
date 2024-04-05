import './Header.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const logOutClicking = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const clickingLogo = () => {
    const {history} = props
    history.push('/')
  }

  return (
    <div className="navbar">
      <img
        onClick={clickingLogo}
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="navbar-logo"
      />
      <div className="two">
        <Link className="Link" to="/">
          <p>Home</p>
        </Link>
        <Link className="Link" to="/jobs">
          <p>Jobs</p>
        </Link>
      </div>
      <button onClick={logOutClicking} className="login-butn-style1">
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
