import { connect } from 'react-redux'
import { changeStateProp } from '../../../actions'
import Home from './Home'

const mapStateToProps = (state, ownProps) => {
  return {
    region: state.main.region,
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

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default HomeContainer
