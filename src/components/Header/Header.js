import React, { Component } from 'react'

export default class Header extends Component {
  refreshPage () {
    window.location.reload()
  }
  render () {
    return (
      <header className='header-section'>
        <div className='container'>
          <div className='logo blur' ref={logo => { this.logo = logo }}>
            <h1 className='title'>WeatherRate</h1>
            <img onClick={this.refreshPage} src={require('../../assets/images/wr-white.png')} alt='weather' />
          </div>
        </div>
        <span className='blur-container' />
      </header>
    )
  }
}
