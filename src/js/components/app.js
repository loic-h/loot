import React from 'react';
import Thread from '../containers/thread';
import 'scss/app';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Thread />
      </div>
    );
  }
};

export default App;
