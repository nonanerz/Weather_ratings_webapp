import React, { Component } from 'react'

export default class Footer extends Component {
  render () {
    return (
      <footer className='header-section'>
        <div className='container'>
          <div className='social-links-container'>
            <h2>Social links</h2>
            <ul className='social-links-wrapper'>
              <li className='social-item'>
                <a href='https://www.instagram.com' target='_blank' className='social instagram' />
              </li>
              <li className='social-item'>
                <a href='https://www.facebook.com' target='_blank' className='social facebook' />
              </li>
            </ul>
          </div>
          <div className='copyright-container'>
            <span>Copyright by WEATHER RATE.</span>
            <span>Developed by GeekHub students</span>
          </div>
        </div>
      </footer>
    )
  }
}