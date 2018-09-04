import React, { Component } from "react";

const Context = React.createContext();

export class Provider extends Component {
    state = {
        trackList: [],
        heading:"Top 10 Search"
    }

    componentDidMount = () => {
      fetch(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_KEY}`)
      .then(res => res.json())
      .then( data =>{
        console.log(data);
        this.setState(prevState => ({trackList: data.message.body.track_list}))
      })
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