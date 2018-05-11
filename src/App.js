import React, { Component } from 'react';
import routes from './routes';
// import Home from './components/Home/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        {routes()}
      </div>
    );
  }
}

export default App;
