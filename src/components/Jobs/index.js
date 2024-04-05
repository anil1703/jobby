import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-spinner-loader'
import {BiSearch} from 'react-icons/bi'
import Header from '../Header/Header'
import TypesOfEmployment from '../TypesOfEmployment/index'
import SalaryRange from '../SalaryRange/index'
import AllJobSection from '../AllJobsSection/index'

import './index.css'

const covertingCamelCase = data => {
  return {profileDetails: data.profile_details}
}
const convertingEachLineIntoCamel = data => {
  return {
    name: data.name,
    profileImageUrl: data.profile_image_url,
    shortBio: data.short_bio,
  }
}
class Jobs extends Component {
  state = {
    errorJob: false,
    searchValue: '',
    searchtyping: '',
    profileData: {},
    isLoading: true,
    jobUpadtes: [],
    typeOfOpt: [],
    salaryRange: 1000000,
  }

  componentDidMount() {
    this.gettingProfileCard()
    this.gettingJobUpadtes()
  }

  selecthingType = typeId => {
    this.setState(
      prevState => ({
        typeOfOpt: [...prevState.typeOfOpt, typeId],
      }),
      this.gettingJobUpadtes,
    )
  }

  deselectingType = typeId => {
    const {typeOfOpt} = this.state
    const deletingType = typeOfOpt.filter(eachType => eachType !== typeId)

    this.setState({
      typeOfOpt: deletingType,
    })
  }

  selectingRange = range => {
    this.setState(
      {
        salaryRange: range,
      },
      this.gettingJobUpadtes,
    )
  }

  searching = event => {
    this.setState({
      searchtyping: event.target.value,
    })
  }

  clickingSearch = () => {
    const {searchtyping} = this.state
    this.setState(
      {
        searchValue: searchtyping,
      },
      this.gettingJobUpadtes,
    )
  }

  gettingJobUpadtes = async () => {
    const {searchValue, salaryRange, typeOfOpt} = this.state
    console.log('hii')
    const addingss = typeOfOpt.join(',')
    console.log(addingss)
    const jwTToken = Cookies.get('jwt_token')
    const urlJob = `https://apis.ccbp.in/jobs?employment_type=${typeOfOpt}&minimum_package=${salaryRange}&search=${searchValue}`
    const optionsJob = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwTToken}`,
      },
    }
    const responseJob = await fetch(urlJob, optionsJob)

    const dataJob = await responseJob.json()
    if (dataJob.jobs.length === 0) {
      this.setState({
        errorJob: true,
      })
    } else if (dataJob.jobs.length > 0) {
      this.setState({
        errorJob: false,
      })
    }

    const updatedJobUpdates = dataJob.jobs.map(eachItem => ({
      companyLogoUrl: eachItem.company_logo_url,
      employmentType: eachItem.employment_type,
      id: eachItem.id,
      jobDescription: eachItem.job_description,
      location: eachItem.location,
      packagePerAnnum: eachItem.package_per_annum,
      rating: eachItem.rating,
      title: eachItem.title,
    }))
    this.setState({
      isLoading: false,
      jobUpadtes: updatedJobUpdates,
    })
  }

  gettingProfileCard = async () => {
    const jwTToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwTToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const upadatingProfileCarddetails = covertingCamelCase(data)
    const updatingEachLineIntoCamel = convertingEachLineIntoCamel(
      upadatingProfileCarddetails.profileDetails,
    )
    this.setState({
      profileData: updatingEachLineIntoCamel,
    })
  }

  gettingProfileBox = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="profile-card">
        <img src={profileImageUrl} className="profile-round" alt="profile" />
        <h1 className="profile-head">{name}</h1>
        <p className="profile-para">{shortBio}</p>
      </div>
    )
  }

  render() {
    const {jobUpadtes, isLoading, searchValue, errorJob} = this.state
    return (
      <div className="section-jobs">
        <Header />
        <div className="section-body-job">
          <div className="side-one">
            {this.gettingProfileBox()}
            <hr />
            <TypesOfEmployment
              deselectingType={this.deselectingType}
              selecthingType={this.selecthingType}
            />
            <hr />
            <SalaryRange selectingRange={this.selectingRange} />
          </div>
          <div className="side-two">
            <div className="search-div">
              <input
                onChange={this.searching}
                type="search"
                placeholder="Search"
                className="searchstyle"
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.clickingSearch}
                className="search-btn"
              >
                <BiSearch className="search-icon" />
              </button>
            </div>
            {isLoading ? (
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            ) : (
              <ul className="side-two-ul">
                {errorJob ? (
                  <li className="error-list">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                      alt="no jobs"
                    />
                    <h1>No Jobs Found</h1>
                    <p>We could not found any jobs. Try other filters.</p>
                  </li>
                ) : (
                  <>
                    {jobUpadtes.map(eachJob => (
                      <AllJobSection key={eachJob.id} data={eachJob} />
                    ))}
                  </>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
