import React, { Component } from 'react'
import { Image, Modal, Header } from 'semantic-ui-react'

class GalleryMaterialInfo extends Component {

  render(){

    return (
      <Modal size="mini" trigger={<a>{this.props.label}, </a>}>
        <Header as="h3" className="underline">{this.props.label}</Header><br />
        <Image
          href={this.props.label}
          className="box"
          floated='right'
          size='mini'
          src={this.props.image_url}>
        </Image>
        <Header as="h4">Price:{this.props.price}</Header>
        <Header as="h4">Details: {this.props.description}</Header>
        <Header as="h4">Place Purchased: {this.props.place_purchased}</Header>
      </Modal>
    )
  }
}

export default GalleryMaterialInfo
