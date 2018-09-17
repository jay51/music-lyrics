import React, { Component } from "react";

const Context = React.createContext();

const reducer = (state, action) =>{
  switch(action.type){
    case "Search":
      return {...state, trackList: action.payload, heading: "Search Results" }
    default: return state
  }
}

export class Provider extends Component {
    state = {
        trackList: [],
        heading:"Top 10 Search",
        dispatch: action => this.setState(prevState => reducer(prevState, action))
    }

    componentDidMount = () => {
      fetch(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_KEY}`)
      .then(res => res.json())
      .then( data => this.setState(prevState => ({trackList: data.message.body.track_list})) )
    }
    

    render() {
    return (
      <Context.Provider value={this.state} >
          {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer;