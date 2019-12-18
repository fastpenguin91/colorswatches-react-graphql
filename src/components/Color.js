import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    useRouteMatch,
  } from "react-router-dom";
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const COLOR_QUERY = gql`query {
  colors {
    color_code
    id
  }
}`

let correctColor;
  
function Color() {
  let match = useRouteMatch();

  return (
      <Query query={COLOR_QUERY}>
         {({ loading, error, data }) => {
            if (loading) {
              return <div>Fetching</div>
            } 
            if (error) return <div>Error</div>

            const colorsToRender = data.colors

            correctColor = colorsToRender.find(function(elem, index, arr){
              return elem.id == match.params.id;
            });

            return (
              <div>
      <div style={{display: 'inline-block'}}>
        <div style={{ boxShadow: '2px 2px 2px 2px', background: correctColor.color_code, display: 'inline-block',
        margin: '10px', width: '150px', height: '150px', position: 'relative'}}>
          <p style={{background: 'white', position: 'absolute',
           bottom: '0', margin: '0', paddingBottom: '10px', textAlign: 'center', width: '100%'}}>{correctColor.color_code}</p>
        </div>
      </div>
              </div>
            )
         }}

      </Query>
    )
}

export default Color;


