import React, { Component } from 'react'

// components
import Select from '../../Select/Select'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      wheatherItems: [{}],
      items: [{
        value: 'Cherkassy'
      }]
    }
    this.selectFunction = this.selectFunction.bind(this)
  }
  selectFunction (value) {
    console.log(11111, value)
  }
  render () {
    return (
      <section className='home-section'>
        <div className='container'>
          <Select selectFunction={this.selectFunction} items={this.state.items} />
        </div>
      </section>
    )
  }
}