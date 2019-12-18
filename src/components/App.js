import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Color from './Color'
import ColorList2 from './ColorList2'
import IndividualColor from './IndividualColor'

import logo from '../logo.svg';
import '../styles/App.css';
import ColorList from './ColorList'
import CreateColor from './CreateColor'

const Color2 = () => {
  const { theId } = useParams()
  //console.log(theId);
  return <h1>Color: {theId}</h1>
}


class App extends Component {
  render() {
    return (
      <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to='/colors/0' />}/>
        <Route path="/color/:id">
          <IndividualColor />
        </Route>
        <Route exact path='/colors/:page'>
          <ColorList2 />
          <ColorList />
        </Route>
      </Switch>
      </Router>
    )
  }
}

export default App;
