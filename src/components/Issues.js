import React, { Component } from 'react'
import './Issues.css'
import Redmine from 'node-redmine'
import { Redirect } from 'react-router-dom';

class Issue extends Component {

	constructor() {
		super(...arguments);
	}

	render() {
		let issue = this.props.issue;
		return(
			<tr>
				<td>{issue.id}</td>
				<td>{issue.subject}</td>
				<td>{issue.status.name}</td>
			</tr>
		);
	};
}

class Issues extends Component {
	constructor(){
		super(...arguments);
		this.state = {
			issues: [],
			redirect: false
		};

		let hostname = window.localStorage.getItem('url'),
		config = {
			apiKey: window.localStorage.getItem('token'),
			format: 'json'
		};

		if(!hostname) {
			this.state.redirect = true
		}else{

			let redmine = new Redmine(hostname, config);

			redmine.issues({limit: 20}, (err, data) => {
		        if (err){
		          this.setState({redirect: true});
		        }else{
		          this.setState({issues: data.issues});
		        }
		    });
		}
	}


	render(){
		if (this.state.redirect) {
	       return <Redirect to='/login'/>;
	    }

	    let issuesList  = this.state.issues.map((issue) => {
			return <Issue issue={issue}  key={issue.id}/>
		});

		if(!issuesList.length){
			let loaderStyles = {
				"minHeight": "200px",
			    "boxShadow": "none",
			    "border": "0px"
			};
			issuesList = <tr><td colSpan="3"><div className="ui segment" style={loaderStyles}><div className="ui active loader"><p></p><p></p></div></div></td></tr>;
		}

		return (
			<div>
				<h1>Задачи</h1>
				<table className="ui pink table">
				<thead>
					<tr>
						<th>№</th>
						<th>Тема</th>
						<th>Статус</th>
					</tr>
				</thead>
				<tbody>
					{issuesList}
				</tbody>
				</table>
			</div>
		);
	}

}

export default Issues;
