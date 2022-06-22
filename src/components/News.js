import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country : 'in',
    pageSize : 8,
    category:' general'
  }
  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string
  }
    articles  = [
        {
          "source": { "id": null, "name": "New York Times" },
          "author": "Marc Santora, Ivan Nechepurenko, Anton Troianovski",
          "title": "Live Updates: Biden and Russia-Ukraine War News - The New York Times",
          "description": "As more Ukrainian fighters surrendered in Mariupol, Moscow appeared to be laying the groundwork for annexing lands it has seized. President Biden met with the leaders of Finland and Sweden at the White House.",
          "url": "https://www.nytimes.com/live/2022/05/19/world/russia-ukraine-war",
          "urlToImage": "https://static01.nyt.com/images/2022/05/19/world/19ukraine-blog-header-625am-est/19ukraine-blog-header-625am-est-facebookJumbo.jpg",
          "publishedAt": "2022-05-19T14:35:00Z",
          "content": "LONDON After sanctions hobbled production at its assembly plant in Kaliningrad, the Russian automaker Avtotor announced a lottery for free 10-acre plots of land and the chance to buy seed potatoes so… [+9048 chars]"
        },
        {
          "source": { "id": "the-washington-post", "name": "The Washington Post" },
          "author": "Min Joo Kim",
          "title": "N. Korea readying ICBM or nuclear test for Biden visit, officials say - The Washington Post",
          "description": "The provocation would also come as North Korea struggles with an escalating coronavirus outbreak among its vulnerable, largely unvaccinated population.",
          "url": "https://www.washingtonpost.com/world/2022/05/19/north-korea-nuclear-missile-test-biden/",
          "urlToImage": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/FNXNAHGTGUI6ZCDL353BQPJDH4.jpg&w=1440",
          "publishedAt": "2022-05-19T14:07:00Z",
          "content": "Placeholder while article actions load\r\nSEOUL North Korea is preparing to conduct a nuclear test or a long-range ballistic missile test around the time of President Bidens trip to the region this wee… [+3331 chars]"
        },
        {
          "source": { "id": "usa-today", "name": "USA Today" },
          "author": "John Bacon and Celina Tebor, USA TODAY",
          "title": "Ukraine live updates: Russian superyacht triggers court battle in Fiji - USA TODAY",
          "description": "An appeals court in Fiji could soon determine the fate of a Russian-owned superyacht seized by U.S. authorities. Ukraine live updates.",
          "url": "https://www.usatoday.com/story/news/politics/2022/05/19/ukraine-russia-invasion-live-updates/9834071002/",
          "urlToImage": "https://www.gannett-cdn.com/presto/2022/05/16/USAT/a8119e91-f1f8-40a4-a308-e671afe73059-AP_Russia_Ukraine_War.jpg?auto=webp&crop=4999,2812,x1,y482&format=pjpg&width=1200",
          "publishedAt": "2022-05-19T14:05:10Z",
          "content": "The fate of a Russian-owned, $300 million superyacht seized by U.S. authorities in Fiji could soon be determined by an appeals court there.\r\nThe court heard arguments Wednesday from the U.S. Justice … [+5843 chars]"
        },
    {
      "source": { "id": "the-washington-post", "name": "The Washington Post" },
      "author": "Andrew Jeong",
      "title": "Why Biden is using the Defense Production Act for the baby formula shortage - The Washington Post",
      "description": "The White House’s use of a Cold War-era law reflects the magnitude of the supply crunch that has left many parents scrambling for formula.",
      "url": "https://www.washingtonpost.com/politics/2022/05/19/baby-formula-shortage-defense-production-act/",
      "urlToImage": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/WTHDXYGXBYI6ZPQXFBQWJF2MKQ.jpg&w=1440",
      "publishedAt": "2022-05-19T13:33:18Z",
      "content": "The Biden administration on Wednesday invoked a wartime tool, the Defense Production Act, in an effort to address the nationwide shortage of baby formula. Its use of the law, which Congress passed in… [+762 chars]"
    }
    ]
    capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props){
        super(props);
        console.log("Hello I am a constructor");
        this.state = {
            articles : this.articles,
            loading : false,
            page : 1
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
    }
   async  updateNews(pageNo) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4cf01afecfe94a9184a43629c5a43290&page=1&pageSize=${this.props.pageSize}`
      this.setState({loading: true})
      let data = await fetch(url);
      let parseData = await data.json()
      console.log(parseData);
      this.setState({
        articles: parseData.articles,
        totalResults: parseData.totalResults,
        loading : false
      })
      }
    
   async componentDidMount(){
    this.updateNews();
   }
    handlePrevClick = async() => {
      this.setState({
        page : this.state.page - 1
      });
      this.updateNews();

    }

    handleNextClick = async() => {
    
        this.setState({
          page : this.state.page + 1
        })
        this.updateNews();
      }
 
    

  render() {
    return (
        <div className='container my-3'>
          <h1 className="text-center">NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
         {this.state.loading &&  <Spinner/>}
            <div className="row">
                {!this.state.loading && this.state.articles.map((element)=>{
                   return <div className="col-md-4" key={element.url}>
                      <NewsItem title={element.title ? element.title : ""}  description={element.description ? element.description : ""}  imageUrl={element.urlToImage}  newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                     
                      </div>    
                })}
                
            </div>
            <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <= 1}type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
         
        </div>
    )
  }
}

export default News