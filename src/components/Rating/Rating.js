import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StarRatings from 'react-star-ratings'

export default class Rating extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rating: this.props.rate || 0
    }

    this.changeRating = this.changeRating.bind(this)
  }

  changeRating( newRating ) {
    this.setState({
      rating: newRating
    })
  }

  render () {
    return (
      <div className='rate-container'>
        <div className='stars-container'>
          <StarRatings
            rating={this.state.rating}
            starRatedColor="#ffdb4d"
            starHoverColor="#ffdb4d"
            // starEmptyColor="transparent"
            starDimension="20px"
            starSpacing="2px"
            changeRating={this.changeRating}
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
