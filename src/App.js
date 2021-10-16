import axios from 'axios';
import './App.css';

import React, { PureComponent } from 'react'

class App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      selected : 'fish',
      list : [],
      thumbnail : []
    }
  }

  componentDidMount(){
    this.fetch_data();
  }

  fetch_data = ()=>{
    axios.get(`http://localhost:4001/${this.state.selected}`)
    .then(response=>{
      this.setState({
        ...this.state,
        list:response.data,
        thumbnail : response.data
      },()=>{console.log(this.state.list)})
    });
  }
  
  ondragstart=(event , link)=>{
    console.log(`drag started on ${link}`);
    event.dataTransfer.setData('link',link)
  }

  onDragOver = (event)=>{
    event.preventDefault();
  }

  onAdd = (event, action)=>{
    let link = event.dataTransfer.getData('link');

    let thumbnailadding = this.state.thumbnail;
      let check = this.state.thumbnail.find(linkobj=>linkobj.small===link);
      if(!check){
        thumbnailadding.push({
          full : link,
          small : link
        })
      }
      this.setState({
        ...this.state,
        thumbnail : thumbnailadding
      },()=>{this.forceUpdate()});
  }

  onDrop = (event, action)=>{
    let link = event.dataTransfer.getData('link');
    //console.log('dropped',link,action);
      let thumbnailcopy = this.state.thumbnail.filter(linkobj=>{
        //filtering out the removed link
        if(linkobj.small != link ){
          return linkobj
        }
      })
      //console.log(thumbnailcopy);
      this.setState({
        ...this.state,
        thumbnail : thumbnailcopy
      },()=>{console.log('removed')});

    //adding element after checking for copy in thumbnail

  }


  render() {
      var categories = ['fish', 'aeroplane', 'waterfall','beaches','cities', 'flowers', 'galaxies','rockets',
    'hillstation','cars'];
    var Categories_deploy = categories.map(category =>{
      return <li onClick={()=>{
                    this.setState({
                      ...this.state,
                      selected:category
                    },()=>{this.fetch_data()})
                  }} key={category}>
        {category}
        </li>;
    })
    return (
      <div className="App">
      <h1>Carosal</h1>
      <div className='body'>
        <div className='side_bar'>
          <div className='categories'>
            <p>Categories</p>
            <ul>
              {Categories_deploy}
            </ul>
          </div>
          <div className='files' onDragOver={(event)=>{this.onDragOver(event)}} onDrop={(event)=>{this.onDrop(event, 'remove')}}>
            <p>Files</p>
            <ul>
              {
                this.state.list.map(link=>{
                  return <li draggable onDragStart={(event)=>{this.ondragstart(event, link.small)}} key={link.full}>{link.full.substr(34,13)}</li>
                })
              }
            </ul>
          </div>
        </div>

        <div className='main_area'>
          <div className='carousal_diaplay'>
                
                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                  <div className="carousel-inner">
                    <div key='default' className="carousel-item active">
                      <img className="d-block" src="https://images.unsplash.com/photo-1519074031893-210d39bd3885?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb" alt="First slide"/>
                    </div>
                    {this.state.thumbnail.map(link=>{
                      return  <div className="carousel-item">
                                <img key={link.full} className="d-block " src={link.full} alt="carousel image"/>
                              </div>
                    })}
                  </div>
                  <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
                
          </div>
          <div className='thumbnails' onDragOver={(event)=>{this.onDragOver(event)}} onDrop={(event)=>{this.onAdd(event, 'add')}}>
            {
              this.state.thumbnail.map(link=>{
                return  <div draggable key={link.small} onDragStart={(event)=>{this.ondragstart(event, link.small)}} className='thumb'>
                          <img src={link.small} className='thumb_image'></img>
                          <p role='imgName'>{link.full.substr(34,13)}</p>
                        </div>
              })
            }
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default App