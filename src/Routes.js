import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './containers/Home'
import NotFound from './containers/NotFound'

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route component={NotFound} />
  </Switch>
