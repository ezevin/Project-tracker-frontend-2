import React, { Component } from 'react'
import { Button, Image, Modal, Header } from 'semantic-ui-react'

import Item from '../Forms/Item'
import ItemImage from '../Forms/ItemImage'
import Price from '../Forms/Price'
import Quantity from '../Forms/Quantity'
import Details from '../Forms/Details'
import Place from '../Forms/Place'

class MaterialUpdate extends Component {

  render(){

    return (
      <Modal size="mini" trigger={<Button>Info</Button>}>
        <Header as="h3">
          <Item label={this.props.label} fetchMaterials={this.props.fetchMaterials} id={this.props.id}/>{this.props.label}</Header><br />
        <ItemImage image_url={this.props.image_url} fetchMaterials={this.props.fetchMaterials} id={this.props.id}/>
        <Image
          className="box"
          floated='right'
          size='mini'
          src={this.props.image_url}>
        </Image>
        <Header as="h4">
          <Price price={this.props.price} fetchMaterials={this.props.fetchMaterials} id={this.props.id}/>Price:{this.props.price}</Header>
        <Header as="h4">
          <Quantity quantity={this.props.quantity} fetchMaterials={this.props.fetchMaterials} id={this.props.id}/>Quantity:{this.props.quantity}</Header>
        <Header as="h4">
          <Details description={this.props.description} fetchMaterials={this.props.fetchMaterials} id={this.props.id}/>Details: {this.props.description}</Header>
        <Header as="h4">
          <Place place_purchased={this.props.place_purchased} fetchMaterials={this.props.fetchMaterials} id={this.props.id}/>Place Purchased: {this.props.place_purchased}
        </Header>
      </Modal>
    )
  }
}

export default MaterialUpdate
