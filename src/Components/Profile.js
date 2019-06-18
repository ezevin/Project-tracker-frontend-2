import React, { Component } from 'react'
import { Image, Container, Grid } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

import AboutMe from '../Forms/AboutMe'
import Name from '../Forms/Name'
import Age from '../Forms/Age'
import ProfilePic from '../Forms/ProfilePic'

class Profile extends Component {

  render(){

    const { username, name, age, about_me, profile_picture, id } = this.props.user
    const token = localStorage.getItem("token")
    if(!token){
      this.props.history.push('login')}
    else{
      return (
        <Container className="profile">
        <center className="textMedium"><h1>{username}'s Profile</h1></center><br /> <br />
        <Grid>
          <Grid.Column width={6} floated="right">
            <ProfilePic id={id} fetchUserData={this.props.fetchUserData}/><Image size="medium"  src={profile_picture} image={profile_picture}/>
          </Grid.Column>
          <Grid.Column  width={10} textAlign="left">
            <br /><br /><span className="color"><Name id={id} fetchUserData={this.props.fetchUserData} name={name}/>Name: {name}</span><br /><br />
            <span className="color"><Age id={id} fetchUserData={this.props.fetchUserData} age={age}/>Age: {age} </span><br /><br />
            <span className="color"><AboutMe id={id} fetchUserData={this.props.fetchUserData} about_me={about_me}/>About Me: "{about_me}"</span><br /><br />
          </Grid.Column>
        </Grid>
        </Container>
      )}
  }
}

export default withRouter(Profile)
