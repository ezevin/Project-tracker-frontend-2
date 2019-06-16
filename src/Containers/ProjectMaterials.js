import React, { Component } from 'react'
import { Header, Search, Button, Popup, Grid, List } from 'semantic-ui-react'

import ProjectMaterialItem from "../Components/ProjectMaterialItem"

class ProjectMaterials extends Component {

  state = {
    label: "",
    user_id: "",
    isOpen: false,
    material_id: '',
    all: [],
    quantity: ''
  }


  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  handleClick = (item) => {

    const material = this.props.allMaterials.filter(material => {
      if (material.id === item.id){
        return material
      }
    })
    const total = material.map(item => item.quantity)

    fetch('http://localhost:3001/api/v1/inventories', {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
          project_id: this.props.id,
          label: item.label,
          price: item.price,
          description: item.description,
          image_url: item.image_url,
          place_purchased: item.place_purchased
      })
    })
      .then(res=> res.json())
      .then(data => {this.props.addToInventory(data)})
      .then(()=>this.props.fetchInventory())
      // .then(()=>this.props.fetchPM())

      fetch(`http://localhost:3001/api/v1/materials/${item.id}`, {
            method: "PATCH",
            headers: {
              Accept: 'application/json',
              'Content-type': 'application/json'
            },
            body: JSON.stringify({ quantity: (parseInt(total) - 1 ).toString() })
          })
          .then(res=>res.json())
          .then(data => {this.setState(data)})
          .then(() => this.props.fetchMaterials())
      this.setState({isOpen: false})
  }

  render (){
    const filtered = this.props.allMaterials.filter(material => {
     if(material.quantity > 0){
       return material
     }
    })

    const form = filtered.map(material => {

      return  (
                <List>
                  <Button onClick={()=>this.handleClick(material)}>{material.label} ${material.price}</Button><span floated="right">{material.quantity} Left</span>
                </List>)
              })

    return (
      <>
        <Header inverted color='grey' textAlign="center" as='h2'>Inventory</Header>
        <center><Search width={15} onSearchChange={this.props.handleSearch} showNoResults={false} /></center><br />
        <Grid>
          <Grid.Column width={4}><span>Item:</span></Grid.Column>
          <Grid.Column width={4}><span>Price:</span></Grid.Column>
          <Grid.Column width={4}></Grid.Column>
          <Grid.Column width={4}></Grid.Column>
        </Grid>
        {this.props.materials.map(material => (
          <ProjectMaterialItem
            key={material.id}
            label={material.label}
            price={material.price}
            description={material.description}
            id={material.id}
            materials={this.props.allMaterials}
            image_url={material.image_url}
            place_purchased={material.place_purchased}
            deleteInventory={this.props.deleteInventory}
            fetchInventory={this.props.fetchInventory}
            pm={this.props.pm}/>
        ))}<br />
        <center><center><Popup trigger={<Button content='Add A Material' />}
                  content={form}
                  on='click'
                  position='bottom right'
                  open={this.state.isOpen}
                  onOpen={this.handleOpen}
                  onClose={this.handleClose}
                  /></center></center>
      </>
    )
  }
}

export default ProjectMaterials
