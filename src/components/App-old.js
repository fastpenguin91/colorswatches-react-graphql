import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import ColorList from './ColorList'
import CreateColor from './CreateColor'


class App extends Component {
  render() {
    return <div>
      <ColorList />
      <CreateColor />
    </div>
  }
}

export default App;
