import React from 'react';
import axios from 'axios';
import SbNavBar from './sbNavbar.jsx';
import SbInputGroup from './sbInputGroup.jsx';
import SbList from './sbList.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rss: '',
      title: null,
      imageUrl: null,
      description: null,
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
      this.setState({
        title: res.data.title,
        imageUrl: res.data.image.url,
        description: res.data.description,
        items: res.data.items
      });
    }).catch((err) => {
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        <SbNavBar></SbNavBar>
        <div className="container pt-4 pb-5">
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
              <SbInputGroup inputName='rss' inputValue={this.state.rss} handleChange={this.handleInputChange} handleClick={this.handleSubmitRSS}/>
              <SbList items={this.state.items}/>
            </div>
            <div className="col-lg-3"></div>
          </div>
        </div>        
      </div>
    )
  }
}

export default Main;