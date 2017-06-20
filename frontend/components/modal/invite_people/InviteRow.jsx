import React from 'react';

// class InviteRow extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     email: ''
  //   }
  //
  //   this.handleChange = this.handleChange.bind(this);
  // }
  //
  // handleChange(e) {
  //   this.setState({
  //     email: e.currentTarget.value
  //   })
  // }

  // render() {

const InviteRow = props => {
  const isInitialRow = props.inviteCount === 1;
  const isValid = typeof props.isValid === 'undefined' ? true : props.isValid; // Could be undefined from the beginning

  return (
    <div className="invite__row">
      <label
        data-error={isValid ? "" : "This isn't a valid email address"}
        className={isValid ? "" : "error"}>EMAIL ADDRESS
        <input
          type="email"
          className="invite__input"
          value={props.email}
          onChange={props.handleChange}/>
      </label>

      { !isInitialRow && (
        <i
          onClick={props.handleRemove}
          className="material-icons">&#xE14C;</i>
      )}
    </div>
  )
}

export default InviteRow;
