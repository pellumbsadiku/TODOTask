import React, { Component } from 'react';
import { PostData } from '../../services/PostData';
import { Redirect } from 'react-router-dom';
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            name: '',
            redirectToReferrer: false
        };
        this.signup = this.signup.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    signup() {
        if (this.state.username && this.state.password && this.state.email && this.state.name) {
            PostData('signup', this.state).then((result) => {
                let responseJson = result;
                if (responseJson.userData) {
                    sessionStorage.setItem('userData', JSON.stringify(responseJson));
                    this.setState({ redirectToReferrer: true });
                }
                else
                    alert(result.error);
            });
        }
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onClick(){
    window.location.href="/";
    }
    render() {
        if (this.state.redirectToReferrer || sessionStorage.getItem('userData')) {
            return (<Redirect to={'/home'} />)
        }
        return (
            <div className="App">

                <div className="input-container">
                    <input type="text" name="email" placeholder="Email" required onChange={this.onChange} />
                    <i class="fa fa-envelope-o"></i>
                </div>

                <div className="input-container">
                    <input type="text" name="name" placeholder="Full Name" required onChange={this.onChange} />
                    <i className="fa fa-user"></i>
                </div>

                <div className="input-container">
                    <input type="text" name="username" placeholder="Username" required onChange={this.onChange} />
                    <i className="fa fa-user"></i>
                </div>

                <div className="input-container">
                    <input type="password" name="password" placeholder="Password" onChange={this.onChange} />
                    <i className="fa fa-lock"></i>
                </div>
                 
                 <div className="login">
                    <button type="submit" value="Login" onClick={this.signup} >SignUp</button>
                    <button id="bt" onClick={this.onClick.bind(this)} ref={(ref)=>{this.bt = ref}}>Log In</button>

                 </div>
            </div>
        );
    }
}
export default Signup;