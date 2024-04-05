import {Component} from 'react'
import Cookies from 'js-cookie'

import {AiFillStar, AiOutlineMail} from 'react-icons/ai'
import {FiExternalLink} from 'react-icons/fi'
import Loader from 'react-spinner-loader'
import {BiMap} from 'react-icons/bi'
import Header from '../Header/Header'
import './index.css'

const uptadtingToCamel = data => ({
  jobDetails: data.job_details,
  similarJobs: data.similar_jobs,
})

const ConvertingToLife = data => ({
  description: data.description,
  imageUrl: data.image_url,
})

const updatingInsideCamel = data => ({
  companyLogoUrl: data.company_logo_url,
  companyWebsiteUrl: data.company_website_url,
  employmentType: data.employment_type,
  id: data.id,
  jobDescription: data.job_description,
  lifeAtCompany: ConvertingToLife(data.life_at_company),
  location: data.location,
  packagePerAnnum: data.package_per_annum,
  rating: data.rating,
  skills: data.skills.map(eachItem => ({
    name: eachItem.name,
    imageUrl: eachItem.image_url,
  })),
  title: data.title,
})
class JobItem extends Component {
  state = {joby: {}, similar: {}, isLoad: true, iserror: false}

  componentDidMount() {
    this.gettingSeparateDetails()
  }

  gettingSeparateDetails = async () => {
    const jwTToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwTToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === false) {
      this.setState({
        iserror: true,
      })
    } else if (response.ok === true) {
      this.setState({
        iserror: false,
      })
    }
    console.log(response)
    console.log(data)
    const updatedCamelCase = uptadtingToCamel(data)
    const insideDataOne = updatingInsideCamel(updatedCamelCase.jobDetails)
    const insideDataTwo = updatedCamelCase.similarJobs.map(eachJobs => ({
      companyLogoUrl: eachJobs.company_logo_url,
      employmentType: eachJobs.employment_type,
      id: eachJobs.id,
      jobDescription: eachJobs.job_description,
      location: eachJobs.location,
      rating: eachJobs.rating,
      title: eachJobs.title,
    }))

    this.setState({
      joby: insideDataOne,
      similar: insideDataTwo,
      isLoad: false,
    })
  }

  gettingDetailsOdJOb = () => {
    const {joby, similar} = this.state

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtCompany,
    } = joby
    return (
      <>
        <div className="job-submain">
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
          <div className="desc-div">
            <h1 className="job-head abc">Description</h1>
            <a className="anchor" href={companyWebsiteUrl}>
              Visit
              <FiExternalLink className="externalLink" />
            </a>
          </div>
          <p className="job-para">{jobDescription}</p>

          <h1 className="job-head abc">Skills</h1>
          <ul className="skills-ul">
            {skills.map(eachSkill => (
              <li key={eachSkill.name}>
                <img
                  src={eachSkill.imageUrl}
                  className="skill-logo"
                  alt={eachSkill.name}
                />
                <p>{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="job-head abc">Life at Company</h1>
          <div className="lifeAtCompany">
            <p>{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.imageUrl} className="life-img" />
          </div>
        </div>
        <h1 className="job-head abc gfh">Similar Jobs</h1>
        <ul className="similar-ul">
          {similar.map(eachSimi => (
            <li className="simi-li">
              <img
                src={eachSimi.companyLogoUrl}
                alt="company logo"
                className="logo-job-style"
              />
              <div className="list-one-right">
                <h1 className="list-head">{eachSimi.title}</h1>
                <div className="updated-div">
                  <AiFillStar className="start-logo" />
                  <p className="updated-para">{eachSimi.rating}</p>
                </div>
              </div>
              <h1 className="job-head">Description</h1>
              <p className="job-para">{eachSimi.jobDescription}</p>
            </li>
          ))}
        </ul>
      </>
    )
  }

  Retry = () => {
    this.gettingDetailsOdJOb()
  }

  render() {
    const {joby, similar, isLoad, iserror} = this.state

    return (
      <div className="job-solo-main">
        <Header />
        {iserror ? (
          <div className="error-job">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We cannot to find the page you are looking for</p>
            <button onClick={this.Retry} className="retry-butn-style">
              Retry
            </button>
          </div>
        ) : (
          <>
            {isLoad ? (
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            ) : (
              this.gettingDetailsOdJOb()
            )}
          </>
        )}
      </div>
    )
  }
}
export default JobItem
