import React, { Component } from 'react'
import { Container, List, Grid, Button } from 'semantic-ui-react'

import ProjectMaterialInfo from './ProjectMaterialInfo'

class ProjectMaterialItem extends Component {

  render(){

    return (
      <Container>
        <Grid >
          <Grid.Column width={3}>
            <List>
              <List.Item><h4>{this.props.label}</h4></List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <List >
              <List.Item><h4>${this.props.price}</h4></List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <List >
              <List.Item><ProjectMaterialInfo
                key={this.props.id}
                materials={this.props.material}
                label={this.props.label}
                price={this.props.price}
                quantity="quantity"
                description={this.props.description}
                id={this.props.id}
                image_url={this.props.image_url}
                place_purchased={this.props.place_purchased}
                fetchMaterials={this.props.fetchMaterials}/>
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <List >
              <List.Item><h4 onClick={()=> {this.props.deleteMaterial(this.props.id)}}><Button>X</Button></h4></List.Item>
            </List>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

export default ProjectMaterialItem
