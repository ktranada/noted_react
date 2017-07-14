import React from 'react';
import PropTypes from 'prop-types'

import Spinner from '../util/Spinner';

const propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    display: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  })),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  isFetchingOptions: PropTypes.bool
}

const defaultProps = {
  placeholder: 'Select...',
  isFetchingOptions: false
}

class Select extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    }

    this.handleBlur = this.handleBlur.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.selectMenu = this.selectMenu.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  handleBlur(e) {
    if (this.state.isOpen) {
      this.toggleMenu();
    }
  }

  handleSelect(e) {
    if (e.target.classList.contains('item')) {
      this.props.onSelect(e.target.dataset.value);
      this.setState({
        isOpen: false
      })
    }
  }

  toggleMenu() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  getDisplayName() {
    const option = this.props.options.find(opt => opt.value === this.props.value);
    return option === undefined ? '' : option.display;
  }

  selectMenu() {
    return (
      <div
        onClick={this.handleSelect}
        className="select__menu"
      >
        {
          this.props.options.map(({display, value}) => {
            return (
              <div
                key={display}
                role="option"
                data-value={value}
                className={`item ${this.props.value === value ? 'selected' : ''}`}
              >
                {display}
              </div>
            )
          })
        }
      </div>
    )
  }

  render() {
    const openClass =this.state.isOpen ? 'active' : '';

    return (
      <div
        tabIndex={1}
        onBlur={this.handleBlur}
        className={`select__container ${openClass}`}
      >
        <div onClick={this.toggleMenu} className="select__control">
          {
            !this.props.value.trim()
              ? <div className="select__placeholder">{this.props.placeholder}</div>
              : <span className="select__value">{this.getDisplayName()}</span>
          }
          {
            this.state.isOpen
              ? <i className="material-icons">&#xE316;</i>
              : <i className="material-icons">&#xE313;</i>
          }
        </div>
        {this.selectMenu()}
      </div>
    )
  }
}

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
