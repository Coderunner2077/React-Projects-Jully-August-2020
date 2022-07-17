import React, { Component } from 'react';
import UserService from '../services/user.service';

export default class BoardAdmin extends Component {
    state = {
        content: ""
    }

    componentDidMount() {
        UserService.getAdminContent()
            .then(res => 
                this.setState({ content: res.data })
            )
            .catch(err => 
                this.setState({
                    content: (err.response && err.response.data && err.response.data.message)
                        || err.message || err.toString()
                })
            );
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h3>{this.state.content}</h3>
                </div>
            </div>
        )
    }
}