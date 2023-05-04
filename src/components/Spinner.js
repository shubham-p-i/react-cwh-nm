import React, { Component } from 'react'
import spinner from '../loading-thinking.gif';
import spinnerNew from '../loading-loader.gif';

export class Spinner extends Component {
  render() {
    return (
      <div className="text-center my-5">
            <img src={spinnerNew} alt="Loading" style={{height:"125px" , width:"125px"}}></img>
      </div>
    )
  }
}

export default Spinner