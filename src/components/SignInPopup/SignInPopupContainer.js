import { connect } from 'react-redux'
import { changeStateProp } from '../../actions'
import SignInPopup from './SignInPopup'

const mapStateToProps = (state, ownProps) => {
  console.log(2222, state.main.SignInPopupContent)
  return {
    SignInPopupContent: state.main.SignInPopupContent,
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

const SignInPopupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInPopup)

export default SignInPopupContainer