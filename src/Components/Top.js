import React, { Component } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'



class Top extends Component {

  render(){
    return (
       <Menu>
        <Link to="/home" >
          <Menu.Item name='home'>
              Home
          </Menu.Item>
        </Link>

        <Link to={`/gallery`}>
          <Menu.Item name='gallery' >
            Gallery
          </Menu.Item>
        </Link>

          <Menu.Item name='current projects'>
            <Dropdown item text='Current Projects'>
              <Dropdown.Menu>
                {this.props.projects.map(project => (
                  <Link key={project.id}  refresh="true" to={`/show/${project.id}`}>
                    <Dropdown.Item key={project.id} onClick={()=>this.props.dropDown(project.id)}>{project.title}</Dropdown.Item>
                  </Link>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>

          <Menu.Item>
          <h1> FabFolio: </h1>
          </Menu.Item>
          <Menu.Item><h4> A Fabricator's Portfolio </h4></Menu.Item>

        <Menu.Menu position='right'>
          {
            this.props.currentUser &&
            <Menu.Item
              float='right'
              name='logout'>
              {`Welcome ${this.props.currentUser.username}`}
            </Menu.Item>
          }
          <Link to="/profile">
            <Menu.Item name='profile'>
                Profile
            </Menu.Item>
          </Link>

          <Link to="/login">
            {
              this.props.currentUser ?
              <Menu.Item
                float='right'
                name='logout'
                onClick={this.props.handleLogout}>
                Logout
              </Menu.Item>
              :
              <Menu.Item
              float='right'
              name='login'>
              Login
              </Menu.Item>
            }
          </Link>

        </Menu.Menu>
        </Menu>
    )
  }
}

export default withRouter(Top)
