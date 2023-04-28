import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  constructor() {
    super();
    console.log("Im super in news comp.");

    this.state = {
      articles: [],
      page: 1,
    };
  }

  async componentDidMount() {
    let response = await fetch(
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=23a9ff7dca9a4c879fc6ff9b22196288&page=1&pageSize=20"
    );

    let parsedData = await response.json();

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }

    handleNavigation = async (e) => {
      if (e.target.name === "next") {
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
        } else {
          let response = await fetch(
            `https://newsapi.org/v2/top-headlines?country=in&apiKey=23a9ff7dca9a4c879fc6ff9b22196288&page=${
              this.state.page + 1
            }&pageSize=20`
          );

          let parsedData = await response.json();

          this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
          });
        }
      } else if (e.target.name === "previous") {
        let response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=in&apiKey=23a9ff7dca9a4c879fc6ff9b22196288&page=${
            this.state.page - 1
          }&pageSize=20`
        );
        let parsedData = await response.json();

        this.setState({
          page: this.state.page - 1,
          articles: parsedData.articles,
        });
      }
    };

  render() {
    return (
      <div className="container my-3">
        <h1 className="">LATEST NEWS</h1>

        <div className="row">
          {this.state.articles.map((ele) => {
            return (
              <div className="col-md-3" key={ele.url}>
                <NewsItem
                  title={ele.title}
                  desc={ele.description}
                  imgUrl={ele.urlToImage}
                  newsUrl={ele.url}
                />
              </div>
            );
          })}
        </div>
        <hr />
        <div className="container d-flex justify-content-evenly mx-3">
          <button
            disabled={this.state.page <= 1}
            name="previous"
            type="button"
            className="btn btn-dark"
            onClick={this.handleNavigation}
          >
            &larr; Previous
          </button>
          <button
            disabled={this.state.page <= 1?false:true}
            name="next"
            type="button"
            className="btn btn-dark"
            onClick={this.handleNavigation}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News