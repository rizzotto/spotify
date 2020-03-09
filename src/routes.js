import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import SearchArtist from './pages/SearchArtist'
import HomePage from './pages/HomePage'
import ArtistDetail from './pages/ArtistDetail'

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={HomePage}/>
      <Route path={"/search"} exact component={(props) => <SearchArtist {...props} />} />
      <Route path={"/search/:id"} component={(props) => <ArtistDetail {...props}/>} />
    </Switch>
  </Router>
)

export default Routes