import React, { Component } from 'react'
import {Consumer} from "../../context";
import Spiner from "../Spiner";
import Track from "./Track";
export default class Tracks extends Component {
  
    render() {
    return (
      <Consumer>
        {state => {
          const {trackList, heading} = state;
          
          return trackList === undefined || trackList.length === 0 ?
           
           <Spiner/> 
           :
           <React.Fragment>
            <h3 className="text-center mb-4">{heading}</h3>
            <div className="row">
              {trackList.map(item => <Track key={item.track.track_id} track={item.track}/> )}   
            </div> 
          </React.Fragment>
        }}
      </Consumer>
    )
  }
}
