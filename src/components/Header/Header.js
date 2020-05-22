import React, { Component } from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';
class Header extends Component {

   constructor(props) {
      super(props);

      this.state = {
          data: [],
          userFeed: '',
          redirectToReferrer: false,
          name: '',
      };

      
      this.logout = this.logout.bind(this);
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
            <div className="callout headcolor" id="Header">
                <nav>
                    <ul>
                        <li><Link to ='Home' >HOME</Link></li>
                        <li><Link to ='Todotask' >TODO APP</Link></li>
                        <li><Link to ='Done' >DONE TASK</Link></li>
                        <li>
                        <a>Services</a>
                        <ul>
                            <li><a >Web Design</a></li>
                            <li><a>Web Development</a></li>
                            <li><a>Mobile App Development</a></li>
                        </ul>
                        </li>
                      <li><a href="#" onClick={this.logout} className="logout">Logout</a></li>
                    </ul>
                    </nav>
                    <div>
            
            </div>
           
         </div>
            
        );
    }
}
export default Header;