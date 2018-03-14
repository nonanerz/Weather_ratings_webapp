import React, { Component } from 'react'
import API from '../../../services/api'

// components
import Select from '../../Select/Select'
import WeatherItem from '../../WeatherItem/WeatherItemContainer'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      resources: [
        {
          logoUrl: 'https://i.imgur.com/CcVQDt2.png?1',
          url: 'https://sinoptik.ua/',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.',
          title: 'Sinoptik',
          rating: [{
            rate: 4,
            count: 25
          }]
        },
        {
          logoUrl: 'https://www.3ona51.com/images/news/20120209/gismeteo.png',
          url: 'https://www.gismeteo.ua/',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec',
          title: 'Gis Meteo',
          rating: [{
            rate: 3,
            count: 5
          }]
        },
        {
          logoUrl: 'https://lh3.googleusercontent.com/6xg_MsPngdRfN9McVq7t27AVSo8UCEJVK-DQjMH-jnQW4EnXvJK24XstSjk-Fk4UtA',
          url: 'http://rp5.ua/',
          description: 'Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,',
          title: 'RP5',
          rating: [{
            rate: 5,
            count: 125
          }]
        }
      ],
      items: [
        {
          value: 'Черкаси'
        },
        {
          value: 'Київ'
        },
        {
          value: 'Львів'
        },
        {
          value: 'Харьків'
        },
        {
          value: 'Харьків'
        },
        {
          value: 'Харьків'
        },
        {
          value: 'Полтава'
        }
      ]
    }
    this.selectFunction = this.selectFunction.bind(this)
  }
  componentWillMount () {
    API.getResources()
      .then((resources) => {
        if (resources) {
          this.setState({resources})
        }
      })
  }
  selectFunction (value) {
    this.props.changeStateProp('city', value, 'main')
  }
  render () {
    return (
      <section className='home-section'>
        <div className='container'>
          <Select selectFunction={this.selectFunction} items={this.state.items} value={this.props.city} />
          {
            this.state.resources.map((item, i) => {
              return (
                <WeatherItem
                  key={`weather-${i}`}
                  item={item}
                />
              )
            })
          }
        </div>
      </section>
    )
  }
}