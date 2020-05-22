import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Done.css';
import { PostData } from '../../services/PostData';
import FeedDone from "../FeedDone/FeedDone";
import { confirmAlert } from 'react-confirm-alert';
import '../../styles/react-confirm-alert.css';
import Header from '../../components/Header/Header';



class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            userFeed: '',
            redirectToReferrer: false,
            name: '',
        };

        this.getUserFeed = this.getUserFeed.bind(this);
        this.feedUpdate = this.feedUpdate.bind(this);
        this.onChange = this.onChange.bind(this);
        this.deleteFeed = this.deleteFeed.bind(this);
        this.deleteFeedAction = this.deleteFeedAction.bind(this);
        this.feedDone = this.feedDone.bind(this);
        this.feedDoneAction = this.feedDoneAction.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentWillMount() {

        if (sessionStorage.getItem("userData")) {
            this.getUserFeed();
        }

        else {
            this.setState({ redirectToReferrer: true });
        }

    }

    feedUpdate(e) {

        e.preventDefault();
        let data = JSON.parse(sessionStorage.getItem("userData"));
        let postData = { user_id: data.userData.user_id, feed: this.state.userFeed };
        if (this.state.userFeed) {
            PostData('feedUpdates', postData).then((result) => {
                let responseJson = result;
                this.setState({ data: responseJson.feedData });
            });
        }
    }

    deleteFeed(e) {

        confirmAlert({
            title: 'Delete Feed',
            message: 'Are you sure to delete this feed.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.deleteFeedAction(e)
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ]
        });

    }

    deleteFeedAction(e) {

        let updateIndex = e.target.getAttribute('value');

        let feed_id = document.getElementById("del").getAttribute("data");

        let data = JSON.parse(sessionStorage.getItem("userData"));

        let postData = { user_id: data.userData.user_id, feed_id: feed_id };
        if (postData) {

            PostData('feedDelete', postData).then((result) => {
                this.state.data.splice(updateIndex, 1);
                this.setState({ data: this.state.data });

                if (result.success) {

                    // alert(result.success);
                }
                else
                    alert(result.error);

            });
        }
    }
    
    feedDone(e) {

        confirmAlert({
            title: 'Delete Feed',
            message: 'Are you sure to delete this feed.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.feedDoneAction(e),
                    
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ]
        });

    }

    feedDoneAction(e) {

        let updateIndex = e.target.getAttribute('value');

        let feed_id = document.getElementById("done").getAttribute("data");

        let data = JSON.parse(sessionStorage.getItem("userData"));

        let postData = { user_id: data.userData.user_id, feed_id: feed_id };
        if (postData) {

            PostData('feedDone', postData).then((result) => {
                this.state.data.splice(updateIndex, 1);
                this.setState({ data: this.state.data });

                if (result.success) {

                    // alert(result.success);
                }
                else
                    alert(result.error);

            });
        }
    }
    
    

    editFeed(e) {

        alert("j");
    }

    getUserFeed() {

        let data = JSON.parse(sessionStorage.getItem("userData"));
        this.setState({ name: data.userData.name });
        let postData = { user_id: data.userData.user_id };

        if (data) {
            PostData('feeds', postData).then((result) => {
                let responseJson = result;
                if (responseJson.feedData) {
                    this.setState({ data: responseJson.feedData });
                    console.log(this.state);
                }
            });
        }

    }

    onChange(e) {
        this.setState({ userFeed: e.target.value });
    }
    logout() {
        sessionStorage.setItem("userData", '');
        sessionStorage.clear();
        this.setState({ redirectToReferrer: true });
    }

    

    render() {
        if (this.state.redirectToReferrer) {
            return (<Redirect to={'/login'} />)
        }
    

        return (
            
            <div className="row" id="Body">
                <Header name={this.state.appName}/>
                <h1 className="tittle">DONE</h1>
                
                <div className="TodoApp">
                    <p className="todo">TO DONE TASKS FEELS GOOD!</p>
                    <div className="post">
                    <FeedDone name="FeedDone" feedData = {this.state.data} deleteFeed = {this.deleteFeed} feedDone = {this.feedDone} name={this.state.name}/>
                    </div>
                  

                </div>
         </div>
                
            
           
        );
    }
}


  
export default Home;