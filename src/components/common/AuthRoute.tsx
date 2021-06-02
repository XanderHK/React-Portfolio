import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router'
import GlobalState from '../../contexts/GlobalState'

type Props = {
    component: any,
    path: string
}

class AuthRoute extends Component<Props> {

    static contextType = GlobalState

    public render() {
        return <Route path={this.props.path} render={() => this.context.getToken() ? this.props.component : <Redirect to="/login" />}></Route>
    }
}

export default AuthRoute