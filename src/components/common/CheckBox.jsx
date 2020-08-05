import React from 'react';

function CheckBox({ checked, onClick, cursor }) {
  const classes = !checked ? 'fa fa-square-o' : 'fa fa-check-square-o';

  return (
    <i
      onClick={onClick}
      style={{ cursor: { cursor } }}
      className={classes}
      aria-hidden="true"
    ></i>
  );
}

export default CheckBox;
