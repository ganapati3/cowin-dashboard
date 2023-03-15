import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiConstants = {
  loading: 'loading',
  failure: 'failure',
  success: 'success',
}

class CowinDashboard extends Component {
  state = {apiStatus: '', vaccinationData: []}

  componentDidMount() {
    this.getVaccinationDetails()
  }

  getVaccinationDetails = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.setState({apiStatus: apiConstants.success, vaccinationData: data})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  loader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Something went wrong</h1>
    </>
  )

  renderResultView = () => {
    const {vaccinationData} = this.state
    return (
      <>
        <div className="vaccination-container">
          <h1 className="vaccination-heading">Vaccination Coverage</h1>
          <VaccinationCoverage
            coverageData={vaccinationData.last_7_days_vaccination}
          />
        </div>
        <div className="vaccination-container">
          <h1 className="vaccination-heading">Vaccination by gender</h1>
          <VaccinationByGender
            vaccinationDataByGender={vaccinationData.vaccination_by_gender}
          />
        </div>
        <div className="vaccination-container">
          <h1 className="vaccination-heading">Vaccination by age</h1>
          <VaccinationByAge
            vaccinationDataByAge={vaccinationData.vaccination_by_age}
          />
        </div>
      </>
    )
  }

  renderPageView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.loading:
        return this.loader()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.success:
        return this.renderResultView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        <nav className="nav-bar">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <h1 className="logo-name">Co-WIN</h1>
        </nav>
        <h1 className="heading">CoWIN Vaccination in india</h1>
        <div className="display-container">{this.renderPageView()}</div>
      </div>
    )
  }
}

export default CowinDashboard
