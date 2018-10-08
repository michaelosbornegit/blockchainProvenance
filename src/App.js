import React, { Component } from 'react';
import ReadSimpleStorage from './ReadSimpleStorage.js'
import WriteSimpleStorage from './WriteSimpleStorage.js'
import logo from './logo.png';

class App extends Component {
  state = { loading: true, drizzleState: null };

  componentDidMount() {
    const { drizzle } = this.props;
  
    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {
  
      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();
  
      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  compomentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.loading) return "Loading Drizzle...";
    return (
      <div className="App">
        <div className="center">
          <div className="center-text">
            <img className="center" width="200" height ="200" src={logo} alt="Provenance Logo" />
            <h1>Blockchain Provenance Example</h1>
            <p>Tracking a item's location over time and other information related to the item on a blockchain</p>
          </div>
          <ReadSimpleStorage
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}
          />
          <WriteSimpleStorage
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}
          />          
        </div>
      </div>
    );
  }
}

export default App;