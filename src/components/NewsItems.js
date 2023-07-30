import React, { Component } from "react";

export default class NewsItems extends Component {
  render() {
    let { title, description, imageurl, newsurl, author, date, source } = this.props;
    return (
      <div className="container my-3">
      <div className="card mr-5" >
       <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        position: 'absolute',
        right: '0'
    }
    }> 
  
          <span className="badge rounded-pill bg-danger"style={{left:'90%' , zIndex:'1'}}> {source}</span>
          </div>
          <img src={
              !imageurl ? "https://cdn2.vectorstock.com/i/1000x1000/14/76/top-headlines-news-themem-background-vector-21151476.jpg": imageurl
            } className="card-img-top" alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>

            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {!author ? "UnKnown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a rel="norferrer" href={newsurl} target="_blank" className="btn btn-sm btn-dark">READ MORE</a>
          </div>
        </div>
        </div>
     
    );
  }
}
