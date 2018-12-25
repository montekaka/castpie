import React from 'react';
import axios from 'axios';
import { ListGroupItem } from 'reactstrap';

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
      <ListGroupItem>
        {this.state.title}
        <div onClick={this.handleClick}>Click</div>
      </ListGroupItem>
    )
  }
}

export default SbListItem;