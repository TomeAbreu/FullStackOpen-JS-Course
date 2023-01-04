import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.notification)
  const error = useSelector((state) => state.error)

  if (message === null && error === null) {
    return <div></div>
  } else if (message !== null && error === null) {
    return (
      <Snackbar
        open={message !== null}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={4000}
      >
        <Alert severity='success' sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    )
  } else {
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={error !== null}
        autoHideDuration={4000}
      >
        <Alert severity='error' sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    )
  }
}

export default Notification
