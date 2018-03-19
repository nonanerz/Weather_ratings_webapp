import { connect } from 'react-redux'
import { changeStateProp } from '../../actions'
import WeatherItem from './WeatherItem'

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

const WeatherItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherItem)

export default WeatherItemContainer
