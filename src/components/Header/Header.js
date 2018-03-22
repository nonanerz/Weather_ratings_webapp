import React, { Component } from 'react'

export default class Header extends Component {
  render () {
    return (
      <header className='header-section'>
        <div className='container'>
          <div className='logo blur' ref={logo => { this.logo = logo }}>
            <img src={require('../../assets/images/wr-white.png')} alt='weather' />
          </div>
        </div>
        <span className='blur-container' />
      </header>
    )
  }
}
