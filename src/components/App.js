import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './App.css'
import API from '../services/api'

// router
import {Route, Switch} from 'react-router'
import {HashRouter} from 'react-router-dom'

// components
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Home from './pages/Home/Home'

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
  render() {
    return (
      <HashRouter>
        <div className='App'>
          <Header />
          <Home />
          <Footer />
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