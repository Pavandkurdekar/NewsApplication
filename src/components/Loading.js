import React, { Component } from 'react'
import Spinner from './Spinner.gif'

export default class Loading extends Component {
  render() {
    return (
      <div>
       <div className='text-center'>
        <img className="my-3" src={Spinner} alt='Loading'/>
       </div>
      </div>
    )
  }
}
