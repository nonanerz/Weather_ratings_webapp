import { connect } from 'react-redux'
import { changeStateProp } from '../../../actions'
import CommentsSection from './CommentsSection'

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

const CommentsSectionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsSection)

export default CommentsSectionContainer
