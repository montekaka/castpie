import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Main from './components/main.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Router>
        <span>
          <Route exact path='/' component={Main} />
          <Route exact path='/feeds/:_id' component={Main} />
        </span>        
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
