import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Select extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.toggleSelect = this.toggleSelect.bind(this)
    this.isDescendant = this.isDescendant.bind(this)
  }
  componentDidMount () {
    document.addEventListener('click', this.handleClick)
  }
  componentWillReceiveProps (nextProps) {

  }
  componentWillUnmount () {
    document.removeEventListener('click', this.handleClick)
  }
  handleClick (event) {
    if (!this.isDescendant(event.target)) {
      this.setState({
        isOpen: false
      })
    }
  }
  isDescendant (child) {
    let node = child
    while (node != null) {
      if (node === this.select) {
        return true
      }
      node = node.parentNode
    }
    return false
  }
  toggleSelect () {
    if (!this.props.disabled) {
      this.setState(prevState => {
        return {isOpen: !prevState.isOpen}
      })
    }
  }
  handleSelect (e) {
    if (!this.props.disabled) {
      this.setState({
        isOpen: !this.state.isOpen
      })
      this.props.selectFunction(e.target.dataset.value)
    }
  }
  render () {
    return (
      <div
        className='select-container'
        ref={select => { this.select = select }}
      >
        <div className='select-input-container'>
          <input
            className='selected'
            type='text'
            value={this.props.value}
            placeholder={this.props.placeholder}
            disabled
          />
          <span onClick={this.toggleSelect} className='clickable' />
        </div>
        <ul
          className={`option-wrapper ${this.state.isOpen ? 'open' : ''} ${this.props.className || ''} ${this.props.scroll && 'scroll'}`}>
          {
            this.props.items.map((el, i) => {
              return (
                <li
                  key={i}
                  data-value={el.value}
                  className={`option ${el.disabled ? 'disabled' : ''}`}
                  onClick={el.disabled ? () => {} : this.handleSelect}>
                  {el.value}
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

Select.defaultProps = {
  selectFunction: {},
  items: [],
  value: '',
  placeholder: '',
  scroll: false,
  className: '',
  disabled: false
}
Select.defaultType = {
  selectFunction: PropTypes.func,
  items: PropTypes.array,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  scroll: PropTypes.boolean,
  className: PropTypes.string,
  disabled: PropTypes.boolean
}
