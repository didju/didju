import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Main from './components/Main';
import Footer from './components/Footer';

class App extends Component {
  constructor(props) {
    super(props);

    this.updateState = this.updateState.bind(this);

    this.state = {
      name: '',
      signedIn: false,
      token: '',
    };
  }

  updateState(newState, callback = null) {
    this.setState(newState, callback);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" component={NavBar} />
          <Main updateState={this.updateState} />
          <Route path="/" component={Footer} />
        </div>
      </Router>
    );
  }
}

export default App;
