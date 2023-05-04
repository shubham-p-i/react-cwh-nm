import React, { Component } from 'react'
import spinner from '../loading-thinking.gif';

export class Spinner extends Component {
  render() {
    return (
      <div className="text-center my-5">
            <img src={spinner} alt="Loading" style={{height:"125px" , width:"125px"}}></img>
      </div>
    )
  }
}

export default Spinner