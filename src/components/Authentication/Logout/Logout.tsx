import React, { Component } from 'react'

class Logout extends Component {

    private destroy() {
        sessionStorage.removeItem('token')
    }

    public render() {
        return <button onClick={this.destroy}> Logout</ button>
    }

}


export default Logout