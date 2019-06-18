import React, { Component } from 'react'
import { Grid, Container } from 'semantic-ui-react'
import { } from 'react-router-dom'


  class ProjectList extends Component {

    render() {

      return (
        <Container align="center" className="textAll">
          <Grid>
            <Grid.Column width={6}>
              <h3>{this.props.project}</h3>
            </Grid.Column>
            <Grid.Column width={4}>

            </Grid.Column>
            <Grid.Column width={6}>
              <h3>{this.props.dueDate}</h3>
            </Grid.Column>
          </Grid>
        </Container>
      )
    }
  }


export default ProjectList
