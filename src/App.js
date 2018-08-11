import React, { Component, Redirect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import Header from './components/Header.js'

class App extends Component {
	constructor() {
		super(...arguments);
	}

	render() {
		return (
			<div className="App">
				<Header/>
				<div id="content">
				{this.props.children}
				</div>
			</div>
		);
	}
}

export default App;
