import React from 'react';
import axios from 'axios';
import SbListItemParagraph from './sbListItemParagraph.jsx'
import SbListItemImages from './sbListItemImages.jsx'

class SbListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      downloadUrl: ''
    }

    this.handleClick = this.handleClick.bind(this);
    this.post = this.post.bind(this);
  }

  componentDidMount() {
    this.setState({
      title: this.props.item.title,
      text: this.props.item['content:encoded']
    })
  }

  handleClick() {
    // 1. open the modal, telling user we are working to convert the article to audio
    // 2. make a post request
    // 3. close the modal, and download the file
    this.props.modalDownloadClickedToggle();
    this.post();
  }

  post() {
    const data = {title: this.state.title, text: this.state.text, outputFormat: 'mp3', voiceId: 'Kimberly'};
    axios.post('/api/article', data)
    .then((res) => {      
      this.setState({downloadUrl: res.data}, () => {
        this.props.modalDownloadClickedToggle();
      });
    }).catch((err) => {
      console.log(err)
    })    
  }
  //<a href="path_to_file" download="proposed_file_name">Download</a>

  render() {

    let downloadButton;
    if (this.state.downloadUrl.length > 0) {
      downloadButton = <a className="btn btn-primary btn-sm" href={this.state.downloadUrl}>Ready to download</a>
    } else {
      downloadButton = <button className="btn btn-outline-primary btn-sm" onClick={this.handleClick}>convert the article</button>
    }

    return(
      <li className="media list-group-item p-4">
        <div className="media-body">
          <div className="media-heading">
            <small className="float-right text-muted">{this.props.item.pubDate}</small>
            <h6>{this.state.title}</h6>
          </div>
          {downloadButton}          
          <SbListItemParagraph text={this.state.text}/>          
          <SbListItemImages text={this.state.text}/>          
        </div>        
      </li>
    )
  }
}

export default SbListItem;