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
      comments: []
    }
    this.toggleComments = this.toggleComments.bind(this)
    this.getComments = this.getComments.bind(this)
    this.addComment = this.addComment.bind(this)
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
          API.getComments(this.props.item._id)
            .then((comments) => {
              if (comments) {
                this.setState({comments}, () => {
                  this.toggleComments()
                })
              } else {
                this.setState({comments: []}, () => {
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
          <img src={`https://admin.weather-rate.me/${this.props.item.file}`} alt='Resource logo' />
        </div>
        <div className='data-container'>
          <div className='data-wrapper'>
            <h2 className='weather-title'>{this.props.item.title}</h2>
            <p className='weather-description'>{this.props.item.description}</p>
            <a className='weather-link' href={this.props.item.url} target='_blank'>Link</a>
            <div className='rate-container'>
              <Rating
                rate={this.props.item.rating.length ? this.props.item.rating[0].average_transaction_amount : 0}
                count={this.props.item.rating.length ? this.props.item.rating[0].count : 0}
                resource={this.props.item._id}
                region={this.props.currentCity}
                updateResource={this.props.updateResource}
                indexOfRecource={this.props.index}
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
    rating: null
  }
}
WeatherItem.defaultType = {
  item: PropTypes.object
}
