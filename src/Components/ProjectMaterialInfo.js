import React, { Component } from 'react'
import { Button, Image, Modal, Header } from 'semantic-ui-react'

class ProjectMaterialInfo extends Component {

  render(){

    return (
      <Modal size="mini" trigger={<Button>Info</Button>}>
        <Header as="h3">{this.props.label}</Header><br />
        <Image
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

export default ProjectMaterialInfo
