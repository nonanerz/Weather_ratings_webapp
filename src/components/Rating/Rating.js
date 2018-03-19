import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StarRatings from 'react-star-ratings'
import API from '../../services/api'

export default class Rating extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rating: this.props.rate || 0
    }
    this.changeRate = this.changeRate.bind(this)
    this.setRating = this.setRating.bind(this)
    this.updateRating = this.updateRating.bind(this)
  }

  changeRate (newRating) {
    let SignInPopupContent = {
      title: 'Rating',
      description: 'Please sign in to continue',
      close: true,
      callback: (userData) => {
        this.setRating(newRating, userData)
      }
    }
    this.props.changeStateProp('SignInPopupContent', SignInPopupContent, 'main')
    this.props.changeStateProp('SignInPopupShow', true, 'main')
  }
  setRating (rating, userData) {
    userData.rating = rating
    userData.resource = this.props.resource
    userData.city = this.props.currentCity
    API.postRating(userData)
      .then((res) => {
        this.updateRating(rating)
      })
  }

  updateRating (rating) {
    this.setState({rating})
  }

  render () {
    return (
      <div className='rate-container'>
        <div className='stars-container'>
          <StarRatings
            rating={this.state.rating}
            starRatedColor='#ffdb4d'
            starHoverColor='#ffdb4d'
            starDimension='20px'
            starSpacing='2px'
            changeRating={this.changeRate}
            numberOfStars={5}
          />
        </div>
        <span className='rate-counts'>{this.props.count}</span>
      </div>
    )
  }
}

Rating.defaultProps = {
  rate: 0,
  count: 0
}
Rating.defaultType = {
  rate: PropTypes.Number,
  count: PropTypes.Number
}
