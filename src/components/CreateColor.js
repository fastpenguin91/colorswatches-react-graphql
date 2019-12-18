import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
//import { FEED_QUERY } from './LinkList'
//import { LINKS_PER_PAGE } from '../constants'


const POST_MUTATION = gql`
mutation PostMutation($color_code: String!) {
  post(color_code: $color_code) {
    id
    createdAt
    description
  }
}
`



function getRandomColor() {

    let potentialVals = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    let arr2 = ['#'];
    arr2.push(potentialVals[Math.floor(Math.random() * potentialVals.length)]);
    arr2.push(potentialVals[Math.floor(Math.random() * potentialVals.length)]);
    arr2.push(potentialVals[Math.floor(Math.random() * potentialVals.length)]);
    arr2.push(potentialVals[Math.floor(Math.random() * potentialVals.length)]);
    arr2.push(potentialVals[Math.floor(Math.random() * potentialVals.length)]);
    arr2.push(potentialVals[Math.floor(Math.random() * potentialVals.length)]);
    console.log(arr2.join(''));

}

class CreateColor extends Component {
    state = {
      color_code: '',
    }
  
    render() {
      const { color_code } = this.state
      return (
        <div>
          <div className="flex flex-column mt3">
            <input
              className="mb2"
              value={color_code}
              onChange={e => this.setState({ color_code: e.target.value })}
              type="text"
              placeholder="color_code"
            />
          </div>
          <Mutation
            mutation={POST_MUTATION}
            variables={{ color_code }}
            onCompleted={() => this.props.history.push('/new/1')}
            update={(store, { data: { post } }) => {
              const first = 1//LINKS_PER_PAGE
              const skip = 0
              const orderBy = 'createdAt_DESC'
              const data = store.readQuery({
                query: '', //FEED_QUERY,
                variables: { first, skip, orderBy },
              })
              data.feed.links.unshift(post)
              store.writeQuery({
                query: '', //FEED_QUERY,
                data,
                variables: { first, skip, orderBy },
              })
            }}
          >
            {postMutation => <button onClick={postMutation}>Submit</button>}
          </Mutation>
        </div>
      )
    }
  }
  
  export default CreateColor