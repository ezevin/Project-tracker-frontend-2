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

  handleClick = (id) => {
    const token = localStorage.getItem('token')
    const material = this.props.allMaterials.filter(material => {
      if (material.id === id){
        return material
      }
    })
    const total = material.map(item => item.quantity)

    fetch('http://localhost:3001/api/v1/project_materials', {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify({
          project_id: this.props.id,
          material_id: id
      })
    })
      .then(res=>{res.json()})
      .then(data => {this.props.addProjectMaterial(data)})
      .then(()=>this.props.fetchProjectMaterials())
      .then(()=>this.props.fetchPM())

      fetch(`http://localhost:3001/api/v1/materials/${id}`, {
            method: "PATCH",
            headers: {
              Accept: 'application/json',
              'Content-type': 'application/json'
            },
            body: JSON.stringify({ quantity: (parseInt(total) - 1 ).toString() })
          })
          .then(res=>res.json())
          .then(data => {this.setState(data)})
      this.setState({isOpen: false})
      window.location.reload()
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
                  <Button onClick={()=>this.handleClick(material.id)}>{material.label} ${material.price}</Button><span floated="right">{material.quantity} Left</span>
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
            // quantity={material.quantity}
            description={material.description}
            id={material.id}
            fetchpm={this.props.fetchPM}
            image_url={material.image_url}
            place_purchased={material.place_purchased}
            deleteMaterial={this.props.deleteMaterial}
            fetchMaterials={this.props.fetchMaterials}
            pm={this.props.pm}
            handleAddMaterial={this.handleAddMaterial}/>
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
