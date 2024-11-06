//Refactored some functionalities from App.jsx to hooks. Not sure if this is the correct way to do it.
//Function for showing information messagers to user

//dependencies
import { useState } from 'react'

const useShowMessage = () => {
  //states for message and message type
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  const showMessage = (message, type) => {
    // set states
    setErrorMessage(message)
    setMessageType(type)

    // If message type is error display time is longer
    const displayTime = type === 'error' ? 10000 : 5000 // error message 10 s, other 5 s

    //hide message after the delay
    setTimeout(() => {
      setErrorMessage(null)
    }, displayTime)
  }

  return { errorMessage, messageType, showMessage }
}

// exports
export default useShowMessage