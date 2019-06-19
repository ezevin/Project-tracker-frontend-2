import React, { Component } from 'react'
import { Image, Modal, Header, Grid, Card } from 'semantic-ui-react'

class ProjectMaterialInfo extends Component {

  render(){

    return (
      <Modal size="mini" trigger={<button className="button">Info</button  >}>
        <Card fluid float="left">
          <Card.Content>
            <Grid>
              <Grid.Column width={6}>
                <Image floated='right' size='mini' src={this.props.image_url} /><br />
              </Grid.Column>
              <Grid.Column  width={6}>
                <Header as="h3" className="underline">{this.props.label}</Header>
                <Header as="h4">Details: {this.props.description}</Header>
                <Header as="h4">Price:{this.props.price}</Header>
                <Header as="h4">Place Purchased: {this.props.place_purchased}</Header>
              </Grid.Column>
            </Grid>
          </Card.Content>
        </Card>
      </Modal>
    )
  }
}

export default ProjectMaterialInfo
