import { Component } from 'react';

type Props = {
    component: any
}
class Dashboard extends Component<Props> {
    public render() {
        return (
            <div id="Dashboard">
                {this.props.component}
            </div>
        )
    }

}

export default Dashboard