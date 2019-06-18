import React, { Component } from 'react'
import { Image, Modal, Card, Button, Header } from 'semantic-ui-react'



class ProcessList extends Component {

    render(){
      const trigger = <Card color='teal' className="showimg" fluid>
                        <Image src={this.props.photo}  size='medium'/>
                      </Card>

      return(
        <>
          <Modal size="mini" basic  trigger={trigger}>
          <center>
              <Card className="showmodal">
                <Image wrapped size='medium' src={this.props.photo} />
                <Header>{this.props.title}</Header>
              </Card>
              <Button circular onClick={()=> this.props.reset(this.props.id)}>Delete</Button>
            </center>
          </Modal><br />
        </>
      )
    }
}

export default ProcessList
