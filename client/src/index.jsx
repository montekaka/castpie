import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/main.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <Main/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
