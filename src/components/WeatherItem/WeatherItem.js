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
        }]
    }
    this.toggleComments = this.toggleComments.bind(this)
  }
  toggleComments () {
    this.setState((prevState) => {
      return {commentsIsOpen: !prevState.commentsIsOpen}
    }, () => {
      if (this.state.commentsIsOpen) {
        this.setState({commentsSectionClass: 'open'})
      } else {
        this.setState({commentsSectionClass: 'hide'}, () => {
          setTimeout(() => {
            this.setState({commentsSectionClass: 'close'})
          }, 400)
        })
      }
    })
  }

  render () {
    return (
      <div className='weather-item-container'>
        <div className='img-container'>
          <img src={this.props.item.logoUrl} alt='weather image' />
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
              <button className={`open-comments-btn ${this.state.commentsIsOpen ? 'active' : ''}`} onClick={this.toggleComments}>Коментарі</button>
            </div>
          </div>
          <CommentsSection className={`comments-container ${this.state.commentsSectionClass}`} comments={this.state.fakeComments} />
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
