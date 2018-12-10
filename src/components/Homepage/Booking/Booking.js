import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from "react-redux-firebase";
import { changeStatus } from '../../../actions/changeTableInfo';
import { compose } from "redux";


import './../Homepage.css';
import './Booking.css';



class Booking extends Component {
	state = {
		people: null,
		date: null,
		time: null,
		name: null,
		phone: null,
		dtatmilisecond: null,
		message: null,
		flag: true,
		className: null,
		DefoultTime:'--:-- --',
		Name:'name',
	}

	handleChange = (e) => {
		if (e.target.id === 'date') {
			var myDate = Number(new Date(e.target.value));
			this.setState({
				dtatmilisecond: myDate,
			})
		}

		this.setState({
			[e.target.id]: e.target.value,
		})
	}

	findTable = (e) => {
		console.log(e.parentNode,'currentTurget')
		switch (true) {
			case (this.state.people === null):
				this.setState({
					people: 'error'
				})
				break;
			case (this.state.date === null):
				this.setState({
					date: 'error'
				})
				break;
			case (this.state.time === null):
				this.setState({
					time: 'error'
				})
				break;
			case (this.state.name === null):
				this.setState({
					name: 'error'
				})
				break;
			case ((this.state.phone === null) || (this.state.phone === '')):
				this.setState({
					phone: 'error'
				})
				break;
			default:
				this.checkDate();
		}
	}

	checkDate = () => {

		
		if (this.state.date !== null) {

			if (this.state.dtatmilisecond - Number(new Date()) < 0) {
				this.setState({
					date: 'error'
				})
				return;
			}
		}
		if (+this.state.time[0] < 1) {
			this.setState({
				time: 'error'
			})
			return;
		}
		if (this.state.phone !== null) {
			this.checkNumber(this.state.phone);
		}
	}

	checkNumber = (inputtxt) => {
		var phoneno = /^\+?([0-9]{3})\)?[-. ]?([0-9]{2})[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;
		if (inputtxt.match(phoneno)) {
			this.props.tables &&
				this.chechTables(this.props.tables);
		}
		else {
			this.setState({
				phone: 'error'
			})
			return false;
		}
	}

	chechTables = (tables) => {
		let isReserved = false;
		let checkIsRezerv = true;
		let tableInformation = {
			name: this.state.name,
			phoneNumber: this.state.phone,
			people: this.state.people,
			date: this.state.date,
		}


		for (let i = 0; i <= tables.length; i++) {
			if (checkIsRezerv) {
				for (let key in tables[i]) {
					if (checkIsRezerv) {
						if (tables[i]['reservDate'].length === 0) {
							checkIsRezerv = false;
							this.props.changeStatus({ id: i + 1 + '', info: tableInformation, });
							isReserved = true;
							break;
						} else {
						
							let foundDate
							for (let reservDate of tables[i]['reservDate']) {
								if (reservDate === this.state.date) {
									foundDate = true;
									break;
								} else {
									foundDate = false;
									continue;
								}
							}
							if (!foundDate) {
								this.props.changeStatus({ id: i + 1 + '', info: tableInformation, });
								checkIsRezerv = false;
								isReserved = true;
								break;
							} else {
								isReserved = false;
							}
						}
					}
				}
			} else {
				break;
			}
		}
		if (isReserved) {
			this.setState({
				className: 'green',
				message: 'you have successfully reserved a table',
			});
		} else {
			this.setState({
				className: 'red',
				message: 'no free tables'
			});
		}
	}


	render() {

		return (
			<section className="booking">
				<div className="map">
					<div className="mapShape">
						<div>
							<div>
								<img src='https://firebasestorage.googleapis.com/v0/b/menu-app-d88b1.appspot.com/o/dishimages%2Fbeef-cheeseburger.jpg?alt=media&token=4934c523-ff08-4fa0-8497-5b68c42f3bd8' alt="address" />
							</div>
							<div>
								<p> <span>Address</span>Yerevan Abovyan 23/3 </p>
								<p> <span>Hours </span>Mon Thu 10:00 23:00, Fri Sun 10:00 24:00</p>
								<p> <span>Phone</span> +37495659865 </p>
							</div>
						</div>
					</div>
					<iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.4004225318185!2d44.51679891488675!3d40.17790137805471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abcf064510117%3A0x9544a284409a0a35!2sHanrapetutyan+pokhots%2C+Yerevan%2C+Armenia!5e0!3m2!1sen!2s!4v1542925931363" ></iframe>
				</div>
				<div className="bookTable">
					<div className="bookShape">
						<h2>book a table </h2>
						<form id={'resetValu'}>
							<div>
								<div>
									<p>
										<select id="people" defaultValue="people"
											className={this.state.people}
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
											value={new Date()}
											placeholder='Date'	

											className={this.state.date}
											onChange={this.handleChange}
										/>
									</p>
									<p>
										<input
											className={this.state.time}
											type="time"
											id='time'
											onChange={this.handleChange}
										/>
									</p>
								</div>
								<div>
									<p>
										<input
											id='name'
											type='text'
											placeholder='Name'
											className={this.state.name}
											onChange={this.handleChange}

										/>
									</p>
									<p>
										<input
											className={this.state.phone}
											id="phone"
											type="text"
											placeholder='+374  - -   - - -    - - - '
											onChange={this.handleChange}
										/>
									</p>
								</div>
							</div>
							<p id={'garniki2444'}>
								<button type="reset"
									onClick={(e)=>{this.findTable(e)}}>find a table</button>
							</p>
							<p className={this.state.className && this.state.className}> {
								this.state.flag && this.state.message
							} </p>
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
const mapDispatchToProps = dispatch => {
	return {
		changeStatus: table => dispatch(changeStatus(table)),
	};
};


export default compose(connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([
		{ collection: 'tables' }
	])
)(Booking);




