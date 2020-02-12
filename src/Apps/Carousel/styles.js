export default theme => ({
  root: {
    padding: theme.spacing(1),
  },
  card: {
    minWidth: 300,
    maxWidth: 400,
  },
  cardMedia: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(1)  
  },
  playIcon: {
    width: 40,
    height: 40,
  },
  pauseIcon: {
    width: 40,
    height: 40,
  },
  slides: {
    position: 'relative',
    minWidth: 300,
    maxWidth: 400,
    height: 140,
  },
  slideNav: {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(1)
  },
  slideNavItem : {
    all: 'unset',
    cursor: 'pointer',
    borderRadius: '50%',
    height: '2rem',
    width: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(1),
    backgroundColor: 'transparent',
    '& span': {
      display: 'inline-block',
      height: '1rem',
      width:'1rem',
      borderRadius: '50%',
    }
  }
})
