import React, { Component } from 'react'

// components
import { Share } from '../Share/Share'

export default class AboutUs extends Component {
  render () {
    return (
      <section className='about-us-section'>
        <div className='container'>
          <h2>Про нас</h2>
          <p>
            Цей ресурс призначенний для того, щоб ви могли знайти відповідний до вашого регіону прогноз погоди, та оцінити
            ці системи, як вони працюють у вашому регіоні.
          </p>
        </div>
        <Share />
      </section>
    )
  }
}
