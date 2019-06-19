import React, { Component } from 'react'
import { Container, List, Grid } from 'semantic-ui-react'

import MaterialUpdate from '../Forms/MaterialUpdate'

class MaterialsList extends Component {

  render(){

    return (
      <Container>
        <Grid >
          <Grid.Column width={3}>
            <List>
              <List.Item><h3>{this.props.label}</h3></List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={2}>
            <List >
              <center><List.Item><h3>${this.props.price}</h3></List.Item></center>
            </List>
          </Grid.Column>
          <Grid.Column width={5}>
            <List >
              <center><List.Item><h3>{this.props.quantity}</h3></List.Item></center>
            </List>
          </Grid.Column>
          <Grid.Column width={2}>
            <List >
              <List.Item><MaterialUpdate
                key={this.props.id}
                materials={this.props.material}
                label={this.props.label}
                price={this.props.price}
                quantity={this.props.quantity}
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
              <List.Item><center><h3 onClick={()=> this.props.deleteMaterial(this.props.id)} className="red" textAlign="center"> X </h3></center></List.Item>
            </List>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

export default MaterialsList
