import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";


class Color2 extends Component {
  render() {
    const { theId } = useParams()
    return (
        <p>Hellooooo?</p>
    )
  }
}

export default Color2
