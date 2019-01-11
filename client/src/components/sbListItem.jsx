import React from 'react';
import axios from 'axios';
import Plyr from 'plyr';
import SbListItemParagraph from './sbListItemParagraph.jsx';
import SbListItemImages from './sbListItemImages.jsx';
import css from './css/style.css';

class SbListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      text: '',
      bucketText: [],
      images: [],
      downloadUrl: ''    
    }

    this.handleClick = this.handleClick.bind(this);
    this.getAudioUrl = this.getAudioUrl.bind(this);
  }

  componentDidMount() {
    // const randomId = Math.floor(100000 + Math.random() * 900000);
    this.setState({
      id: this.props.item._id,
      title: this.props.item.rawTitle,
      text: this.props.item.rawText,
      bucketText: this.props.item.bucketText,
      images: this.props.item.images
    })
  }

  handleClick() {
    this.props.modalDownloadClickedToggle();
    this.getAudioUrl();
  }
  
  getAudioUrl() {
    const id = this.state.id;
    const endpoint = `/api/articles/${id}/mp3`;    
    axios.get(endpoint)
    .then((res) => {
      const audioUrl = res.data.audioUrl;
      this.setState({downloadUrl: audioUrl}, () => {
        this.props.modalDownloadClickedToggle();        
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }
  
  render() {

    let downloadButton;
    let player;
    if (this.state.downloadUrl.length > 0) {
      downloadButton = <a className="btn btn-primary btn-sm" href={this.state.downloadUrl}>Ready to download</a>
      player = <audio id={`player-${this.state.id}`} controls><source src={this.state.downloadUrl} type="audio/mp3"/></audio>
      const plyr = new Plyr(`#player-${this.state.id}`);
    } else {
      downloadButton = <button className="btn btn-outline-primary btn-sm" onClick={this.handleClick}>Convert the article</button>
    }

    return(
      <li className="media list-group-item p-4 sbListItem">
        <div className="media-body">
          <div className="media-heading">
            <small className="float-right text-muted">{this.props.item.pubDate}</small>
            <h6>{this.state.title}</h6>
          </div>
          {player}
          <div className="download-button">{downloadButton}</div>
          <SbListItemParagraph bucketText={this.state.bucketText}/>          
          <SbListItemImages images={this.state.images}/>          
        </div>        
      </li>
    )
  }
}

export default SbListItem;