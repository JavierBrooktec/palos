import React from 'react';
import './index.css';
const Palo = (props) => {
  return (
    <button className={`palo ${props.value === 1 ? 'si' : null}`} onClick={props.onClick} disabled={props.disabled} />
  );
};

export default Palo;
