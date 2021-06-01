import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import AuthRoute from './components/common/AuthRoute'
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Authentication/Login/Login'
import Logout from './components/Authentication/Logout/Logout'
import Register from './components/Authentication/Register/Register'
import NavBar from './components/UI/NavBar'

class App extends Component {

  public getToken() {
    const tokenString = sessionStorage.getItem('token');
    if (tokenString !== null) {
      const userToken = JSON.parse(tokenString);
      return userToken?.accessToken
    }
  }

  public setToken(userToken: string) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
  }

  private showNav() {
    if (this.getToken()) {
      return <NavBar />
    }
    return <div />
  }

  public render() {
    return (
      <div className="wrapper">
        <Container fluid>
          {this.showNav()}
          <BrowserRouter>
            <Switch>
              <Route path="/login" render={() => this.getToken() ? <Redirect to="/dashboard" /> : <Login setToken={this.setToken} />} />
              <Route path="/register" render={() => this.getToken() ? <Redirect to="/dashboard" /> : <Register />} />
              <AuthRoute path="/logout" token={this.getToken()} component={<Logout />} />
              <AuthRoute path="/dashboard" token={this.getToken()} component={<Dashboard getToken={this.getToken} />} />
            </Switch>
          </BrowserRouter>
        </Container>
      </div >
    );
  }
}

export default App;