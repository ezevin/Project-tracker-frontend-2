import React, { Component } from 'react'
import { Container, List, Grid, Icon } from 'semantic-ui-react'

import ProjectMaterialInfo from './ProjectMaterialInfo'

class ProjectMaterialItem extends Component {

  render(){

    return (
      <Container>
        <Grid >
          <Grid.Column width={4}>
            <List>
              <List.Item><h4>{this.props.label}</h4></List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={4}>
            <List >
              <List.Item><h4>${this.props.price}</h4></List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={4}>
            <List >
              <List.Item><ProjectMaterialInfo
                key={this.props.id}
                label={this.props.label}
                price={this.props.price}
                description={this.props.description}
                id={this.props.id}
                image_url={this.props.image_url}
                place_purchased={this.props.place_purchased}/>
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={4}>
            <List >
              <List.Item><Icon name="delete" className="black" onClick={()=> {this.props.deleteInventory(this.props)}}/></List.Item>
            </List>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

export default ProjectMaterialItem
