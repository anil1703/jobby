import {Route, Redirect, Switch} from 'react-router-dom'

import Login from './components/Login/Login'
import Home from './components/Home/Home'
import Jobs from './components/Jobs'
import JobItem from './components/JobItem'
import NotFound from './components/NotFound'
import RouterLoginComponent from './components/RouterLoginComponent/RouterLoginComponent'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <div>
    <Switch>
      <Route path="/login" component={Login} />
      <RouterLoginComponent exact path="/" component={Home} />
      <RouterLoginComponent exact path="/jobs" component={Jobs} />
      <RouterLoginComponent exact path="/jobs/:id" component={JobItem} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </div>
)

export default App
