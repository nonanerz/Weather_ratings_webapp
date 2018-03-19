import axios from 'axios'
import {API_HOST} from '../config'

axios.defaults.baseURL = API_HOST

export default class API {
  static getResources (city = 'any') {
    return axios(`/resources/${city}`, {
      method: 'get'
    })
      .then(response => {
        return response.data.resources // return response;
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else {
          console.log('Strange Error', error.message)
        }
      })
  }
  static postRating (data) {
    return axios(`/ratings`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(data)
    })
      .then(response => {
        return response.data // return response;
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else {
          console.log('Strange Error', error.message)
        }
      })
  }
  static getUserLocation () {
    return axios('http://ip-api.com/json', {
      method: 'get'
    })
      .then(response => {
        return response.data // return response;
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else {
          console.log('Strange Error', error.message)
        }
      })
  }
}
