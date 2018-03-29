import React, {Component} from 'react'
import update from 'immutability-helper'
import {EMAIL_REGEXP} from '../../constans'
import {getUserFromSessionStorage} from '../../utils/main'
import API from '../../services/api'

// components
import TextArea from '../TextArea/TextArea'

export default class ContactUs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      formData: {
        email: {
          value: '',
          valid: true,
          validator: 'email',
          minLength: 3
        },
        name: {
          value: '',
          valid: true,
          validator: 'text',
          minLength: 3
        },
        comment: {
          value: '',
          valid: true,
          validator: 'text',
          minLength: 10
        }
      }
    }

    this.changeInput = this.changeInput.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentWillMount () {
    getUserFromSessionStorage()
      .then((user) => {
        if (user && user.userName) {
          this.setState({
            formData: update(this.state.formData, {
              name: {
                value: {$set: user.userName}
              }
            })
          })
        }
      })
  }

  changeInput ({target: {value, name}}) {
    this.setState({
      formData: update(this.state.formData, {
        [name]: {
          value: {$set: value},
          valid: {$set: true}
        }
      })
    })
  }

  clearInputs (data) {
    for (let key in data) {
      if (data[key] && data[key].value) {
        this.setState({
          formData: update(this.state.formData, {
            [key]: {
              value: {$set: ''}
            }
          })
        })
      }
    }
  }

  async validation (data) {
    let check = true
    for (let key in data) {
      if (data[key] && data[key].minLength) {
        if (data[key].value.length < data[key].minLength) {
          check = false
          await this.setState({
            formData: update(this.state.formData, {
              [key]: {
                valid: {$set: false},
                errorMessage: {$set: `Мінімум ${data[key].minLength} ${data[key].minLength > 4 ? 'символів' : data[key].minLength === 1 ? 'символ' : 'символа'}`}
              }
            })
          })
        }
      }
      if (check && data[key] && data[key].validator) {
        if (data[key].validator === 'email') {
          if (!EMAIL_REGEXP.test(data[key].value)) {
            check = false
            await this.setState({
              formData: update(this.state.formData, {
                [key]: {
                  valid: {$set: false},
                  errorMessage: {$set: `Не коректний емейл.`}
                }
              })
            })
          }
        }
      }
    }
    return check
  }

  convertData (data) {
    let convertedData = {}
    for (let key in data) {
      convertedData[key] = data[key].value
    }
    return convertedData
  }

  submit (event) {
    event.preventDefault()
    this.validation(this.state.formData)
      .then((result) => {
        if (result) {
          let convertedData = this.convertData(this.state.formData)
          API.sendEmail(convertedData)
            .then(() => {
              this.clearInputs(this.state.formData)
            })
        }
      })
  }

  render () {
    return (
      <section className='contact-us-section'>
        <div className='container'>
          <h2>Зв'яжіться з нами</h2>
          <form className='form-container'>
            <input
              type='text'
              value={this.state.formData.name.value}
              placeholder={`Ім'я`}
              name='name'
              className={!this.state.formData.name.valid ? 'invalid' : ''}
              onChange={this.changeInput}
            />
            <input
              type='text'
              value={this.state.formData.email.value}
              placeholder='Емейл'
              name='email'
              className={!this.state.formData.email.valid ? 'invalid' : ''}
              onChange={this.changeInput}
            />
            <TextArea
              placeholder='Ваш коментар..'
              value={this.state.formData.comment.value}
              name='comment'
              change={this.changeInput}
              className={`comment-field ${!this.state.formData.comment.valid ? 'invalid' : ''}`}
            />
            <button onClick={this.submit} className='submit-button'>Відправити</button>
          </form>
        </div>
      </section>
    )
  }
}
