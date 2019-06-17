import React, { Component } from 'react'
import { Header, Grid } from 'semantic-ui-react'

import Gallery from '../Components/Gallery'

var slideIndex = 1;

class MainGallery extends Component {

state= {
  slideIndex: 1
}

plusSlides = (n) => {
  return this.showSlides(this.slideIndex += n);
  console.log("plus");
}

currentSlide(n) {
  return this.showSlides(this.slideIndex = n);
  console.log("minus");
}

showSlides(slideIndex) {
  // var i;
  let slides = this.props.projects
  let dots = document.getElementsByClassName("dot");
  if (slideIndex > slides.length) {this.setState({slideIndex: 1})}
  if (slideIndex < 1) {this.setState({slideIndex: slides.length})}
  for (let i = 0; i < slides.length; i++) {
    return  slides[i].style.display = "none";
  }
  for (let i = 0; i < dots.length; i++) {
    return dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

  render(){

    return(
    <>

      <div className="shadow gallery">
        <Header className="text" inverted color='grey' textAlign="center" as='h2'>Photo Gallery</Header>
          <Grid columns={5} padded className="cards">
          <a class="prev" onclick={()=>this.plusSlides(-1)}>&#10094;</a>
          {this.props.projects.slice(0, 8).map(project =>(
             <Gallery key={project.id} photo={project.finished_image} title={project.title} details={project.details} finished_image={project.finished_image} projectId={project.id} research={this.props.research} toDoList={this.props.toDoList} allNotes={this.props.allNotes} materials={project.inventories}
             date={new Date(project.updated_at)}/>
          ))}
          <a class="next" onclick="plusSlides(1)">&#10095;</a>
        </Grid>
        <div>
          <center>
            <span class="dot" onclick="currentSlide(1)"></span>
            <span class="dot" onclick="currentSlide(2)"></span>
            <span class="dot" onclick="currentSlide(3)"></span>
          </center>
        </div>
      </div>




      </>
    )
  }
}

export default MainGallery
// <div class="slideshow-container">
//
// <div class="mySlides fade">
//   <div class="numbertext">1 / 3</div>
//   <img src="img_nature_wide.jpg" style="width:100%">
//   <div class="text">Caption Text</div>
// </div>
//
// <div class="mySlides fade">
//   <div class="numbertext">2 / 3</div>
//   <img src="img_snow_wide.jpg" style="width:100%">
//   <div class="text">Caption Two</div>
// </div>
//
// <div class="mySlides fade">
//   <div class="numbertext">3 / 3</div>
//   <img src="img_mountains_wide.jpg" style="width:100%">
//   <div class="text">Caption Three</div>
// </div>
//
// <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
// <a class="next" onclick="plusSlides(1)">&#10095;</a>
//
// </div>
// <br>
//
// <div style="text-align:center">
//   <span class="dot" onclick="currentSlide(1)"></span>
//   <span class="dot" onclick="currentSlide(2)"></span>
//   <span class="dot" onclick="currentSlide(3)"></span>
// </div>
//
// <div className="shadow gallery">
//   <Header className="text" inverted color='grey' textAlign="center" as='h2'>Photo Gallery</Header>
//     <Grid columns={5} padded className="cards">
//     {this.props.projects.slice(0, 16).map(project =>(
//        <Gallery key={project.id} photo={project.finished_image} title={project.title} details={project.details} finished_image={project.finished_image} projectId={project.id} research={this.props.research} toDoList={this.props.toDoList} allNotes={this.props.allNotes} materials={project.inventories}
//        date={new Date(project.updated_at)}/>
//     ))}
//   </Grid>
// </div>
