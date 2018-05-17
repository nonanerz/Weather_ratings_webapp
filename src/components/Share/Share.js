import React, { Component } from 'react'
import {
  ShareButtons,
  generateShareIcon
} from 'react-share'
const {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton
} = ShareButtons

const FacebookIcon = generateShareIcon('facebook')
const TwitterIcon = generateShareIcon('twitter')
const LinkedinIcon = generateShareIcon('linkedin')

export class Share extends Component {
  render () {
    return (
      <div className='share-container'>
        <li className='share-link-item'>
          <FacebookShareButton
            url={`${window.location.href}`}>
            <FacebookIcon
              size={32}
              round />
          </FacebookShareButton>
        </li>
        <li className='share-link-item'>
          <TwitterShareButton
            url={`${window.location.href}`}>
            <TwitterIcon
              size={32}
              round />
          </TwitterShareButton>
        </li>
        <li className='share-link-item'>
          <LinkedinShareButton
            url={`${window.location.href}`}
            windowWidth={750}
            windowHeight={600}>
            <LinkedinIcon
              size={32}
              round />
          </LinkedinShareButton>
        </li>
      </div>
    )
  }
}
