import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Home from './Home'
import { Timer } from './Timer'
import { Carousel } from './Carousel'


export default props => <Router>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/timer">Timer</Link></li>
        <li><Link to="/carousel">Carousel</Link></li>
      </ul>
      <Route path="/home">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={6}
            style={{display: "flex", alignItems: "center", justifyContent: "center"}}
          >
              <Timer />
          </Grid>
          <Grid item xs={12} sm={6}
            style={{display: "flex", alignItems: "center", justifyContent: "center"}}
          >
              <Carousel />
          </Grid>
        </Grid>
      </Route>
      <Route path="/timer">
        <Timer />
      </Route>
      <Route path="/carousel">
        <Carousel />
      </Route>
</Router>
