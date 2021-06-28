import React, { Component } from 'react'
import './styles/Styles.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import GlobalState from './contexts/GlobalState'
import AuthRoute from './components/common/AuthRoute'
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/Authentication/Login/Login'
import Register from './components/Authentication/Register/Register'
import ProjectsCreate from './components/Dashboard/Projects/ProjectsCreate'
import ProjectsIndex from './components/Dashboard/Projects/ProjectsIndex'
import Home from './components/Front/Home/Home'
import About from './components/Front/About/About'
import UsersIndex from './components/Dashboard/Users/UsersIndex'
import FrontProjectIndex from './components/Front/Projects/ProjectsIndex'
import { TokenGet, TokenSet, TokenDestroy, IsOnAdminPanel, SetError } from './types/types';



type Props = {

}

type State = {
  getToken: TokenGet,
  setToken: TokenSet,
  destroyToken: TokenDestroy,
  isOnAdminPanel: IsOnAdminPanel,
  setError: SetError,
  removeError: any,
  destroy: boolean,
  redirect: boolean,
  rerender: boolean,
  errors: string[]
}
class App extends Component<Props, State> {

  private wrapper: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>()

  /**
   * 
   * @param props 
   */
  public constructor(props: Props) {
    super(props)

    this.state = {
      getToken: this.getToken,
      setToken: this.setToken,
      destroyToken: this.destroyToken,
      isOnAdminPanel: this.isOnAdminPanel,
      setError: this.setError,
      removeError: this.removeError,
      destroy: false,
      redirect: false,
      rerender: false,
      errors: []
    }
  }

  /**
   * Adds a event listener to a refs object that will extend the session of the user
   */
  public componentDidMount = () => {
    // Third param allows the event to propogate to all the child elements
    this.wrapper.current!.addEventListener('mouseup', (event) => this.extendSession(event), true)
    this.wrapper.current!.addEventListener('keypress', (event) => this.extendSession(event), true)

    setInterval(() => {
      if (!this.state.destroy) {
        this.destroySession()
      }
    }, 10000)
  }

  /**
   * Changes state to force render
   * @param bool 
   */
  public rerender = (bool: boolean) => {
    this.setState({
      rerender: bool
    })
  }

  /**
   * Returns the JWT token
   * @returns 
   */
  public getToken(): string | undefined {
    const tokenString = sessionStorage.getItem('token')
    if (tokenString !== null) {
      const userToken = JSON.parse(tokenString);
      return userToken?.accessToken
    }
  }

  /**
   * Sets the JWT token
   * @param userToken 
   */
  public setToken = (userToken: string) => {
    sessionStorage.setItem('token', JSON.stringify(userToken))
    this.rerender(true)
  }

  /**
   * Destroys the JWT token
   */
  public destroyToken = () => {
    sessionStorage.removeItem('token')
    this.rerender(true)
  }


  /**
   * Extends the session by returning a new JWT token
   */
  public extendSession = (event: MouseEvent | KeyboardEvent): void => {
    console.log((event.target as HTMLDivElement).parentElement)
    if ((event.target as HTMLDivElement).id === "logout") return
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

  /**
   * Will destory the session if the JWT token has expired and hasn't been refreshed
   */
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
        if (this.getToken()) {
          if (res.data) {
            this.destroyToken()
          }
        }
      }).catch(err => console.log(err))
  }

  /**
   * 
   * @returns 
   */
  public isOnAdminPanel(): boolean {
    const url = window.location.href
    if (url.includes('dashboard')) return true
    return false
  }

  /**
   * 
   * @param message 
   */
  public setError = (message: string): void => {
    this.setState({
      errors: [...this.state.errors, message]
    })
  }

  /**
   * 
   * @param message 
   */
  public removeError = (message: string): void => {
    const errors = this.state.errors;
    errors.splice(errors.indexOf(message), 1);
    this.setState({
      errors: errors
    })
  }


  public render() {
    // need to find a alternative since the setinterval doesnt trigger when it needs to but everytime the page rerenders
    return (
      <div className="wrapper" ref={this.wrapper}>
        <GlobalState.Provider value={this.state}>
          <div className="min-vh-100">
            <Container fluid>
              <BrowserRouter>
                <Switch>
                  <Route exact path="/about">
                    <About />
                  </Route>
                  <Route exact path="/projects">
                    <FrontProjectIndex />
                  </Route>
                  <Route exact path="/login" render={() => this.getToken() ? <Redirect to="/dashboard" /> : <Login />} />
                  <Route exact path="/register" render={() => this.getToken() ? <Redirect to="/dashboard" /> : <Register />} />
                  <AuthRoute path="/dashboard/users" component={<Dashboard component={<UsersIndex />} />} />
                  <AuthRoute path="/dashboard/projects/create" component={<Dashboard component={<ProjectsCreate />} />} />
                  <AuthRoute path="/dashboard/projects" component={<Dashboard component={<ProjectsIndex />} />} />
                  <AuthRoute path="/dashboard" component={<Dashboard component={null} />} />
                  <Route exact path="/">
                    <Home />
                  </Route>
                </Switch>
              </BrowserRouter>
            </Container>
          </div>
        </GlobalState.Provider>
      </div>
    );
  }
}

export default App;