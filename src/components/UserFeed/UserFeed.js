import React, { Component } from 'react';
import Linkify from 'react-linkify';
import './UserFeed.css';
//import TimeAgo from 'react-timeago';
class UserFeed extends Component {

    constructor(props) {
        super(props);
    }

    render() {


        let userFeed = this.props.feedData
            .map(function (feedData, index) {
                return (
                    <div className="medium-12 columns" key={index}>

<div className="people-you-might-know">

<div className="row add-people-section">
<div className="small-12 medium-10 columns about-people">

<div className="about-people-author">

<button id="del" className="button small btn-color" onClick={this.props.deleteFeed} data={feedData.feed_id} value={this.props.index} >
Delete
</button>

<button id="done" className="button small btn-color" onClick={this.props.feedDone} data={feedData.feed_id} value={this.props.index} >
done
</button>
<p className="author-name">
<b>{feedData.feed}</b>
<Linkify>{this.props.name}</Linkify>
<br/>

</p>

</div>
</div>
<div className="small-12 medium-2 columns add-friend">
</div>
</div>
</div>
</div>
)
}, this);

return (
<div>
{userFeed}

</div>
);
}

}

export default UserFeed;