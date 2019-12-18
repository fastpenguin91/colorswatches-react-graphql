import React from "react";
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

let colors_per_page = 5;

/*const FEED_QUERY = gql`query {
  colors {
    color_code
    id
  }
}`*/

/*const FEED_QUERY = gql`query {
  colors(
    first: 3
    skip: 2
  ) {
    id
    color_code
  }
}`*/



/*const FEED_QUERY = gql`query FeedQuery($first: Int, $skip: Int) {
    colors(first: $first, skip: $skip) {
      {
        id
        color_code
      }
    }
  }`
*/




function ColorList2() {
let match = useRouteMatch();
let skipNum = 5 * match.params.page;
console.log("skipNum: " + skipNum);
const FEED_QUERY = gql`query { colors( first: 5 skip: ${skipNum}) { id color_code } }`


    console.log("above match")
    console.log(typeof match.params.page)
    console.log("below match")
    return (
      <Query query={FEED_QUERY} variables={3, 2}>
         {({ loading, error, data }) => {
            if (loading) {
              return <div>Fetching</div>
            } 
            if (error) return <div>Error</div>



            const colorsToRender = data.colors

            return (
              //<div>{colorsToRender.map(color => <Color key={color.id} color={color} yes={"jeeeez"}  />)}</div>
              <div>{colorsToRender.map(color => <Link to={"/color/" + color.id}>
                  <div style={{display: 'inline-block'}}>
                    <div style={{ boxShadow: '2px 2px 2px 2px', background: color.color_code, display: 'inline-block',
                    margin: '10px', width: '150px', height: '150px', position: 'relative'}}>

                        <p style={{background: 'white', position: 'absolute',
                        bottom: '0', margin: '0', paddingBottom: '10px', textAlign: 'center', width: '100%'}}>{color.color_code}</p>
                    </div>
                  </div>
                  </Link> )}
                  
                
         <Link to={"/colors/" + (parseInt(match.params.page) - 1) }><span style={{margin:'10px'}}>previous</span></Link>
         <Link to={"/colors/" + (parseInt(match.params.page) + 1) }><span style={{margin:'10px'}}>next</span></Link>
                  
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
    )
}

export default ColorList2;