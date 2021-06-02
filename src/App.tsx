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
import Logout from './components/Authentication/Logout/Logout'
import Register from './components/Authentication/Register/Register'
import NavBar from './components/UI/NavBar'
import ProjectCreate from './components/Dashboard/Projects/ProjectsCreate'
import ProjectIndex from './components/Dashboard/Projects/ProjectsIndex'
import Home from './components/Front/Home/Home'
import About from './components/Front/About/About'



type Props = {}
type State = {
  getToken: any,
  setToken: any,
  destroyToken: any,
  destroy: boolean,
  redirect: boolean,
  rerender: boolean
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
      destroy: false,
      redirect: false,
      rerender: false,
    }
  }

  /**
   * Adds a event listener to a refs object that will extend the session of the user
   */
  public componentDidMount = () => {
    this.wrapper.current!.addEventListener('mouseup', this.extendSession, true)
    this.wrapper.current!.addEventListener('keypress', this.extendSession, true)
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
    this.setState({
      rerender: true
    })
  }

  /**
   * Destroys the JWT token
   */
  public destroyToken() {
    sessionStorage.removeItem('token')
  }

  /**
   * Extends the session by returning a new JWT token
   */
  public extendSession = (event: any) => {
    if (event.target.id === "logout") return
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
        if (res.data) {
          this.destroyToken()
        } else {
          this.setState({
            destroy: false
          })
        }
      }).catch(err => console.log(err))
  }


  public render() {
    setInterval(() => {
      if (!this.state.destroy) {
        this.destroySession()
      }
    }, 10000)

    return (
      <div className="wrapper" ref={this.wrapper}>
        <GlobalState.Provider value={this.state}>
          <Container fluid className="min-vh-100">
            <NavBar />
            <BrowserRouter>
              <Switch>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/login" render={() => this.getToken() ? <Redirect to="/dashboard" /> : <Login />} />
                <Route path="/register" render={() => this.getToken() ? <Redirect to="/dashboard" /> : <Register />} />
                <AuthRoute path="/logout" component={<Logout />} />
                <AuthRoute path="/dashboard/projects/create" component={<Dashboard component={<ProjectCreate />} />} />
                <AuthRoute path="/dashboard/projects" component={<Dashboard component={<ProjectIndex />} />} />
                <AuthRoute path="/dashboard" component={<Dashboard component={null} />} />
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </BrowserRouter>
          </Container>
        </GlobalState.Provider>
      </div>
    );
  }
}

export default App;