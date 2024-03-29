import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import Alert from './alert.component';

import AuthService from '../services/auth.service';

const required = value => {
    if(!value) 
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
};

export default class Login extends Component {
    state = {
        username: '',
        password: '',
        loading: false,
        message: ""
    };

    // Arrow fx for binding
    onUsernameChange = e => {
        this.setState({ username: e.target.value });
    }

    onPasswordChange = e => {
        this.setState({ password: e.target.value });
    }

    // Arrow fx for binding
    handleLogin = e => {
        e.preventDefault();

        this.setState({ loading: true, message: "" });

        this.form.validateAll();

        if(this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.username, this.state.password)
                .then(() => {
                    this.props.history.push("/profile");
                    window.location.reload();
                })
                .catch(error => {
                    const resMessage = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString();                     
                    this.setState({ message: resMessage, loading: false });
                });
        } else {
            this.setState({ loading: false });
        }
    }

    render() {
        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-image"
                        className="profile-img-card"
                    />
                    <Form onSubmit={this.handleLogin} ref={c => { this.form = c }}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Input className="form-control"
                                type="text"
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                                name="username"
                                validations={[required]}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Input type="password"
                                className="form-control"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                validations={[required]}
                            />
                        </div>
                        <div className="form-group">
                            <button 
                                className="btn btn-primary btn-block"
                                disabled={this.state.loading}
                            >
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}{" "}
                                <span>Login</span>
                            </button>
                        </div>
                        
                        {this.state.message && (                            
                            <Alert color="danger" message={this.state.message} />
                        )}

                        <CheckButton style={{display: "none"}}
                            ref={c => { this.checkBtn = c }}
                        />
                    </Form>
                </div>
                
            </div>
        );
    }
}

