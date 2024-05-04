import * as React from 'react'
import { Box, Typography, Button, CircularProgress } from '@mui/material'

const Buttons = ({ ...props }) => {
  return (
    <Button
      variant='contained'
      disabled={props.disable}
      style={{
        height: props.height,
        width: props.width,
        background: props.color,
        borderRadius: props.radius,
        color: 'white',
        ...props.style,
        minWidth: '17px',
      }}
      onClick={props.onClick}
    >
      {props.isLoading ? (
        <CircularProgress color='inherit' size='20px' />
      ) : (
        <>
          {props.icon}
          <Typography
            variant='body2'
            style={{
              fontSize: props?.text?.length > 7 ? '15px' : '18px',
              fontWeight: 400,
              marginLeft: 3,
              textTransform: 'none'
            }}
          >
            {props.text}
          </Typography>
        </>
      )}
    </Button>
  )
}
export default Buttons
