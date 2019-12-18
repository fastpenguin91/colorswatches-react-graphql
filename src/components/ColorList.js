import React, { Component } from 'react'
import Color from './Color'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";



const FEED_QUERY = gql`query {
  colors {
    color_code
    id
  }
}`


class ColorList extends Component {
  render() {
    //let match = useRouteMatch();

    return (
      <Query query={FEED_QUERY}>
         {({ loading, error, data }) => {
            if (loading) {
              return <div>Fetching</div>
            } 
            if (error) return <div>Error</div>

            const colorsToRender = data.colors

            return (
              <div>{colorsToRender.map(color => <Color key={color.id} color={color} />)}</div>
              //<Switch>
              //<Route path={`${match.path}/:topicId`}>
              //  <Color />
              //</Route>
              //<Route path={match.path}>
              //  <h3>Please select a topic.</h3>
              //</Route>
            //</Switch>
            )
         }}

      </Query>
    )
  }
}

export default ColorList
