import React, { Component } from 'react';
import ReactDOM from 'react';
import { Redirect } from 'react-router-dom';
import { PostData } from '../../services/PostData';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ThreeDRotation from '@material-ui/icons/ThreeDRotation';


class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            redirectToReferrer: false
        };
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    login() {
        if (this.state.username && this.state.password) {
            PostData('login', this.state).then((result) => {
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
    window.location.href="/Signup";
}
    render() {
        if (this.state.redirectToReferrer) {
            return (<Redirect to={'/home'} />)
        }
        if (sessionStorage.getItem('userData')) {
            return (<Redirect to={'/home'} />)
        }
        return (
            <div className="App">
                <h1 className="todo">TODO TASK</h1>

                <div className="input-container">
                    <input type="text" name="username" placeholder="Username" required onChange={this.onChange} />
                    <i className="fa fa-user"></i>
                </div>

                <div className="input-container">
                    <input type="password" name="password" placeholder="Password" onChange={this.onChange} />
                    <i className="fa fa-lock"></i>
                </div>
                 
                 <div className="login">
                    <button type="submit" value="Login" onClick={this.login} >Log In</button>
                    <button id="bt" onClick={this.onClick.bind(this)} ref={(ref)=>{this.bt = ref}}>SignUp</button>

                 </div>
            </div>
        );
    }
}
export default Login;
// ReactDOM.render(<App />, document.getElementById('app'));
