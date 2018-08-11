import React, { Component } from 'react'
import Redmine from 'node-redmine'
import { Redirect } from 'react-router-dom';

class User extends Component {
	
	constructor() {
		super(...arguments);
	}

	render() {
		let user = this.props.user;
		return( 
			<tr>
				<td>{user.id}</td>
				<td>{user.subject}</td>
				<td>{user.status.name}</td>
			</tr>
		);
	};
}

class Users extends Component {
	constructor(){
		super(...arguments);
		this.state = {
			users: [],
			error: false
		};

		let hostname = window.localStorage.getItem('url'),
		config = {
			apiKey: window.localStorage.getItem('token'),
			format: 'json'
		};
		let redmine = new Redmine(hostname, config);

		redmine.users({limit: 20}, (err, data) => {
	        if (err){
	          this.setState({error: true});
	        }else{
	          this.setState({users: data.users});
	        }
	    });
	}


	render(){
		if (this.state.redirect) {
	       return <Redirect to='/login'/>;
	    }	

	    let usersList  = this.state.users.map((user) => {
			return <User user={user}  key={user.id}/>
		}),
		usersListing = <div>
				
				<table className="ui pink table">
				<thead>
					<tr>
						<th>Id</th>
						<th>Subject</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{usersList}
				</tbody>
				</table>
			</div>;

		if(this.state.error){
			usersListing = <div class="ui negative message">
			  <div class="header">
			    К сожалению у Вас нет доступа к этому разделу
			  </div>
			  <p>Свяжитесь с администратором для уточнения подробностей</p>
			  </div>;
		}

		return (
			<div>
			<h1>Users</h1>
			{usersListing}
			</div>
		);
	} 

}

export default Users;