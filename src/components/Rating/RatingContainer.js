import { connect } from 'react-redux'
import { changeStateProp } from '../../actions'
import Rating from './Rating'

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

const RatingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Rating)

export default RatingContainer