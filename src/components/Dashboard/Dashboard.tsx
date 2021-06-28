import React, { Component } from 'react';
import NavBar from '../UI/NavBar';

type Props = {
    component: any
}
class Dashboard extends Component<Props> {
    public render() {
        return (
            <div id="Dashboard">
                <NavBar />
                {this.props.component}
            </div>
        )
    }

}

export default Dashboard