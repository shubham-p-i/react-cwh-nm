import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  constructor(){
    super();
    console.log("Im super in news comp.");

    this.state = {
      articles : []
    }

  }

  async componentDidMount(){

    let response = await fetch("https://newsapi.org/v2/top-headlines?country=in&apiKey=23a9ff7dca9a4c879fc6ff9b22196288");

    let parsedData = await response.json();
  
    this.setState({articles:parsedData.articles});
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
        <div class="container d-flex justify-content-evenly mx-3">
          <button type="button" class="btn btn-dark">&larr; Prevous</button>
          <button type="button" class="btn btn-dark">Next &rarr;</button>
        </div>


      </div>
    )
  }
}

export default News