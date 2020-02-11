import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Home from './Home'
import { Timer } from './Timer'


export default props => <Router>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/timer">Timer</Link></li>
      </ul>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/timer">
        <Timer />
      </Route>
    </Router>
