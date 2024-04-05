import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

const RouterLoginComponent = props => {
  const checking = Cookies.get('jwt_token')
  if (checking === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default RouterLoginComponent
