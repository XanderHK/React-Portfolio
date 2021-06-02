import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import GlobalState from '../../../contexts/GlobalState'

class Logout extends Component {

    static contextType = GlobalState

    public render() {
        return <Button onClick={this.context.destroyToken}> Logout</Button>
    }

}


export default Logout