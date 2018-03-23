import React, {Component} from 'react'
import PropTypes from 'prop-types'
import API from '../../../services/api'

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
    this.clickOnSubmitButton = this.clickOnSubmitButton.bind(this)
    this.submit = this.submit.bind(this)
    this.getCommentsDate = this.getCommentsDate.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.comments.length !== this.state.comments.length) {
      console.log(nextProps.comments)
      this.setState({
        comments: nextProps.comments
      })
    }
  }

  changeCommentsText (event) {
    this.setState({value: event.target.value})
  }

  clickOnSubmitButton () {
    if (this.state.value) {
      let SignInPopupContent = {
        title: 'Comment',
        description: 'Please sign in to continue',
        close: true,
        callback: (userData) => {
          this.submit(userData)
        }
      }
      this.props.changeStateProp('SignInPopupContent', SignInPopupContent, 'main')
      this.props.changeStateProp('SignInPopupShow', true, 'main')
    }
  }

  submit (userData) {
    if (this.state.value) {
      let commentData = {
        username: userData.userName,
        userAvatar: userData.userAvatar,
        comment: this.state.value,
        resource: this.props.resource
      }
      API.postComment(commentData)
        .then((res) => {
          if (res && res.comment) {
            this.props.addComment(res.comment)
          }
        })
    }
  }

  getCommentsDate (value) {
    let date = new Date(value)
    return `${date.getUTCDate()}.${date.getUTCMonth() + 1}.${date.getUTCFullYear()}`
  }

  render () {
    return (
      <div className={this.props.className}>
        <div className={`comment-input-container ${this.state.comments.length <= 1 ? 'withoutComments' : ''}`}>
          <TextArea
            placeholder='Ваш коментар..'
            value={this.state.value}
            change={this.changeCommentsText}
            className='comment-field'
          />
          <button
            className={`submit-comment-btn ${!this.state.value ? 'disabled' : ''}`}
            disabled={!this.state.value}
            onClick={this.clickOnSubmitButton}>Відправити</button>
        </div>
        <div className={`comments-scroll-container ${this.state.comments.length > 1 ? 'withComments' : ''}`}>
          <ul className='comment-wrapper'>
            {this.state.comments.map((item, i) => {
              return (
                <li key={`comment-${i + 1}`} className='comment-item'>
                  <div className='avatar-container'>
                    <img src={item.userAvatar} alt='avatar' />
                  </div>
                  <div className='comment-data-container'>
                    <p className='user-name'>{item.username}</p>
                    {/* <p className='create-at'>{this.getCommentsDate(item.createAt)}</p> */}
                    <p className='comment-text'>{item.comment}</p>
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
