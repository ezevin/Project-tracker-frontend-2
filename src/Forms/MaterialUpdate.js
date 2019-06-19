import React, { Component } from 'react'
import { Modal, Grid, Card } from 'semantic-ui-react'

import Item from '../Forms/Item'
import ItemImage from '../Forms/ItemImage'
import Price from '../Forms/Price'
import Quantity from '../Forms/Quantity'
import Details from '../Forms/Details'
import Place from '../Forms/Place'

class MaterialUpdate extends Component {

  render(){

    return (
      <Modal size="mini" trigger={<button className="button">Info</button>}>
        <Card fluid float="left">
          <Card.Content>
            <Grid>
              <Grid.Column width={6}>
                <ItemImage image_url={this.props.image_url} fetchMaterials={this.props.fetchMaterials} id={this.props.id}/><br />
                <Card.Description className="inverseText">
                  <Price price={this.props.price} fetchMaterials={this.props.fetchMaterials} id={this.props.id}/>
                </Card.Description>
                <Card.Description className="inverseText">
                  <Quantity quantity={this.props.quantity} fetchMaterials={this.props.fetchMaterials} id={this.props.id}/>
                </Card.Description>
                <Card.Description className="inverseText">
                  <Place place_purchased={this.props.place_purchased} fetchMaterials={this.props.fetchMaterials} id={this.props.id}/>
                </Card.Description>
              </Grid.Column>
              <Grid.Column  width={6}>
                <Card.Header className="underline">
                  <Item label={this.props.label} fetchMaterials={this.props.fetchMaterials} id={this.props.id}/>
                </Card.Header><br />
                <Card.Meta>
                  <Details description={this.props.description} fetchMaterials={this.props.fetchMaterials} id={this.props.id}/><br />
                </Card.Meta>
            </Grid.Column>
           </Grid>
         </Card.Content>
       </Card>
      </Modal>
    )
  }
}

export default MaterialUpdate
