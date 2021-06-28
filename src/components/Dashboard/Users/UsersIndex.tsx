import { Component } from 'react';
import axios from 'axios'
import GlobalState from '../../../contexts/GlobalState'

type Props = {

}

type State = {
    users: {
        username: string,
        userid: string,
        email: string
    }[]
}

class UsersIndex extends Component<Props, State> {

    static contextType = GlobalState

    public componentDidMount() {
        this.getUsers()
    }

    public getUsers = () => {
        const headers = {
            headers: {
                'Authorization': `Bearer [${this.context.getToken()}]`
            }
        }

        axios.get(process.env.REACT_APP_API_URL + 'dashboard/registeredUsers', headers).then(res => {
            this.setState({
                users: res.data
            })
        }).catch(err => {
            console.log(err.response)
        })
    }


    public render() {
        if (this.state === null) return <div />;
        return (
            <div id="Users">
                <table>
                    <thead>
                        <tr>
                            <th>Userid</th>
                            <th>Username</th>
                            <th>Email</th>
                        </tr>
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

export default UsersIndex