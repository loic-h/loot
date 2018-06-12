import React from 'react';
import Thread from '../containers/thread';
import Header from '../components/header';
import 'scss/app';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Thread />
      </div>
    );
  }
};

export default App;
