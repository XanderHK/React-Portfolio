import { Component } from 'react';
import axios from 'axios'

type Props = {
    getToken: any
}

type State = {
    users: {
        username: string,
        userid: string,
        email: string
    }[]
}

class Dashboard extends Component<Props, State> {

    public componentDidMount() {
        this.getBooks()
    }

    public getBooks = () => {
        const headers = {
            headers: {
                'Authorization': `Bearer [${this.props.getToken()}]`
            }
        }
        axios.get(process.env.REACT_APP_API_URL + "dashboard/registeredUsers", headers).then(res => {
            this.setState({
                users: res.data
            })
        }).catch(err => console.log(err))
    }


    public render() {
        if (this.state === null) return <div />;
        return (
            <div id="Dashboard">
                <h2>Dashboard</h2>
                <table>
                    <thead>
                        <th>Userid</th>
                        <th>Username</th>
                        <th>Email</th>
                    </thead>
                    <tbody>
                        {this.state.users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{user.userid}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

}

export default Dashboard