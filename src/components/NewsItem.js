import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
     let {title, description, imageUrl,newsUrl, author, date, source} = this.props;
    return (
      <div className="my-3">
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex: '1'}}> {source} </span> 
          <img src={!imageUrl ? "https://www.hindustantimes.com/india-news/few-feared-trapped-in-j-k-s-ramban-as-under-construction-tunnel-collapses-101653005353560.html" : imageUrl} className="card-img-top" alt="..." />
          
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
             {description}
            </p>
            <p className="card-text"><small class="text-muted">By {!author?"Unknown": author} on {date}</small></p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
