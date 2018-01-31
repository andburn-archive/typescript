import * as React from 'react';

import Todo from './containers/Todo/Todo';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Todo title="Today" />
      </div>
    );
  }
}

export default App;
