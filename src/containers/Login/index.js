import React, { Component } from 'react';
import './stylelogin.css'

class Login extends Component {


  render(){
    return (
      <form className="form-horizontal centered" role="form">
        <div className="form-group">
          <label  className="col-sm-3 control-label"></label>
          <div className="col-sm-12">
            <input type="email" className="form-control mystyleinput" id="inputEmail" placeholder="Email"name="email"/>
          </div>
        </div>
        <div className="form-group">
          <label  className="col-sm-3 control-label"></label>
          <div className="col-sm-12">
            <input type="password" className="form-control mystyleinput" id="inputPassword" placeholder="Password"  name="password"/>
          </div>
        </div>
        <div className="form-group">
          <div>
            <button type="submit" className="col-sm-4 col-sm-offset-1 btn btn-success"> Sign in </button>
            <button type="button" className="col-sm-4 col-sm-offset-2 btn btn-primary"> Sign up </button>
          </div>
        </div>
      </form>
    );
  }
}

export default Login
