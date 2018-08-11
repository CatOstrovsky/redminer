import React, { Component } from 'react'
import Logo from '../logo.png'
import './Login.css'
import Redmine from 'node-redmine'
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props){
    super( props );
    this.state = {
      'url': "https://rm.rubium.ru/",
      'token': "189d5a971b7473cd2b13582bf4a5baa624d380eb",
      'loading': false,
      'redirect': false
    };

    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.onChangeToken = this.onChangeToken.bind(this);
  }

  onSubmitForm(event){
    if(!this.state.loading){
      this.setState({loading: true});

      let hostname = this.state.url,
      config = {
        apiKey: this.state.token,
        format: 'json'
      };
      window.redmine = new Redmine(hostname, config);

      window.redmine.issues({limit: 1}, (err, data) => {
        if (err){
          this.setState({loading: false});
          alert('Ошибка авторизации!');
        }else{
          window.localStorage.setItem('token', this.state.token);
          window.localStorage.setItem('url', this.state.url);
          this.setState({redirect:true});
        }
      });
    }
    event.preventDefault();
  }

  onChangeUrl(event) {
    this.setState({url: event.target.value});
  }

  onChangeToken(event) {
    this.setState({token: event.target.value});
  }


  render(){
    if (this.state.redirect) {
       return <Redirect to='/'/>;
    }

    let isloading = (this.state.loading) ? 'loading' : '';
    return (
      <div className="ui middle aligned center aligned grid auth-form-wrapper">
        <div className="column">
          <h2 className="ui teal image header">
            <img src={Logo} className="image"/>
            <div className="content">
              Log-in into you Redmine API account
            </div>
          </h2>

          <form className="ui form" onSubmit={this.onSubmitForm}>
            <div className="ui stacked segment">
              <div className="field">
                <div className="ui left icon input">
                  <i className="globe icon"></i>
                  <input type="text" value={this.state.url} name="url" placeholder="Redmine url" onChange={this.onChangeUrl}/>
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="user secret icon"></i>
                  <input type="text" value={this.state.token} name="token" placeholder="API Token" onChange={this.onChangeToken}/>
                </div>
              </div>
              <button type="submit" className={isloading + " ui fluid large teal submit button"}>Run</button>
            </div>
            <div className="ui error message"></div>
          </form>

          <div className="ui message">
            <a href="#">Login via login and password</a>
          </div>
        </div>
      </div>
    );
  } 

}

export default Login;