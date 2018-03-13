import axios from 'axios'
import {API_HOST} from '../config'

axios.defaults.baseURL = API_HOST

export default class API {
  static get () {
    return axios(`/`, {
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