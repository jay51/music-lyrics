import React, { Component } from "react";
import {Link} from "react-router-dom";
import Spiner from "../Spiner";

export default class  Lyrics extends Component {
    
    state = {
        lyrics: [],
        track: []
    }


    fetchData = url => fetch(url)
        .then(res => res.ok ? Promise.resolve(res) : Promise.reject(new Error(res.statusText)))
        .then(res => res.json())
        .catch(err => console.log("there's a problem",err))

    componentDidMount = () => {
        const{match} = this.props;
     
        Promise.all([
            this.fetchData(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${match.params.id}&apikey=${process.env.REACT_APP_KEY}`),
            this.fetchData(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${match.params.id}&apikey=${process.env.REACT_APP_KEY}`)
    
        ]).then(res => {
            this.setState(pervState => ({lyrics: res[0].message.body.lyrics, track: res[1].message.body.track }))
        })
    
    }
    
    render() {
        const {track, lyrics} = this.state;

        if(track === undefined || Object.keys(track).length === 0 ||
        lyrics === undefined || Object.keys(lyrics).length === 0 ) return <Spiner/>
        return (
            <React.Fragment >
                <Link to="/" className="btn btn-dark btn-sm mb-4">Go Back</Link>
                <div className="card mb-5">
                    <h5 className="card-header">
                        {track.track_name} by
                        <span className="text-secondary">
                        <a href={`https://www.google.com/search?q=${track.artist_name}`} target="_blank"> {track.artist_name}</a>
                        </span>
                    </h5>
                    <div className="card-body">
                        <p className="card-text">{lyrics.lyrics_body}</p>
                    </div>
                    <ul className="list-group mt-3">
                        <li className="list-group-item"><strong>Album ID:</strong> {track.album_id}</li>
                        <li className="list-group-item"><strong>Song Gener:</strong> {track.primary_genres.music_genre_list[0].music_genre.music_genre_name}</li>
                        <li className="list-group-item"><strong>Explicit Words:</strong> {track.explicit === 0 ? "No" : "Yes"}</li>
                        <li className="list-group-item"><strong>Reslease Date:</strong> {track.first_release_date}</li>
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}
