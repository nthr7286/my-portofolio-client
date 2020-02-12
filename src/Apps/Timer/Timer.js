import React, { useReducer, useEffect } from 'react'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1)
  },
  card: {
    minWidth: 300,
    maxWidth: 400,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

export default props => {
  const classes = useStyles();
  const initialState = {
    date: 0,
    startTime: 0,
    elapsedTime: 0,
    initialTime: 0,
    inactive: true,
    isSetTimer: true,
    textContent: '00:00'
  }
  const reducer = (state, action) => {
    const getTime = d => {
      const m = Math.floor((d%(60*60*1000))/(60*1000))
        .toString()
        .padStart(2, '0')
      const s = Math.floor((d%(60*1000))/1000)
        .toString()
        .padStart(2, '0') 
      return `${m}:${s}`
    }
    let initialTime
    switch (action.type) {
      case 'START':
        return {
          ...state,
          startTime: Date.now(),
          inactive: false,
          isSetTimer: false,
        }
      case 'PAUSE':
        return {
          ...state,
          startTime: Date.now(),
          elapsedTime: Date.now() - state.startTime + state.elapsedTime,
          inactive: true,
        }
      case 'RESET':
        return initialState
      case 'INCREMENT10MIN':
        initialTime = state.initialTime + 10*60*1000
        return {
          ...state,
          initialTime,
          textContent: getTime(initialTime)
        }
      case 'INCREMENT1MIN':
        initialTime = state.initialTime + 1*60*1000
        return {
          ...state,
          initialTime,
          textContent: getTime(initialTime)
        }
      case 'INCREMENT10SEC':
        initialTime = state.initialTime + 10*1000
        return {
          ...state,
          initialTime,
          textContent: getTime(initialTime)
        }
      case 'PROGRESS':
        const date = state.initialTime 
           - (Date.now() - state.startTime + state.elapsedTime)
        return (date<0) ? initialState : { 
          ...state,
          date,
          textContent: getTime(date)
        }
      default:
        return state
  }}

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (!state.inactive) {
      let timeoutId = setTimeout(() => {
          dispatch({ type: 'PROGRESS' })
      }, 30)
      return () => clearTimeout(timeoutId)
    }
  })

  return <div className={classes.root}>
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h1" align="center">
            {state.textContent}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.controls}>
        <Button
          color="primary"
          onClick={ () => dispatch({ type: 'RESET' }) }
          disabled={
            !state.inactive ||
            state.textContent === initialState.textContent
          }
        >
          RESET
        </Button>
        {/*
        <Button
          color="primary"
          onClick={ () => dispatch({ type: 'INCREMENT10MIN' }) }
          disabled={ !state.isSetTimer }
        >
          10M
        </Button>
        */}
        <Button
          color="primary"
          onClick={ () => dispatch({ type: 'INCREMENT1MIN' }) }
          disabled={ !state.isSetTimer }
        >
          M
        </Button>
        <Button
          color="primary"
          onClick={ () => dispatch({ type: 'INCREMENT10SEC' }) }
          disabled={ !state.isSetTimer }
        >
          S
        </Button>
        { state.inactive
          ?  <IconButton
               color="primary"
               onClick={ () => dispatch({ type: 'START' }) }
               disabled={
                 state.textContent === initialState.textContent
               }
             >
               <PlayArrowIcon />
             </IconButton>
          :  <IconButton
               color="primary"
               onClick={ () => dispatch({ type: 'PAUSE' }) }
             >
               <PauseIcon />
             </IconButton>
        }
      </CardActions>
    </Card>
  </div>
}
