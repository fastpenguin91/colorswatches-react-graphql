import React, { Component } from 'react'


import { dedentBlockStringValue } from 'graphql/language/blockString'

class Color extends Component {
  render() {
    return (
      <a href={'http://localhost:3000/color/'+ this.props.color.id}>
      <div style={{display: 'inline-block'}}>
        <div style={{ boxShadow: '2px 2px 2px 2px', background: this.props.color.color_code, display: 'inline-block',
        margin: '10px', width: '150px', height: '150px', position: 'relative'}}>
          <p style={{background: 'white', position: 'absolute',
           bottom: '0', margin: '0', paddingBottom: '10px', textAlign: 'center', width: '100%'}}>{this.props.color.color_code}</p>
        </div>
      </div>
      </a>
    )
  }
}

export default Color
