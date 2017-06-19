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
  return (
    <div className="invite__row">
      <label>EMAIL ADDRESS
        <input
          type="text"
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
