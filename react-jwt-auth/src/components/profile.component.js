import React, { Component } from 'react';
import AuthService from '../services/auth.service';

export default class Profile extends Component {
    state = {
        currentUser: AuthService.getCurrentUser()
    }

    render() {
        const { currentUser } = this.state;

        return (
            <div className="container">
                <div className="jumbotron">
                    <h3>
                        <strong>currentUser.username</strong> Profile
                    </h3>
                    <p>
                        <strong>Token:</strong>{" "}
                        {currentUser.accessToken.substring(0, 20)}...{" "}
                        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                    </p>
                    <p>
                        <strong>Id:</strong>{" "}
                        {currentUser.id}
                    </p>
                    <p>
                        <strong>Email:</strong>{" "}
                        {currentUser.email}
                    </p>
                    <strong>Authorities:</strong>
                    <ul>
                        {currentUser.roles &&
                            currentUser.roles.map((role, index) => 
                                <li key={index}>{role}</li>
                            )    
                        }
                    </ul>                    
                </div>
            </div>
        );
    }
}