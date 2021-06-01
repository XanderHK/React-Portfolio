import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router'

type Props = {
    token: string,
    component: any,
    path: string
}

class AuthRoute extends Component<Props> {
    public render() {
        return <Route path={this.props.path} render={() => this.props.token ? this.props.component : <Redirect to="/login" />}></Route>
    }
}

export default AuthRoute