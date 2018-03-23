import React, { Component } from 'react'
import API from '../../../services/api'
import {CITIES} from '../../../constans/cities'
import update from 'immutability-helper'

// components
import Select from '../../Select/Select'
import WeatherItem from '../../WeatherItem/WeatherItemContainer'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentCity: '',
      currentRegion: 0,
      resources: [],
      cities: []
    }
    this.selectFunction = this.selectFunction.bind(this)
    this.getResources = this.getResources.bind(this)
    this.updateResource = this.updateResource.bind(this)
  }
  componentWillMount () {
    this.setState({
      cities: CITIES || []
    }, () => {
      let index = false
      for (let i = 0; i < this.state.cities.length; i++) {
        if (this.state.cities[i].region === this.props.region) {
          index = i
        }
      }
      if (index) {
        this.setState((prevState) => {
          return {
            currentCity: prevState.cities[index].value,
            currentRegion: prevState.cities[index].region
          }
        }, () => {
          this.getResources(this.state.currentRegion)
        })
      }
    })
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.region !== this.props.region || !this.state.currentRegion) {
      let index = false
      for (let i = 0; i < this.state.cities.length; i++) {
        if (this.state.cities[i].region === nextProps.region) {
          index = i
        }
      }
      if (index !== false) {
        this.setState((prevState) => {
          return {
            currentCity: prevState.cities[index].value,
            currentRegion: prevState.cities[index].region
          }
        }, () => {
          this.getResources(this.state.currentRegion)
        })
      }
    }
  }
  getResources (region) {
    region = region || 'any'
    API.getResources(region)
      .then((resources) => {
        if (resources) {
          console.log(resources)
          this.setState({resources})
        }
      })
  }
  updateResource (newData, index) {
    this.setState({
      resources: update(this.state.resources, {
        [index]: {$set: newData}
      })
    })
  }
  selectFunction (value) {
    let index = false
    for (let i = 0; i < this.state.cities.length; i++) {
      if (this.state.cities[i].value === value) {
        index = i
      }
    }
    if (index !== false) {
      this.props.changeStateProp('region', this.state.cities[index].region, 'main')
    }
  }
  render () {
    return (
      <section className='home-section'>
        <div className='container'>
          <Select selectFunction={this.selectFunction} items={this.state.cities} value={this.state.currentCity} />
          {
            this.state.resources.map((item, i) => {
              return (
                <WeatherItem
                  key={`weather-${i}`}
                  index={i}
                  item={item}
                  updateResource={this.updateResource}
                  currentCity={this.state.currentRegion}
                />
              )
            })
          }
        </div>
      </section>
    )
  }
}
