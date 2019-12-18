import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

function isColor(fruit){
  return "helloo";
}

const FEED_QUERY = gql`query {
  colors {
    color_code
    id
  }
}`

let correctColor;
  
function IndividualColor() {
  let match = useRouteMatch();
  //console.log("The match in IndividualColor is...");
  //console.log(match);
  return (
      <Query query={FEED_QUERY}>
         {({ loading, error, data }) => {
            if (loading) {
              return <div>Fetching</div>
            } 
            if (error) return <div>Error</div>

            const colorsToRender = data.colors
            console.log("finding the right color");
            correctColor = colorsToRender.find(function(elem, index, arr){
              return elem.id == match.params.id;
            });

            return (
              //<div>{colorsToRender.map(color => <Color key={color.id} color={color} yes={"jeeeez"}  />)}</div>
              <div>
      <div style={{display: 'inline-block'}}>
        <div style={{ boxShadow: '2px 2px 2px 2px', background: correctColor.color_code, display: 'inline-block',
        margin: '10px', width: '150px', height: '150px', position: 'relative'}}>
          <p style={{background: 'white', position: 'absolute',
           bottom: '0', margin: '0', paddingBottom: '10px', textAlign: 'center', width: '100%'}}>{correctColor.color_code}</p>
        </div>
      </div>
              </div>
              /*<Switch>
              <Route path={`${match.path}/:topicId`}>
                <Color />
              </Route>
              <Route path={match.path}>
                <h3>Please select a topic.</h3>
              </Route>
            </Switch>*/
            )
         }}

      </Query>

    //<div>"la la" {match.params.id}</div>
    )
}

export default IndividualColor;


