import React, { Component } from 'react'
import './Wiki.css'
import Redmine from 'node-redmine'
import { Redirect } from 'react-router-dom';

class Issue extends Component {
	
	constructor() {
		super(...arguments);
	}

	render() {
		let wiki = this.props.wiki;
		return( 
			<tr>
				<td>{wiki.title}</td>
				<td>{wiki.version}</td>
			</tr>
		);
	};
}

class Wiki extends Component {
	constructor(){
		super(...arguments);
		this.state = {
			wiki: [],
			redirect: false
		};

		let hostname = window.localStorage.getItem('url'),
		config = {
			apiKey: window.localStorage.getItem('token'),
			format: 'json'
		};
		let redmine = new Redmine(hostname, config);

		redmine.wiki_by_project_id('ps0', (err, data) => {
	        if (err){
	          this.setState({redirect: true});
	        }else{
	          this.setState({wiki: data.wiki_pages});
	        }
	    });
	}


	render(){
		if (this.state.redirect) {
	       return <Redirect to='/login'/>;
	    }	

	    let wikiList  = this.state.wiki.map((wiki) => {
			return <Issue wiki={wiki}  key={wiki.title}/>
		});

		if(!wikiList.length){
			let loaderStyles = {
				"minHeight": "200px",
			    "boxShadow": "none",
			    "border": "0px"
			};
			wikiList = <tr><td colspan="2"><div className="ui segment" style={loaderStyles}><div className="ui active loader"><p></p><p></p></div></div></td></tr>;
		}

		return (
			<div>
				<h1>Wiki</h1>
				<table className="ui pink table">
				<thead>
					<tr>
						<th>Title</th>
						<th>Version</th>
					</tr>
				</thead>
				<tbody>
					{wikiList}
				</tbody>
				</table>
			</div>
		);
	} 

}

export default Wiki;