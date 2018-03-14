/* global FB, gapi */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class SignInPopup extends Component {
  constructor (props) {
    super(props)
    this.facebookLogin = this.facebookLogin.bind(this)
    this.close = this.close.bind(this)
  }
  facebookLogin () {
    FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        console.log(11111, response)
        let userData = {
          socialNetwork: 'facebook',
          token: response.authResponse.accessToken
        }
        this.props.callback(userData)
      } else {
        FB.login((response) => {
          console.log(222222, response)
          let userData = {
            socialNetwork: 'facebook',
            token: response.authResponse.accessToken
          }
          this.props.callback(userData)
          this.close()
        }, {scope: 'public_profile,email'})
      }
    })
  }
  close () {
    this.props.changeStateProp('SignInPopupShow', false, 'main')
  }
  render () {
    return (
      <div className='sign-in-popup-container'>
        <div className='sign-in-popup'>
          <h2 className='popup-title'>{this.props.SignInPopupContent.title}</h2>
          <p className='popup-title'>{this.props.SignInPopupContent.description}</p>
          <button
            onClick={this.facebookLogin}
            className='facebook-button'
          >Continue with Facebook</button>
        </div>
      </div>
    )
  }
}


SignInPopup.defaultProps = {
  SignInPopupContent: {
    title: '',
    description: '',
    close: true
  }
}
SignInPopup.defaultType = {
  SignInPopupContent: PropTypes.object
}

