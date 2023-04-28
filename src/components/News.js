import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  constructor(){
    super();
    console.log("Im super in news comp.");

    this.state = {
      articles : [],
      page : 1
    }

  }

  async componentDidMount(){

    let response = await fetch("https://newsapi.org/v2/top-headlines?country=in&apiKey=23a9ff7dca9a4c879fc6ff9b22196288&page=1&pageSize=20");

    let parsedData = await response.json();
  
    this.setState({articles:parsedData.articles});
  }

  handleNavigation = async (e) =>{
    console.log("e.target.name --> ",e.target.name);
    if(e.target.name === "next"){

      this.setState({
        page : this.state.page + 1
      })

      let response = await fetch( `https://newsapi.org/v2/top-headlines?country=in&apiKey=23a9ff7dca9a4c879fc6ff9b22196288&page=${this.state.page}&pageSize=20`);

      let parsedData = await response.json();
    
      this.setState({articles:parsedData.articles});
    }
    else if(e.target.name === "previous"){

      this.setState({
        page : this.state.page - 1
      })

      let response = await fetch( `https://newsapi.org/v2/top-headlines?country=in&apiKey=23a9ff7dca9a4c879fc6ff9b22196288&page=${this.state.page}&pageSize=20`);

      let parsedData = await response.json();
    
      this.setState({articles:parsedData.articles});
    }

  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="">LATEST NEWS</h1>

        <div className="row">
          {this.state.articles.map((ele)=>{
           return <div className="col-md-3" key={ele.url}>
            <NewsItem title={ele.title} desc={ele.description} imgUrl={ele.urlToImage} newsUrl={ele.url}/>
          </div>
          })}
        </div>
          <hr/>
        <div className="container d-flex justify-content-evenly mx-3">
          <button  name="previous" type="button" className="btn btn-dark" onClick={this.handleNavigation}>&larr; Previous</button>
          <button  name="next" type="button" className="btn btn-dark" onClick={this.handleNavigation}>Next &rarr;</button>
        </div>


      </div>
    )
  }
}

export default News