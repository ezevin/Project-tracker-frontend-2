import React, { Component } from 'react'
import { Grid, Container } from 'semantic-ui-react'
import { } from 'react-router-dom'


  class ProjectList extends Component {

    render() {

  const done = this.props.toDoList.filter(item => item.complete === true)
  const list = this.props.toDoList.map(item => item)

  const percent = ((done.length)/(list.length))*100

      return (
        <Container align="center" className="textAll">
          <Grid>
            <Grid.Column width={6}>
              <h3>{this.props.project}</h3>
            </Grid.Column>
            <Grid.Column width={4}>
            {percent  ?
              <h3>{percent}%</h3>
             :
             <h3>0%</h3>
            }

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
