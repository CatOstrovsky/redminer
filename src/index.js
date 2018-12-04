import React from 'react';
import { render } from 'react-dom'
import { HashRouter , Route } from 'react-router-dom';

import './index.css';
import App from './App';
import Login from './components/Login.js';
import Issues from './components/Issues.js';
import Projects from './components/Projects.js';
import Users from './components/Users.js';
import Settings from './components/Settings.js';

render(
	<HashRouter>
		<App>
			<Route exact path='/' component={Issues} />
			<Route path='/login' component={Login} />
			<Route path='/projects' component={Projects} />
			<Route path='/users' component={Users} />
			<Route path='/settings' component={Settings} />
		</App>
	</HashRouter>,
  document.getElementById('root')
)
