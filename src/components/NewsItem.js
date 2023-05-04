import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {

    let {title,desc,imgUrl,newsUrl} = this.props;

    return (
      <div>
        <div className="card my-2 mx-2 text-center">
          <img src={imgUrl ? imgUrl : "https://i.pinimg.com/originals/4e/a9/81/4ea98108e0dd10a1dc417a24e32232e2.png"} className="card-img-top" alt="..." style={{
            width: "286px",
            height: "175px",
            objectFit: "cover"
          }} />
          <div className="card-body">
            <h5 className="card-title">{title?title.slice(0,50):""}...</h5>
            {/* <h5 className="card-title">{title ? title : ""}...</h5> */}
            <p className="card-text">{desc?desc.slice(0,100):""}...</p>
            {/* <p className="card-text">{desc ? desc : ""}...</p> */}
            <a rel="noreferrer"  href={newsUrl} target="_blank" className="btn btn-primary">Read more</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem