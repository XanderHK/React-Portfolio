import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import GlobalState from '../../../contexts/GlobalState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

class Logout extends Component {

    static contextType = GlobalState

    public render() {
        return <Button id="logout" variant="dark" onClick={(event) => { event.preventDefault(); this.context.destroyToken() }} type="button"><FontAwesomeIcon icon={faSignOutAlt} /></Button>
    }

}


export default Logout