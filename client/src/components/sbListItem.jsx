import React from 'react';
import axios from 'axios';
import SbListItemParagraph from './sbListItemParagraph.jsx'
import SbListItemImages from './sbListItemImages.jsx'

class SbListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: ''      
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.setState({
      title: this.props.item.title,
      text: this.props.item['content:encoded']
    })
  }

  handleClick(){
    // console.log(this.state.rss)
    const data = {title: this.state.title, text: this.state.text, outputFormat: 'mp3', voiceId: 'Kimberly'};
    axios.post('/api/article', data)
    .then((res) => {
      //console.log(res)
      window.open(res.data);
    }).catch((err) => {
      console.log(err)
    })
  }
  
  render() {
    return(
      <li className="media list-group-item p-4">
        <div className="media-body">
          <div className="media-heading">
            <small className="float-right text-muted">{this.props.item.pubDate}</small>
            <h6>{this.state.title}</h6>
          </div>
          <button className="btn btn-outline-primary btn-sm" onClick={this.handleClick}>Download and listen full article</button>
          <SbListItemParagraph text={this.state.text}/>          
          <SbListItemImages text={this.state.text}/>          
        </div>        
      </li>
    )
  }
}

export default SbListItem;