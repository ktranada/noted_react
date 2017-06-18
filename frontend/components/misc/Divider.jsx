import React from 'react';

const Divider = props => {
  return (
    <div className="divider">
        <hr />
        <div>
          { props.children }
        </div>
        <hr />
    </div>
  )
}

export default Divider;
