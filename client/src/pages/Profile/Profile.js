import React, { Component } from 'react';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';
import './Profile.css';
import Nav2 from "../../components/Nav2";
// import { Container } from '../../components/Grid/index';
import { /*Col,*/ Row, Container } from "../../components/Grid";
// import { List, ListItem } from "../../components/List";

class Profile extends Component {
  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }
  render() {
    const { profile } = this.state;
    return (
      <Container fluid>
        <Row>
          <Nav2 auth={this.props.auth} />
        </Row>
        <Row>
          <div className="container">
            <div className="profile-area">
              <h1>{profile.name}</h1>
              <Panel header="Profile">
                <img src={profile.picture} alt="profile" />
                <div>
                  <ControlLabel><Glyphicon glyph="user" /> Nickname</ControlLabel>
                  <h3>{profile.nickname}</h3>
                </div>
                <pre>{JSON.stringify(profile, null, 2)}</pre>
              </Panel>
            </div>
          </div>
        </Row>
      </Container>
    );
  }
}

export default Profile;
