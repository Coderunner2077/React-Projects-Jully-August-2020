import React, { Component } from 'react';
import UserService from '../services/user.service';

export default class Home extends Component {
    state = {
        content: ""
    }

    componentDidMount() {
        UserService.getPublicContent()
            .then(res => {
                this.setState({ content: res.data });
            })
            .catch(error => {
                let errMessage = (error.response && error.response.data && error.response.data.message)
                    || error.message || error.toString();
                this.setState({ content: errMessage });
            })
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h3>{this.state.content}</h3>
                </div>
            </div>
        );
    }
}