import React, { Component } from 'react'
import { Container, List, Grid } from 'semantic-ui-react'

import MaterialUpdate from '../Forms/MaterialUpdate'

class MaterialsList extends Component {

  state = {
    um: []
  }

  componentDidMount(){
    // fetch('http://localhost:3001/api/v1/user_materials')
    // .then(res => res.json())
    // .then(data => this.setState({um: data}))
  }

  render(){
    // const quantity = this.state.um.map(um => {
    //   if(um.material_id === this.props.id){
    //     return um.quantity
    //   }} )

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
              <List.Item><h4>{this.props.quantity}</h4></List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
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
              <List.Item><h4 onClick={()=> this.props.deleteMaterial(this.props.id)}> X </h4></List.Item>
            </List>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

export default MaterialsList
