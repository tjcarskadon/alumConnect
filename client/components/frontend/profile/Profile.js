import React from 'react'
import ProfileField from './ProfileField.js'
import Image from './Image.js'
import RestHandler from '../../../util/RestHandler'
import { Button, Row, Col} from 'react-bootstrap';


var request = require('superagent');

class Profile extends React.Component {

  constructor (props) {
    super (props);

    this.state = {
      image: 'Hello',
      username: '',
      filledOutProfileFields: [],
      availableProfileFields: [],
      editing: 0
    };
  }

  componentDidMount() {
    this.getUserProfile();
    this.getAvailableFields();
  }

  getAvailableFields() {
    var url = '/db/fields';
    RestHandler.Get(url, (err, res) => {
      this.setState({
        availableProfileFields: res.body
      });
    });
  }

  getUserProfile() {
    var url = '/db/users/user/' + this.props.params.user;
    RestHandler.Get(url, (err, res) => {
      this.setState({
        username: res.body.user.username,
        image: "../../../assets/matt.jpg",
        filledOutProfileFields: res.body.userInfo
      });
    });
  }

  handleEditProfile(event, filledOutProfileFields) {
    this.state.editing
    ? this.setState({ editing: 0})
    : this.setState({ editing: 1});
  }

  profile() {

    // return this.state.availableProfileFields.map((field, index) => {
    //
    // // if filledOutProfileFields contains the field.id
    // // set the value to the value
    // // else set value to ''
    // // if the balue is blank don't render it on the front end.
    //
    // field.value = ''
    // return (<ProfileField
    //   fieldDetails={field}
    //   editing={this.state.editing} />);
    // });
    if(this.state.filledOutProfileFields) {
      return this.state.filledOutProfileFields.map((detail, index) => {
        return (<ProfileField
          fieldDetails={detail}
          editing={this.state.editing}
          key={index} />);
      });
    }
  }

  render() {
    return (
      <div>
        <Row className="search-for-users">
          <Image image={this.state.image} />
          <h3>{this.state.username}</h3>
          <Button onClick={this.handleEditProfile.bind(this)}>
            Edit Profile
          </Button>
        </Row>
        <Row>{this.profile()}</Row>
      </div>

    );
  }
}

module.exports = Profile;


// _handleProfileChange(event) {
//   event.preventDefault();
//   console.log(this.refs.val.value);
//   this.setState({value: this.refs.val.value});
// }
