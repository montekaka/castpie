import React from 'react';
import axios from 'axios';
import SbNavBar from './sbNavbar.jsx';
import SbInputGroup from './sbInputGroup.jsx';
import SbList from './sbList.jsx';
import SbCard from './sbCard.jsx';
import SbModal from './sbModal.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rss: '',
      _id: null,
      title: null,
      imageUrl: null,
      description: null,
      items: [],
      modalDownloadClicked: false,
      modalDownloadMessage: 'Please wait a bit for us to convert your article into audio.',
      modalDownloadTitle: 'Converting',
      modalErrorClicked: false,
      modalErrorMessage: 'This website is only able to work with RSS at the monent.  Please make sure you entered a RSS feed.',
      modalErrorTitle: 'Error'
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitRSS = this.handleSubmitRSS.bind(this);
    this.modalDownloadClickedToggle = this.modalDownloadClickedToggle.bind(this);
    this.modalErrorClickedToggle = this.modalErrorClickedToggle.bind(this);
    this.resetHandler = this.resetHandler.bind(this);    
  }

  componentDidMount() {
    const _id = this.props.match.params._id;
    if(_id) {
      
    }
  }

  resetHandler() {
    this.setState({
      rss: '',
      title: null,
      imageUrl: null,
      description: null,
      items: [],
      modalDownloadClicked: false,
      modalErrorClicked: false
    })
  }

  handleInputChange(event){
    let value = event.target.value;
    let name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  modalDownloadClickedToggle() {
    // we should change this to higher order function
    this.setState({modalDownloadClicked: !this.state.modalDownloadClicked});
  }

  modalErrorClickedToggle() {
    this.setState({modalErrorClicked: !this.state.modalErrorClicked});
  }

  handleSubmitRSS(){
    // console.log(this.state.rss)
    const _this = this;
    const data = {url: this.state.rss};
    axios.post('/api/feed', data)
    .then((res) => {    
      const data = res.data.main;
      const _id = data._id;
      this.setState({_id: _id});
      if(data.title) { this.setState({title: data.title})}
      if(data.imageUrl) { this.setState({imageUrl: data.imageUrl})}
      if(data.description) { this.setState({description: data.description})}
      this.setState({items: res.data.articles});      
    }).catch((err) => {
      // error modal
      this.modalErrorClickedToggle();
    })
  }

  render() {
    let titleCard;

    if (this.state.title) {
      titleCard = <SbCard title={this.state.title} imageUrl={this.state.imageUrl} description={this.state.description}/>
    }

    return (
      <div>
        <SbNavBar resetHandler={this.resetHandler}></SbNavBar>
        <div className="container pt-4 pb-5">
          <div className="row">
            <div className="col-lg-3">
              {titleCard}
            </div>
            <div className="col-lg-6">
              <SbInputGroup inputName='rss' inputValue={this.state.rss} handleChange={this.handleInputChange} handleClick={this.handleSubmitRSS}/>
              <SbList items={this.state.items} modalDownloadClickedToggle={this.modalDownloadClickedToggle}/>
            </div>
            <div className="col-lg-3"></div>
          </div>
        </div>
        <SbModal modal={this.state.modalDownloadClicked} toggle={this.modalDownloadClickedToggle} title={this.state.modalDownloadTitle}  message={this.state.modalDownloadMessage}/>
        <SbModal modal={this.state.modalErrorClicked} toggle={this.modalErrorClickedToggle} title={this.state.modalErrorTitle}  message={`${this.state.modalErrorMessage} This is not a RSS feed: ${this.state.rss}`}/>
      </div>
    )
  }
}

export default Main;