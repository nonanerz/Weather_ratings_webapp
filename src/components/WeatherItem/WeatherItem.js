import React, { Component } from 'react'
import PropTypes from 'prop-types'
import API from '../../services/api'

// components
import Rating from '../Rating/RatingContainer'
import CommentsSection from './CommentsSection/CommentsSectionContainer'

export default class WeatherItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      commentsIsOpen: false,
      commentsSectionClass: 'close',
      commentsInProgress: false,
      fakeComments: [
        {
          userAvatar: 'https://scontent.fkbp1-1.fna.fbcdn.net/v/t1.0-9/20841064_466384913727894_9002602640872322003_n.jpg?oh=85dff90bdff449d6e3c01fd9ff33ebf1&oe=5B345BEB',
          text: 'Text comment text for testing of test lorem testing of test on test',
          userName: 'Daniel Yarmolenko',
          createAt: new Date()
        },
        {
          userAvatar: 'https://scontent.fkbp1-1.fna.fbcdn.net/v/t1.0-9/20841064_466384913727894_9002602640872322003_n.jpg?oh=85dff90bdff449d6e3c01fd9ff33ebf1&oe=5B345BEB',
          text: 'Text comment text for testing of test lorem testing of test on test',
          userName: 'Daniel Yarmolenko',
          createAt: new Date()
        },
        {
          userAvatar: 'https://scontent.fkbp1-1.fna.fbcdn.net/v/t1.0-9/20841064_466384913727894_9002602640872322003_n.jpg?oh=85dff90bdff449d6e3c01fd9ff33ebf1&oe=5B345BEB',
          text: 'Text comment text for testing of test lorem testing of test on test',
          userName: 'Daniel Yarmolenko',
          createAt: new Date()
        }],
      comments: []
    }
    this.toggleComments = this.toggleComments.bind(this)
    this.getComments = this.getComments.bind(this)
  }

  addComment (comment) {
    let newComments = this.state.comments.slice()
    newComments.unshift(comment)
    this.setState({comments: newComments}, () => {
      console.log(this.state.comments)
    })
  }

  toggleComments () {
    this.setState((prevState) => {
      return {commentsIsOpen: !prevState.commentsIsOpen}
    }, () => {
      if (this.state.commentsIsOpen) {
        this.setState({commentsSectionClass: 'open'}, () => {
          setTimeout(() => {
            this.setState({commentsInProgress: false})
          }, 400)
        })
      } else {
        this.setState({commentsSectionClass: 'hide'}, () => {
          setTimeout(() => {
            this.setState({commentsSectionClass: 'close'}, () => {
              this.setState({commentsInProgress: false})
            })
          }, 400)
        })
      }
    })
  }

  getComments () {
    if (!this.state.commentsInProgress) {
      this.setState({commentsInProgress: true}, () => {
        if (this.state.comments.length > 0) {
          this.toggleComments()
        } else if (this.state.comments.length === 0) {
          API.getComments(1)
            .then((comments) => {
              if (comments) {
                this.setState({comments}, () => {
                  this.toggleComments()
                })
              } else {
                this.setState({comments: this.state.fakeComments || []}, () => {
                  this.toggleComments()
                })
              }
            })
        }
      })
    }
  }

  render () {
    return (
      <div className='weather-item-container'>
        <div className='img-container'>
          <img src={this.props.item.logoUrl} alt='Resource logo' />
        </div>
        <div className='data-container'>
          <div className='data-wrapper'>
            <h2 className='weather-title'>{this.props.item.title}</h2>
            <p className='weather-description'>{this.props.item.description}</p>
            <a className='weather-link' href={this.props.item.url} target='_blank'>Link</a>
            <div className='rate-container'>
              <Rating
                rate={this.props.item.rating[0].rate}
                count={this.props.item.rating[0].count}
                resource={this.props.item._id}
                currentCity={this.props.currentCity}
              />
              <button className={`open-comments-btn ${this.state.commentsIsOpen ? 'active' : ''}`} onClick={this.getComments}>Коментарі</button>
            </div>
          </div>
          <CommentsSection
            className={`comments-container ${this.state.commentsSectionClass}`}
            comments={this.state.comments}
            resource={this.props.item._id}
            addComment={this.addComment}
          />
        </div>
      </div>
    )
  }
}

WeatherItem.defaultProps = {
  item: {
    image: '',
    description: '',
    title: '',
    rate: null
  }
}
WeatherItem.defaultType = {
  item: PropTypes.object
}
