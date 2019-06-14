import React, { Component } from 'react'
import { Grid, Container } from 'semantic-ui-react'
import { } from 'react-router-dom'


  class ProjectList extends Component {

    render() {
  
      return (
        <Container align="center">
          <Grid>
            <Grid.Column width={6}>
              <span>{this.props.project}</span>
            </Grid.Column>
            <Grid.Column width={4}>

            </Grid.Column>
            <Grid.Column width={6}>
              <span>{this.props.dueDate}</span>
            </Grid.Column>
          </Grid>
        </Container>
      )
    }
  }


export default ProjectList
