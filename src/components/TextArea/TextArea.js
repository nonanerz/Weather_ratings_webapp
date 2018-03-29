import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TextArea extends Component {
  constructor (props) {
    super(props)
    this.state = {
      height: 0
    }
    this.changeValue = this.changeValue.bind(this)
    this.handleHeight = this.handleHeight.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      value: nextProps.value
    }, () => {
      this.handleHeight(nextProps.value)
    })
  }

  componentDidMount () {
    this.handleHeight(this.props.value)
  }

  handleHeight (value) {
    if (value === '') {
      this.setState({height: 45})
    } else {
      this.setState({height: this.field.scrollHeight})
    }
  }

  changeValue (e) {
    this.handleHeight(e.target.value)
    this.props.change(e)
  }

  render () {
    return (
      <div className='textArea-container'>
        <textarea
          ref={(field) => { this.field = field }}
          value={this.props.value}
          onChange={this.changeValue}
          className={`textArea ${this.props.className || ''}`}
          placeholder={this.props.placeholder}
          style={{height: this.state.height + 'px'}}
          name={this.props.name}
        />
      </div>
    )
  }
}

TextArea.defaultProps = {
  change: () => {},
  value: '',
  placeholder: '',
  className: '',
  name: ''
}
TextArea.defaultType = {
  change: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string
}
