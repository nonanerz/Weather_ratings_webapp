import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rating from '../Rating/RatingContainer'

export default class WeatherItem extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className='weather-item-container'>
        <div className='img-container'>
          <img src={this.props.item.logoUrl} alt='weather image' />
        </div>
        <div className='data-container'>
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
          </div>
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

