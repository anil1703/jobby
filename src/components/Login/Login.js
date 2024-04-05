import {useState} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './Login.css'

const Login = props => {
  let username = ''
  let password = ''
  const [errorMsg, setErrorMsg] = useState('')
  const loginFailure = errormsg => {
    setErrorMsg(errormsg)
  }
  const loginSuccessful = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 40})
    const {history} = props
    history.replace('/')
  }
  const clikcingLogin = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      loginSuccessful(data.jwt_token)
    } else {
      loginFailure(data.error_msg)
    }
  }
  const gettingUsername = event => {
    username = event.target.value
  }
  const gettingPassword = event => {
    password = event.target.value
  }
  return (
    <div className="login-home">
      <form className="login-box" onSubmit={clikcingLogin}>
        <div className="login-logo-div">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt=""
            className="login-logo"
          />
        </div>
        <label htmlFor="username">USERNAME</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="login-input-style"
          onChange={gettingUsername}
        />
        <label htmlFor="password">PASSWORD</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="login-input-style"
          onChange={gettingPassword}
        />
        <button type="submit" className="login-butn-style">
          Login
        </button>
        <p className="login-error">{errorMsg}</p>
      </form>
    </div>
  )
}
export default withRouter(Login)
