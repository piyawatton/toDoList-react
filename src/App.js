import React, { Component } from 'react';
import {Todo} from './Todo';
import './css/bootstrap.css';
import './css/App.css';
class App extends Component {


  render() {
    
    return (
      <div className="App">
        <Todo />
      </div>
    );
  }
}

export default App;
