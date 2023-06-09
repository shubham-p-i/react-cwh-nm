import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
  constructor() {
    super();
    console.log("Im super in news comp.");

    this.state = {
      loading: true,
      articles: [],
      page: 1,
    };
  }

  async componentDidMount() {
    let response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=23a9ff7dca9a4c879fc6ff9b22196288&page=1&pageSize=${this.props.pageSize}`
    );

    let parsedData = await response.json();

    this.setState({
      loading: false,
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }

    handleNavigation = async (e) => {
      if (e.target.name === "next") {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

          this.setState({loading: true});

          let response = await fetch(
            `https://newsapi.org/v2/top-headlines?country=in&apiKey=23a9ff7dca9a4c879fc6ff9b22196288&page=${
              this.state.page + 1
            }&pageSize=${this.props.pageSize}`
          );

          let parsedData = await response.json();

          this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading: false
          });
        }
      } else if (e.target.name === "previous") {

        this.setState({loading: true});

        let response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=in&apiKey=23a9ff7dca9a4c879fc6ff9b22196288&page=${
            this.state.page - 1
          }&pageSize=${this.props.pageSize}`
        );
        let parsedData = await response.json();

        this.setState({
          page: this.state.page - 1,
          articles: parsedData.articles,
          loading: false
        });
      }
    };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center my-4">- India Top Headlines -</h1>
        { this.state.loading && <Spinner/>}
        <div className="row">
          { !this.state.loading && this.state.articles.map((ele) => {
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
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
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