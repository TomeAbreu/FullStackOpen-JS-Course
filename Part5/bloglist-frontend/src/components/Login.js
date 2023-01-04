import React from 'react'
import { Avatar, Box, Button, Grid, TextField } from '@mui/material'
import { Paper } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import { green } from '@mui/material/colors'

const Login = ({ loginCallback, setUsername, setPassword }) => {
  const paperStyle = {
    padding: '20px',
    height: '100vh',
    width: '300px',
    margin: '20px auto',
  }
  const loginButtonStyle = {
    margin: '20px',
  }

  return (
    <div>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
            <Avatar alt='Login' sx={{ bgcolor: green[500], margin: '20px' }}>
              <LoginIcon></LoginIcon>
            </Avatar>
          </Grid>
          <Grid align='center'>
            <Box
              component='form'
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete='off'
              onSubmit={(event) => loginCallback(event)}
            >
              <div>
                <TextField
                  id='username'
                  label='Username'
                  placeholder='Enter username...'
                  onChange={({ target }) => setUsername(target.value)}
                />
                <TextField
                  id='password'
                  label='Password'
                  type='password'
                  placeholder='Enter password...'
                  autoComplete='current-password'
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>
              <Button variant='outlined' type='submit' style={loginButtonStyle}>
                Login
              </Button>
            </Box>
          </Grid>
        </Paper>
      </Grid>
    </div>
  )
}

export default Login
