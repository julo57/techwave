import React from 'react'
import "./PopUp.css";

function PopUp(props) {
  return (props.trigger) ? (
    <div>
        <div className="popup">
          <div className="popup-inner">
            <button className="close-btn" onClick={() => props.setTrigger(false)}>X</button>
            { props.children }
        </div>
          </div>
      </div>
  ) : "";
}

export default PopUp
