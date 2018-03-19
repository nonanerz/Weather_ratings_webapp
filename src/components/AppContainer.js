import { connect } from 'react-redux'
import { changeStateProp } from '../actions'
import App from './App'

const mapStateToProps = (state, ownProps) => {
  return {
    SignInPopupShow: state.main.SignInPopupShow,
    ...ownProps
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeStateProp: function (prop, value, reducer) {
      changeStateProp(prop, value, reducer)(dispatch)
      return null
    }
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer
