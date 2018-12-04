import React, { Component } from 'react'
import './Projects.css'
import Redmine from 'node-redmine'
import { Redirect } from 'react-router-dom';

class Project extends Component {

	constructor() {
		super(...arguments);
	}

	render() {
		let Project = this.props.project;
		return(
			<tr>
				<td>{Project.id}</td>
				<td>{Project.name}</td>
				<td>{Project.status}</td>
			</tr>
		);
	};
}

class Projects extends Component {
	constructor(){
		super(...arguments);
		this.state = {
			projects: [],
			redirect: false
		};

		let hostname = window.localStorage.getItem('url'),
		config = {
			apiKey: window.localStorage.getItem('token'),
			format: 'json'
		};
		let redmine = new Redmine(hostname, config);

		redmine.projects({limit: 20}, (err, data) => {
	        if (err){
	          this.setState({redirect: true});
	        }else{
	          this.setState({projects: data.projects});
	        }
	    });
	}


	render(){
		if (this.state.redirect) {
	       return <Redirect to='/login'/>;
	    }

	    let projectsList  = this.state.projects.map((project) => {
			return <Project project={project}  key={project.id}/>
		});

	    if(!projectsList.length){
			let loaderStyles = {
				"minHeight": "200px",
			    "boxShadow": "none",
			    "border": "0px"
			};
			projectsList = <tr><td colSpan="3"><div className="ui segment" style={loaderStyles}><div className="ui active loader"><p></p><p></p></div></div></td></tr>;
		}

		return (
			<div >
				<h1>Проекты</h1>
				<table className="ui pink table">
				<thead>
					<tr>
						<th>№</th>
						<th>Название</th>
						<th>Статус</th>
					</tr>
				</thead>
				<tbody>
					{projectsList}
				</tbody>
				</table>
			</div>
		);
	}

}

export default Projects;
