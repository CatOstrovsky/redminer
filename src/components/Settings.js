import React, { Component } from 'react'

class Settings extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      url: window.localStorage.getItem('url'),
      token: window.localStorage.getItem('token')
    }
  }

  render(){
    return (
      <div>
        <h1>Настройки программы</h1>
        <form className="ui form">
          <div className="field">
            <label>Url к Redmine API</label>
            <input type="text" name="url" placeholder="Url to Redmine" value={this.state.url}/>
          </div>
          <div className="field">
            <label>API Token</label>
            <input type="text" name="token" placeholder="API Token" value={this.state.token}/>
          </div>
          <button className="ui primary button" type="submit">Обновить</button>
        </form>
      </div>
    );
  }

}

export default Settings;
