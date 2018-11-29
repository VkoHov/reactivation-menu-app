import React, { Component } from 'react';
import {connect} from 'react-redux';
import './../Homepage.css';
import './Booking.css';

class Booking extends Component {
	state = {
		people: null,
		date: null,
		time: null,
		name: null,
		phone: null,
	}

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		})
	}

	findTable = () => {
		switch (true) {
			case (this.state.people === null):
				console.log('mutqagreq mardkanc qanaky');
				break;
			case (this.state.date === null):
				console.log('mutqagreq amsativy');
				break;
			case (this.state.time === null):
				console.log('mutqagreq galu jamanaky');
				break;
			case (this.state.name === null):
				console.log('mutqagreq dzer anuny');
				break;
			case (this.state.phone === null):
				console.log('mutqagreq heraxosahamy');
				break;
			default:
				this.sendDate();
		}
	}

	sendDate = () => {
		if (+this.state.time[0] < 1) {
			console.log('mutqagreq galu jamanaky');
			return;
		}

		if (this.state.phone !== null) {
			this.checkNumber(this.state.phone);
		}

	}

	checkNumber = (inputtxt) => {
		console.log(inputtxt);
		var phoneno = /^\+?([0-9]{3})\)?[-. ]?([0-9]{2})[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;
		if (inputtxt.match(phoneno)) {
			console.log('ashxatumaaaa', inputtxt);
			return true;
		}
		else {
			console.log('message');
			return false;
		}
	}


	render() {
		return (
			<section className="booking">
				<div className="map">
					<div className="mapShape">
						<div>
							<div>
							</div>
							<div>
								<p> <span>Address</span>Yerevan Abovyan 23/3 </p>
								<p> <span>Hours </span>Mon Thu 09:00 23:00, Fri Sun 09:00 24:00</p>
								<p> <span>Phone</span> +37495659865 </p>
							</div>
						</div>
					</div>
					<iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.4004225318185!2d44.51679891488675!3d40.17790137805471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abcf064510117%3A0x9544a284409a0a35!2sHanrapetutyan+pokhots%2C+Yerevan%2C+Armenia!5e0!3m2!1sen!2s!4v1542925931363" ></iframe>
				</div>
				<div className="bookTable">
					<div className="bookShape">
						<h2>book a table </h2>
						<form>
							<div>
								<div>
									<p>
										<select id="people" defaultValue="people"
											onChange={this.handleChange}>
											<option value='people'
												disabled
												style={{ display: 'none' }}
											>
												People
	            					</option>
											<option value='2'>2</option>
											<option value='3'>3</option>
											<option value='4'>4</option>
											<option value='5'>5</option>
											<option value='6'>6</option>
										</select>
									</p>
									<p>
										<input
											id="date"
											type="date"
											placeholder='Date'
											onChange={this.handleChange}
										/>
									</p>
									<p>
										<input
											type="time"
											id='time'
											onChange={this.handleChange}
										/>
									</p>
								</div>
								<div>
									<p>
										<input
											id="name"
											type="text"
											placeholder='Name'
											onChange={this.handleChange}
										/>
									</p>
									<p>
										<input
											id="phone"
											type="text"
											placeholder='Phone'
											onChange={this.handleChange}
										/>
									</p>
								</div>
							</div>
							<p>
								<button type="button" onClick={this.findTable}>find a table</button>
							</p>
						</form>
					</div>
				</div>
			</section>
		)
	}
}

const mapStateToProps = (state) => {

    return {
        tables: state.firestore.ordered.tables,
    }

}



export default connect(mapStateToProps)( Booking);




