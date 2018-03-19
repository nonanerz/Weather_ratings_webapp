/* global FB */
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
        FB.api('/me', {fields: 'id,name,picture.width(500).height(500)'}, (response) => {
          let userData = {}
          userData.userId = response.id
          userData.userName = response.name
          userData.userAvatar = response.picture.data.url
          this.close(userData)
        })
      } else {
        FB.login((response) => {
          if (response.status === 'connected') {
            FB.api('/me', {fields: 'id,name,picture.width(500).height(500)'}, (response) => {
              let userData = {}
              userData.userId = response.id
              userData.userName = response.name
              userData.userAvatar = response.picture.data.url
              this.close(userData)
            })
          } else {
            this.close()
          }
        }, {scope: 'public_profile,email'})
      }
    })
  }
  close (userData) {
    if (userData) {
      this.props.SignInPopupContent.callback(userData)
    }
    this.props.changeStateProp('SignInPopupShow', false, 'main')
  }
  render () {
    return (
      <div className='sign-in-popup-container'>
        <div className='sign-in-popup'>
          <h2 className='popup-title'>{this.props.SignInPopupContent.title}</h2>
          <p className='popup-description'>{this.props.SignInPopupContent.description}</p>
          <button
            onClick={this.facebookLogin}
            className='facebook-button'
          >Continue with Facebook</button>
          <button onClick={this.close.bind(null, false)} className={`close-btn ${!this.props.SignInPopupContent.close ? 'hidden' : ''}`} />
        </div>
      </div>
    )
  }
}

SignInPopup.defaultProps = {
  SignInPopupContent: {
    title: '',
    description: '',
    close: true,
    callback: () => {}
  }
}
SignInPopup.defaultType = {
  SignInPopupContent: PropTypes.object
}
