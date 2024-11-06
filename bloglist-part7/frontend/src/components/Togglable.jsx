//toglable componen for showing blogForm

//dependencies
import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

// togglable component, forwardRef allows parent components to access its fuctionalities
const Togglable = forwardRef((props, ref) => {
  // state for visibility
  const [visible, setVisible] = useState(false)

  // functionality for showing or not the form by css style display
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  // function to toggle the visibility state
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // useImperativeHandle allows parent component to toggle visibility
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  // for rendering buttons
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})

// setting the prop types (button label is string and it is reguired)
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

// display name for debugging
Togglable.displayName = 'Togglable'

//exports
export default Togglable