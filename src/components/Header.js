import React, { Component } from 'react'
import logo from '../logo.png'
import { NavLink } from 'react-router-dom'
import Timer from './Timer';

class Header extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      showTimer: false
    }
    this.onClickToTimer = this.onClickToTimer.bind(this);
  }

  onClickToTimer(event) {
    event.preventDefault();
    this.setState({showTimer: !this.state.showTimer});
  }

  render(){
    var timer = "";
    if(this.state.showTimer)
      timer = <Timer/>;

    return (
      <header className="App-header">
        <div className="nav-menu">
          <img src={logo} className="header-logo"/>
          <ul>
            <li>
              <NavLink activeClassName="active" to="/">
                <i className="tasks icon"></i>
              </NavLink>
            </li>

            <li>
              <NavLink activeClassName="active" to="/projects">
                <i className="warehouse icon"></i>
              </NavLink>
            </li>

            <li>
              <a onClick={this.onClickToTimer}>
                <i className="stopwatch icon"></i>
              </a>
            </li>

            <li>
              <NavLink activeClassName="active" to="/wiki">
                <i className="database icon"></i>
              </NavLink>
            </li>

             <li>
              <NavLink activeClassName="active" to="/users">
                <i className="users icon"></i>
              </NavLink>
            </li>            

            <li>
              <NavLink activeClassName="active" to="/settings">
                <i className="settings icon"></i>
              </NavLink>
            </li>   
          </ul>
        </div>
        {timer}
      </header>
    );
  } 

}

export default Header;