//toglable componen for showing blogForm
//dependencies
import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

// togglable component, forwardRef allows parent components to access its fuctionalities
const Togglable = forwardRef((props, ref) => {
  /*TODO refactor style to .css file*/
  const cancelButton = {
    marginLeft: 30,
  }

  const marginTop = {
    marginTop: 20,
    marginLeft: 30,
    width: 150,
  }

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
      toggleVisibility,
    }
  })

  // for rendering buttons
  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="primary" className="Button" style={marginTop} onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          variant="primary"
          className="delButton"
          style={cancelButton}
          onClick={toggleVisibility}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
})

// setting the prop types (button label is string and it is reguired)
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node, // children voi olla mitä tahansa Reactin sisällöstä
}

// display name for debugging
Togglable.displayName = 'Togglable'

//exports
export default Togglable
