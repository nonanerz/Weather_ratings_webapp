import update from 'immutability-helper'
import {CHANGE_STATE_PROP} from '../constans/index'

const REDUCER = 'MAIN'
const defaultState = {
  SignInPopupShow: false,
  city: ''
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case REDUCER + CHANGE_STATE_PROP:
      return update(state, {
        [action.state.prop]: {$set: action.state.value}
      })
    default:
      return state
  }
}
