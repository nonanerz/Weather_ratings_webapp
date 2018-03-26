import React, {Component} from 'react'
import PropTypes from 'prop-types'
import API from '../../../services/api'

// Components
import TextArea from '../../TextArea/TextArea'
import {getUserFromLocaleStorage} from '../../../utils/main'

export default class CommentsSection extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      comments: [],
      currentPage: 1,
      limitOfComments: 5,
      totalComments: 0
    }
    this.changeCommentsText = this.changeCommentsText.bind(this)
    this.clickOnSubmitButton = this.clickOnSubmitButton.bind(this)
    this.submit = this.submit.bind(this)
    this.getCommentsDate = this.getCommentsDate.bind(this)
    this.onScrollComments = this.onScrollComments.bind(this)
    this.getComments = this.getComments.bind(this)
  }

  componentWillMount () {
    this.getComments(this.props.resource, 1, true)
  }

  addComment (comment) {
    let newComments = this.state.comments.slice()
    newComments.unshift(comment)
    this.setState({comments: newComments})
  }

  getComments (id, page) {
    if (page === 1 || page <= Math.ceil(this.state.totalComments / this.state.limitOfComments)) {
      API.getComments(id, page)
        .then((data) => {
          if (data.comments) {
            this.setState({
              comments: this.state.comments.concat(data.comments),
              totalComments: data.count,
              currentPage: page
            })
          }
        })
    }
  }

  changeCommentsText (event) {
    this.setState({value: event.target.value})
  }

  clickOnSubmitButton () {
    if (this.state.value) {
      getUserFromLocaleStorage()
        .then((user) => {
          if (user) {
            this.submit(user)
          } else {
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
        })
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
            this.addComment(res.comment)
            this.props.addCommentsCount()
            this.setState({value: ''})
          }
        })
    }
  }

  getCommentsDate (value) {
    let date = new Date(value)
    let month = date.getUTCMonth() + 1
    return `${date.getUTCDate()}.${month < 10 ? `0${month}` : month}.${date.getUTCFullYear()}`
  }

  onScrollComments ({target}) {
    if (target.scrollTop === target.scrollHeight - target.clientHeight) {
      this.getComments(this.props.resource, this.state.currentPage + 1)
    }
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
        <div
          className={`comments-scroll-container ${this.state.comments.length > 1 ? 'withComments' : ''}`}
          onScroll={this.onScrollComments}
        >
          <ul className='comment-wrapper'>
            {this.state.comments.map((item, i) => {
              return (
                <li key={`comment-${i + 1}`} className='comment-item'>
                  <div className='avatar-container'>
                    <img src={item.userAvatar} alt='avatar' />
                  </div>
                  <div className='comment-data-container'>
                    <p className='user-name'>{item.username}</p>
                    {item.createdAt && <p className='create-at'>{this.getCommentsDate(item.createdAt)}</p>}
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
