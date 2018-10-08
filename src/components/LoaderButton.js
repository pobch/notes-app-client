import React from 'react'
import { Button, Glyphicon } from 'react-bootstrap'
import './LoaderButton.css'

const LoaderButton = ({
  isLoading,
  text,
  loadingText,
  className = '',
  disabled = false,
  ...props
}) => 
  <Button
    className={`${className} LoaderButton`}
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading
      ? <React.Fragment>
          <Glyphicon glyph="refresh" className="spinning" />
          {loadingText}
        </React.Fragment>
      : text
    }
  </Button>

export default LoaderButton
