import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './containers/Home'
import Login from './containers/Login'
import SignUp from './containers/SignUp'
import NewNote from './containers/NewNote'
import NotFound from './containers/NotFound'

export default (props) =>
  <Switch>
    <Route path="/" exact render={routeProps => <Home {...routeProps} {...props.childProps}/>} />
    <Route path="/login" exact render={routeProps => <Login {...routeProps} {...props.childProps} />} />
    <Route path="/signup" exact render={routeProps => <SignUp {...routeProps} {...props.childProps} />} />
    <Route path="/notes/new" exact render={routeProps => <NewNote {...routeProps} {...props.childProps} />} />
    <Route component={NotFound} />
  </Switch>
