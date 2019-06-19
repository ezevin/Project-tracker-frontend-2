import React, { Component } from 'react'
import { Header, Search, Button, Form, Popup, Grid, Container } from 'semantic-ui-react'

import MaterialsList from '../Components/MaterialsList'

class Materials extends Component {
  state = {
    label: "",
    user_id: "",
    material_id: "",
    isOpen: false
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  handleChange = (e) => {
    const target = e.target.name
    const value = e.target.value
    if (target === "label"){
    this.setState({label: value})
    } else if (target === "price"){
    this.setState({price: value})
    } else if (target === "quantity"){
    this.setState({quantity: value})
    }
  }

  handleSubmit = (e) => {
    const { label, price, quantity } = this.state
    // debugger
    fetch('http://localhost:3001/api/v1/materials', {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
          label,
          price,
          quantity,
        user_id: this.props.id,
      })
    })
    .then(res=>res.json())
    .then(data => {this.props.addMaterial(data)})
    this.setState({isOpen: false})
  }

  render(){

    const form = <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Material Name:</label>
                    <input width={6}
                      placeholder='item'
                      name='label'
                      onChange={this.handleChange}/>
                    <label>Price:</label>
                    <input
                      placeholder='price'
                      name='price'
                      onChange={this.handleChange}/>
                    <label>Quantity:</label>
                    <input type="number"
                      placeholder='quantity'
                      name='quantity'
                      onChange={this.handleChange}/>
                  </Form.Field>
                  <Button type='submit'>Add Material</Button>
                </Form>

    return (
      <div className="shadowInventory">
        <div >
          <Grid>
            <Grid.Row>
              <Grid.Column width={9}>
                <Header className="textLead" inverted color='grey' textAlign="center" as='h1'>Inventory</Header>
              </Grid.Column>
              <Grid.Column width={5}>
                <center><Search width={15} onSearchChange={this.props.handleSearch} showNoResults={false} /></center>
              </Grid.Column>
              <Grid.Column width={2}>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={1}><span></span></Grid.Column>
              <Grid.Column className="textLead" width={3}><h2>Item:</h2></Grid.Column>
              <Grid.Column className="textLead" width={3}><h2>Price:</h2></Grid.Column>
              <Grid.Column className="textLead" width={3}><h2>Quantity:</h2></Grid.Column>
              <Grid.Column width={2}></Grid.Column>
              <Grid.Column className="textLead" width={3}><h2>Remove:</h2></Grid.Column>
            </Grid.Row>
          </Grid><br />
          <Container className="inventory textAll">
          {this.props.materials.map(material => (
            <MaterialsList
              key={material.id}
              materials={material}
              label={material.label}
              price={material.price}
              description={material.description}
              quantity={material.quantity}
              id={material.id}
              image_url={material.image_url} place_purchased={material.place_purchased} deleteMaterial={this.props.deleteMaterial}
              fetchMaterials={this.props.fetchMaterials} um={this.props.um}/>
          ))}</Container>
        </div>
        <br />
        <center><Popup trigger={<button className="button">Add A New Material</button>}
                  content={form}
                  on='click'
                  position='bottom right'
                  open={this.state.isOpen}
                  onOpen={this.handleOpen}
                  onClose={this.handleClose}
                  /></center>
      </div>
    )
  }
}

export default Materials
