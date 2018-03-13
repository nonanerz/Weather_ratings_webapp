import { connect } from 'react-redux'
import { changeStateProp } from '../../actions'
import WheatherItem from './WheatherItem'

const mapStateToProps = (state, ownProps) => {
  return {
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
)(WheatherItem)

export default AppContainer