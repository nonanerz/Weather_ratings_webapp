/* global FB, gapi */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './App.css'
import { FACEBOOK_APP_ID } from '../constans'

// router
import {Route, Switch} from 'react-router'
import {HashRouter} from 'react-router-dom'

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
    }}/>
  )
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentWillMount () {
    // Facebook
    (function(d, s, id){
      let js, fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {return}
      js = d.createElement(s); js.id = id
      js.src = "https://connect.facebook.net/en_US/sdk.js"
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
    window.fbAsyncInit = function() {
      FB.init({
        appId: FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v2.5'
      })
      FB.AppEvents.logPageView()
    }

  }
  getLoginStatus () {
    window.FB.getLoginStatus(function(response) {
      console.log(response)
    })
  }
  render() {
    return (
      <HashRouter>
        <div className='App'>
          <button onClick={this.getLoginStatus}>Facebook</button>
          <Header />
          <Home />
          <Footer />
          {this.props.SignInPopupShow && <SignInPopup />}
        </div>
      </HashRouter>
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