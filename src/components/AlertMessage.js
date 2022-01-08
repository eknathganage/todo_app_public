import React from 'react';

const AlertMessage = ({alertClass, message, updateAlertMessage}) => {
    setTimeout(() => {
        updateAlertMessage();
    }, 2000);
    return  <div className={`alert ${alertClass}`} role="alert">
        {message}
  </div>
}

export default AlertMessage;