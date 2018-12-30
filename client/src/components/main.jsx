import React from 'react';
import axios from 'axios';
import SbNavBar from './sbNavbar.jsx';
import SbInputGroup from './sbInputGroup.jsx';
import SbList from './sbList.jsx';
import SbCard from './sbCard.jsx';

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
      const data = res.data;
      if(data.title) { this.setState({title: data.title})}
      if(data.image) {
        this.setState({imageUrl: data.image.url})
      } else {
        // default
        // this.setState({imageUrl: data.image.url})
      }
      if(data.description) { this.setState({description: data.description})}
      if(data.items) { this.setState({items: data.items})}
    }).catch((err) => {
      console.log(err)
    })
  }

  render() {
    let titleCard;
    if (this.state.title) {
      titleCard = <SbCard title={this.state.title} imageUrl={this.state.imageUrl} description={this.state.description}/>
    }
    return (
      <div>
        <SbNavBar></SbNavBar>
        <div className="container pt-4 pb-5">
          <div className="row">
            <div className="col-lg-3">
              {titleCard}
            </div>
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