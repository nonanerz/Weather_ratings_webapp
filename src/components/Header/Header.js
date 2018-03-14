import React, { Component } from 'react'

export default class Header extends Component {
  render () {
    return (
      <header className='header-section'>
        <div className='container'>
          <div className='logo'>
            <img src={require('../../assets/images/wr-white.png')}/>
            {/*<h1>wheather</h1>*/}
            {/*<span>rate</span>*/}
          </div>
        </div>
      </header>
    )
  }
}