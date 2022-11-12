import React from 'react'
import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

//Foward ref to component access references(in this case the app component has a reference to this component )
const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  //Add display style to buttons if component if child react component is visible
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  //Toggle visibility function
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  //Make toggleVisibility function available from components using references
  //(in this case the app component has a reference to this component)
  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {/* References the React elements that we define between the opening and closing tags of Toggable (in this case ill be NewBlogForm) */}
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
