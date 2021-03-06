import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Home.css';
import { PostData } from '../../services/PostData';
import UserFeed from "../UserFeed/UserFeed";
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
            PostData('feedUpdate', postData).then((result) => {
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

    editFeed(e) {

        alert("j");
    }

    getUserFeed() {

        let data = JSON.parse(sessionStorage.getItem("userData"));
        this.setState({ name: data.userData.name });
        let postData = { user_id: data.userData.user_id };

        if (data) {
            PostData('feed', postData).then((result) => {
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

            <div class="pt-24">

                <div class="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
                    <div class="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
                        <p class="uppercase tracking-loose w-full">What about to save your task here?</p>
                        <h1 class="my-4 text-5xl font-bold leading-tight">Try TODO <em>app</em> And Stay Comfortable!</h1>
                        <p class="leading-normal text-2xl mb-8">It's hard to remember your tasks, then you're in the right place, try TODO now!</p>
                    
                        

                        <button class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg ">Subscribe</button>
                         
                    </div>
                    <div class="w-full md:w-3/5 py-6 text-center">
                    <img src={require('./hero.png')} />
                    </div>
</div>
                </div>

            </div>
           
        );
    }
}

export default Home;