import React from 'react';
import axios from 'axios';
import SbInputGroup from './sbInputGroup.jsx';
import SbList from './sbList.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rss: '',
      items: []
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitRSS = this.handleSubmitRSS.bind(this);
  }

  handleInputChange(event){
    let value = event.target.value;
    let name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmitRSS(){
    // console.log(this.state.rss)
    const data = {url: this.state.rss};
    axios.post('/api/articles', data)
    .then((res) => {
      this.setState({items:  res.data.items});
    }).catch((err) => {
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        <SbInputGroup inputName='rss' inputValue={this.state.rss} handleChange={this.handleInputChange} handleClick={this.handleSubmitRSS}/>
        <SbList items={this.state.items}/>
      </div>
    )
  }
}

export default Main;