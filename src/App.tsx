import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import GlobalState from './contexts/GlobalState'
import AuthRoute from './components/common/AuthRoute'
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/Authentication/Login/Login'
import Logout from './components/Authentication/Logout/Logout'
import Register from './components/Authentication/Register/Register'
import NavBar from './components/UI/NavBar'
import ProjectCreate from './components/Dashboard/Projects/ProjectsCreate'
import ProjectIndex from './components/Dashboard/Projects/ProjectsIndex'



type Props = {}
type State = {
  getToken: any,
  setToken: any,
  destroyToken: any,
  destroy: boolean,
  redirect: boolean
}
class App extends Component<Props, State> {

  public constructor(props: Props) {
    super(props)
    this.state = {
      getToken: this.getToken,
      setToken: this.setToken,
      destroyToken: this.destroyToken,
      destroy: false,
      redirect: false
    }
  }

  public getToken(): string | undefined {
    const tokenString = sessionStorage.getItem('token')
    if (tokenString !== null) {
      const userToken = JSON.parse(tokenString);
      return userToken?.accessToken
    }
  }

  public setToken(userToken: string) {
    sessionStorage.setItem('token', JSON.stringify(userToken))
  }

  public destroyToken() {
    sessionStorage.removeItem('token')
  }

  public extendSession = (event: any) => {
    const token = this.getToken()
    if (token !== undefined) {
      const headers = {
        headers: {
          'Authorization': `Bearer [${token}]`
        }
      }

      const data = {
        token: token
      }

      axios.post(process.env.REACT_APP_API_URL + 'auth/token', data, headers)
        .then(res => {
          if (res.status === 200) this.setToken(res.data)
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  }

  public destroySession = () => {
    const token = this.getToken()

    const headers = {
      headers: {
        'Authorization': `Bearer [${token}]`
      }
    }

    const data = {
      token: token
    }

    axios.post(process.env.REACT_APP_API_URL + 'auth/token-expired', data, headers)
      .then(res => {
        if (res.data) {
          this.destroyToken()
        } else {
          this.setState({
            destroy: false
          })
        }
      }).catch(err => console.log(err))
  }

  private showNav() {
    if (this.getToken()) {
      return <NavBar />
    }
    return <div />
  }

  private redirectLogin = () => {
    if (this.getToken() === undefined) {
      return <Redirect to="/login" />
    }
  }

  public render() {
    setInterval(() => {
      if (!this.state.destroy) {
        this.destroySession()
      }
    }, 10000)

    // if (!this.state.destroy) {
    //   this.redirectLogin()
    // }

    return (
      <div className="wrapper" onClick={this.extendSession}>
        <GlobalState.Provider value={this.state}>
          <Container fluid>
            {this.showNav()}
            <BrowserRouter>
              <Switch>
                <Route path="/login" render={() => this.getToken() ? <Redirect to="/dashboard" /> : <Login />} />
                <Route path="/register" render={() => this.getToken() ? <Redirect to="/dashboard" /> : <Register />} />
                <AuthRoute path="/logout" component={<Logout />} />
                <AuthRoute path="/dashboard/projects/create" component={<ProjectCreate />} />
                <AuthRoute path="/dashboard/projects" component={<ProjectIndex />} />
                <AuthRoute path="/dashboard" component={<Dashboard />} />
              </Switch>
            </BrowserRouter>
          </Container>
        </GlobalState.Provider>
      </div>
    );
  }
}

export default App;