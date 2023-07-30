import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Loading from "./Loading";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component { 
  static defaultProps={
    country:'in',
    pageSize:6,
    category:'general'

  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }
  capitalizeFirstLetter =(string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      Loading: true,
      page: 1,
      totalResults:0
    };
    document.title= `${this.capitalizeFirstLetter(this.props.category)}-TopNews`
    
  }
    async updateNews(){
      this.props.setProgress(10)
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=ff5f98d4b466435d9c6495dad1f7ed2a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({
        Loading:true
      })
      let data = await fetch(url);
      this.props.setProgress(30)
      let parseddata = await data.json();
      this.props.setProgress(70)
      this.setState({
        articles: parseddata.articles,
        totalResults: parseddata.totalResults,
        Loading:false
      });
      this.props.setProgress(100)

    }
  async componentDidMount() {
    this.updateNews()

  }
  fetchMoreData = async () => {
    
    
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=ff5f98d4b466435d9c6495dad1f7ed2a&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({page:this.state.page+1})

    let data = await fetch(url);
    let parseddata = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseddata.articles),
      totalResults: parseddata.totalResults,
      Loading:false
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{margin:'35px 0px',marginTop:'90px'}}>Indian Express - Top {this.capitalizeFirstLetter(this.props.category)} HeadLines</h1>
       {this.state.Loading&& <Loading/>}
       <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Loading/>}
          >
         
         <div className="container>">

           <div className="row">
             {this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
                
                <NewsItems  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageurl={element.urlToImage}
                  newsurl={element.url} date={element.publishedAt} author={element.author}
                  source={element.source.name} />      
                  </div>              
                 })}
             </div>
             </div>
             
        </InfiniteScroll>


      </>       
    
      )

  }
}


export default News;
