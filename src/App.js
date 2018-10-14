import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import CompanyRegisterPage from 'web/pages/CompanyRegisterPage'
import LoginPage from 'web/pages/LoginPage'
import ActiveJobsPageDefault from 'web/pages/ActiveDefaultJobsPage'
import ActiveJobsPage from 'web/pages/ActiveJobsPage'
import TalentLanding from 'web/TalentLanding'
import CompanyLanding from 'web/CompanyLanding'
import AllAplicationsPage from 'web/pages/AllAplicationsPage'
import PostFormPage from 'web/pages/PostFormPage'
import RegistrationFormEmail from 'web/components/CompanyRegisterForm/RegisterFormEmail'
import RejectedTalentsPage from 'web/pages/RejectedTalentsPage'
import ProgressingTalentPage from 'web/pages/ProgressingTalentsPage'
import CompanyPostLanding from 'web/pages/postLanding'
import CompanyProfile from 'web/pages/CompanyProfile'
import TalentLogin from 'web/pages/Talents/Login/TalentLogin'
import TalentRegister from 'web/pages/Talents/Register'
import CompliteProfile from './web/pages/Talents/CompliteProfile'
import TalentProfile from './web/pages/Talents/Profile/Profile'
import RegisterEmail from './web/components/Talents/RegisterEmail'
import CompliteProfileForm from './web/pages/Talents/CompliteRegistration/CompliteRegistration'
import 'bootstrap-css-only'
import 'assets/styles/main.css'
import PrivateRoute from './containers/PrivateRoute'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <PrivateRoute path='/company/jobs/applications' component={AllAplicationsPage} />
          <PrivateRoute path='/company/jobs/active' component={ActiveJobsPage} />
          <PrivateRoute path='/company/jobs/progressing' component={ProgressingTalentPage} />
          <PrivateRoute path='/company/jobs/rejected' component={RejectedTalentsPage} />
          <PrivateRoute path='/company/post/create' component={PostFormPage} />
          <PrivateRoute path='/company/profile' component={CompanyProfile} />
          <Route path='/company/register/details' component={CompanyRegisterPage} />
          <PrivateRoute path='/company/jobs' component={ActiveJobsPageDefault} />
          <Route path='/company/post' component={CompanyPostLanding} />
          <Route path='/company/register' component={CompanyRegisterPage} />
          <Route path='/company/email' component={RegistrationFormEmail} />
          <Route path='/activate/:hash' component={RegistrationFormEmail} />
          <Route path='/company-landing' component={CompanyLanding} />
          <Route path='/login' component={LoginPage} />
          {/* Talent pages */}
          <Route path='/talent/login' component={TalentLogin} />
          <Route path='/talent/register' component={TalentRegister} />
          <Route path='/talent/complite-profile' component={CompliteProfile} />
          <Route path='/talent/email' component={RegisterEmail} />
          <PrivateRoute path='/talent/profile' component={TalentProfile} />
          <PrivateRoute path='/talent/complite-registration' component={CompliteProfileForm} />
          {/* End of Talent pages */}
          <Route path='/' component={TalentLanding} />
          <Redirect to='/' />
        </Switch>
      </Router>
    )
  }
}

export default App
