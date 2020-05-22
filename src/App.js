import React, { Component } from 'react';
import './styles/costum.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
// import './styles/foundation.min.css'
import Routes from './routes';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MobileHeader from './components/MobileHeader/MobileHeader';
class App extends Component {
  constructor() {
    super();
    this.state = {
      appName: "Test",
      home: false
    }
  }
  render() {
    return (
      <div className="off-canvas-wrapper">
            <Routes name={this.state.appName} />
        </div>
    );
}
}

export default App;

