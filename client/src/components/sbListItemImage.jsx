import React from 'react';

class SbListItemImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: '',
      height: '1050',
      width: '700'
    }    
  }

  componentDidMount() {
    this.setState({src: this.props.image.src});
    if (this.props.image.width) {this.setState({src: this.props.image.width})}
    if (this.props.image.height) {this.setState({src: this.props.image.height})}
  }

  render() {
    return(
      <div>
        <img data-action="zoom" data-width={this.state.width} data-height={this.state.height} src={this.state.src}></img>
      </div>
    )
  }  
}

export default SbListItemImage;
