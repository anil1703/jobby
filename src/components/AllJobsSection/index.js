import {AiFillStar, AiOutlineMail} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import {BiMap} from 'react-icons/bi'

import './index.css'

const AllJobSection = props => {
  const {data} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = data
  return (
    <Link className="link-style-jobs" to={`/jobs/${id}`}>
      <li className="JobsLi">
        <div className="list-one">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="logo-job-style"
          />
          <div className="list-one-right">
            <h1 className="list-head">{title}</h1>
            <div className="updated-div">
              <AiFillStar className="start-logo" />
              <p className="updated-para">{rating}</p>
            </div>
          </div>
        </div>
        <div className="list-two">
          <div className="moss">
            <div className="middle-div">
              <div className="updated-div">
                <BiMap />
                <p>{location}</p>
              </div>
            </div>
            <div className="middle-div">
              <div className="updated-div">
                <AiOutlineMail />
                <p>{employmentType}</p>
              </div>
            </div>
          </div>
          <p className="job-salary">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="job-head">Description</h1>
        <p className="job-para">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default AllJobSection
