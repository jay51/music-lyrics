import React, { Component } from "react";
import { Consumer } from "../context";

export default class Search extends Component {
	state = {
		trackTitle: ""
	};

	onChange = e => this.setState({ [e.target.name]: e.target.value });

	findTrack = (dispatch, e) => {
		e.preventDefault();

		fetch(
			`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track${
				this.state.trackTitle
			}&page_size=10&page=1&s_track_rating=desc&apikey=${
				process.env.REACT_APP_KEY
			}`
		)
			.then(res => res.json())
			.then(
				data =>
					this.setState({ trackTitle: "" }) ||
					dispatch({ type: "Search", payload: data.message.body.track_list })
			);
	};

	render() {
		return (
			<Consumer>
				{state => (
					<div className="card card-body mb-4 m-0 p-4">
						<h1 className="display-5 text-center">
							<i className="fas fa-music" /> Search For Your Favorite Music
						</h1>
						<p className="lead text-center">Get the Lyrics for any song</p>
						<form onSubmit={e => this.findTrack(state.dispatch, e)}>
							<div className="form-group">
								<input
									type="text"
									className="form-control form-control-lg"
									placeholder="Song title..."
									name="trackTitle"
									onChange={this.onChange}
									value={this.state.trackTitle}
								/>
								<button className="btn btn-dark btn-block mt-3" type="submit">
									Search
								</button>
							</div>
						</form>
					</div>
				)}
			</Consumer>
		);
	}
}
