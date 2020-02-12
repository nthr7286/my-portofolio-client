import React , { useReducer, useEffect }from 'react'

import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import { makeStyles } from '@material-ui/core/styles'

import { Slides, SlideNav, SlideNavItem } from './Functions'
import styles from './styles'
import { images } from './img'

const useStyles = makeStyles(styles)

export default props => {

  const classes = useStyles()

  const initialState = {
    currentIndex: 0,
    isPlaying: false,
  }

  const reducer = (state, action) => {
    switch(action.type) {
      case "NEXT":
      case "PROGRESS":
        return {
          ...state,
          currentIndex: (state.currentIndex + 1)%
            images.length
        }
      case "PREV":
        return {
          ...state,
          currentIndex: (state.currentIndex - 1 + images.length)%
            images.length
        }
      case "PLAY":
        return {
          ...state,
          isPlaying: true
        }
      case "PAUSE":
        return {
          ...state,
          isPlaying: false
        }
      case "GOTO":
        return {
          ...state,
          currentIndex: action.index
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(()=> {
    if (state.isPlaying) {
      let timeoutId = setTimeout(() => {
        dispatch({ type: "PROGRESS" })
      }, 3000)
      return () => clearTimeout(timeoutId)
    }
  }, [state.currentIndex, state.isPlaying])

  return <div className={classes.root}>
      <Card className={classes.card}>
        <Slides className={classes.slides}>
          {images.map((image, index) => (
            <CardMedia
              key={index}
              image={image}
              className={classes.cardMedia}
              style={{
                opacity: index === state.currentIndex ? 1 : 0,
              }}
            />
          ))}
          <SlideNav className={classes.slideNav}>
            {images.map((image, index) => (
              <SlideNavItem
                key={index}
                isCurrent = { index === state.currentIndex }
                onClick={() => dispatch({type: "GOTO", index})}
                className={classes.slideNavItem}
              />
            ))}
          </SlideNav>
        </Slides>
        <nav className={classes.controls}>
            <IconButton
              color="primary"
              onClick={() => dispatch({type: "PREV"})}
            >
              <SkipPreviousIcon />
            </IconButton>
            { !state.isPlaying
              ? <IconButton
                  color="primary"
                  onClick={() => dispatch({type: "PLAY"})}
                >
                  <PlayArrowIcon className={classes.playIcon} />
                </IconButton>
              : <IconButton
                  color="primary"
                  onClick={() => dispatch({type: "PAUSE"})}
                >
                  <PauseIcon className={classes.pauseIcon} />
                </IconButton>
            }
            <IconButton
              color="primary"
              onClick={() => dispatch({type: "NEXT"})}
            >
              <SkipNextIcon />
            </IconButton>
        </nav>
      </Card>
    </div>
}
