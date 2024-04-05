import {Link, Redirect} from 'react-router-dom'
import Header from '../Header/Header'

import './Home.css'

const Home = () => (
  <div className="main-home">
    <Header />
    <div className="head">
      <h1 className="home-head">Find The Job That Fits Your Life</h1>
      <p className="home-para">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button className="home-butn-style">Find Jobs</button>
      </Link>
    </div>
  </div>
)
export default Home
