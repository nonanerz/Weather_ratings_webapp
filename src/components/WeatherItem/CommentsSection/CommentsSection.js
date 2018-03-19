import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Components
import TextArea from '../../TextArea/TextArea'

export default class CommentsSection extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      comments: []
    }
    this.changeCommentsText = this.changeCommentsText.bind(this)
    this.submit = this.submit.bind(this)
    this.getCommentsDate = this.getCommentsDate.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.comments.length !== this.state.comments.length) {
      this.setState({
        comments: nextProps.comments
      })
    }
  }

  changeCommentsText (event) {
    this.setState({value: event.target.value})
  }

  submit () {

  }

  getCommentsDate (date) {
    return `${date.getUTCDate()}.${date.getUTCMonth() + 1}.${date.getUTCFullYear()}`
  }

  render () {
    return (
      <div className={this.props.className}>
        <div className='comment-input-container'>
          <TextArea
            placeholder='Comment..'
            value={this.state.value}
            change={this.changeCommentsText}
            className='comment-field'
          />
          <button className='submit-comment-btn' onClick={this.submit}>Submit</button>
        </div>
        <div className='comments-scroll-container'>
          <ul className='comment-wrapper'>
            {this.state.comments.map((item, i) => {
              return (
                <li key={`comment-${i + 1}`} className='comment-item'>
                  <div className='avatar-container'>
                    <img src={item.userAvatar} />
                  </div>
                  <div className='comment-data-container'>
                    <p className='user-name'>{item.userName}</p>
                    <p className='create-at'>{this.getCommentsDate(item.createAt)}</p>
                    <p className='comment-text'>{item.text}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

CommentsSection.defaultProps = {
  comments: [],
  className: ''
}
CommentsSection.defaultType = {
  comments: PropTypes.array,
  className: PropTypes.string
}
