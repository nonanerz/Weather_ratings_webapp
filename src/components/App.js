/* global FB */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './App.css'
import { FACEBOOK_APP_ID } from '../constans'
import API from '../services/api'

// router
import {BrowserRouter} from 'react-router-dom'
import {Switch, Route} from 'react-router'

// components
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Home from './pages/Home/HomeContainer'
import SignInPopup from './SignInPopup/SignInPopupContainer'

const NotFound = () => {
  return (
    <Route render={({staticContext}) => {
      if (staticContext) {
        staticContext.status = 404
      }
      return (<div>
        <h1>Sorry, can’t find that.</h1>
      </div>)
    }} />
  )
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentWillMount () {
    // Facebook
    (function (d, s, id) {
      let js
      let fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) { return }
      js = d.createElement(s); js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
    window.fbAsyncInit = function () {
      FB.init({
        appId: FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v2.5'
      })
      FB.AppEvents.logPageView()
    }
    API.getUserLocation()
      .then((location) => {
        let region = location && location.region ? location.region : 'any'
        this.props.changeStateProp('region', region, 'main')
      })
  }
  render () {
    return (
      <BrowserRouter>
        <div className='App'>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
          {this.props.SignInPopupShow && <SignInPopup />}
        </div>
      </BrowserRouter>
    )
  }
}

App.propTypes = {
  changeStateProp: PropTypes.func.isRequired
}

App.defaultProps = {
  changeStateProp: () => {}
}

export default App
