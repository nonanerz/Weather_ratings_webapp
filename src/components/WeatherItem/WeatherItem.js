import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
      commentsCount: 0
    }
    this.toggleComments = this.toggleComments.bind(this)
    this.addCommentsCount = this.addCommentsCount.bind(this)
  }

  componentWillMount () {
    this.setState({commentsCount: this.props.item.commentsCount})
  }

  addCommentsCount () {
    this.setState((prevState) => {
      return {commentsCount: ++prevState.commentsCount}
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

  render () {
    return (
      <div className='weather-item-container'>
        <a className='img-container' href={this.props.item.url} target='_blank'>
          <img src={`https://admin.weather-rate.me/${this.props.item.file}`} alt='Resource logo' />
        </a>
        <div className='data-container'>
          <div className='data-wrapper'>
            <h2 className='weather-title'><a href={this.props.item.url} target='_blank'>{this.props.item.title}</a></h2>
            <p className='weather-description'>{this.props.item.description}</p>
            <div className='rate-and-comments-container'>
              <Rating
                rate={this.props.item.rating.length ? this.props.item.rating[0].average_transaction_amount : 0}
                count={this.props.item.rating.length ? this.props.item.rating[0].count : 0}
                resource={this.props.item._id}
                region={this.props.currentCity}
                updateResource={this.props.updateResource}
                indexOfRecource={this.props.index}
              />
              <button className={`open-comments-btn ${this.state.commentsIsOpen ? 'active' : ''}`} onClick={this.toggleComments}>{`Коментарі (${this.state.commentsCount})`}</button>
            </div>
          </div>
          <CommentsSection
            className={`comments-container ${this.state.commentsSectionClass}`}
            resource={this.props.item._id}
            addCommentsCount={this.addCommentsCount}
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
