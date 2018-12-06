import React from 'react';
import Pagination from './Pagination';
import './Pagination/index.css';
import SearchInput  from '../Coins/SearchInput';
import Span  from '../Price/CoinAmount/ErrorSpan';

class NewsComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            search: '',
            articles: [],
            filteredArticles: [],
            pageOfItems: [],
            pager: { pager: {} },
            isValid: true
        };
    }
    componentDidMount() {
        fetch('https://min-api.cryptocompare.com/data/v2/news/?lang=EN')
            .then(res => res.json())
            .then(posts => this.setState({
                articles: Object.keys(posts.Data).map(key => posts.Data[key]),
                filteredArticles: Object.keys(posts.Data).map(key => posts.Data[key])
            }));
    }

    onChangePage = pageOfItems => {
        this.setState({pageOfItems: pageOfItems});
    };
    
    // componentDidUpdate(prevProps, prevState) {
    // }
    filterListBySearchTerm = (list, searchTerm) => (
        list.filter(data => data.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    handleSearchChange = search => {
        const { articles } = this.state;
        const filteredArticles = this.filterListBySearchTerm(articles, search);
        if(filteredArticles.length <= 0){
            this.setState({
                isValid: false
            });
            return;
        };

        this.setState({
            isValid: true,
            search,
            filteredArticles
        });
    };
    handlePager = pager => {
        this.setState({ pager });
    };
    render() {
        const { search, filteredArticles, pageOfItems } = this.state;
        return (
            <div className="position-relative d-inline">
                {!this.state.isValid ? <Span>No results found for this query</Span> : null}
                <SearchInput value={ search } onChange={ this.handleSearchChange } />
                <div className="mycontainer">
                    <div className="text-center">
                        <h1>News</h1>
                        <Pagination
                            items={filteredArticles}
                            onChangePage={this.onChangePage}
                            handlePager={this.handlePager}
                            pager={this.state.pager}/>
                        <div className="posts">
                            {pageOfItems.map(post =>
                                <div key={post.id} className="post">
                                    <h2><a href={post.guid} target="_blank" rel="noopener noreferrer">{post.title}</a></h2>
                                    <div className="newsItem">
                                        <div className="newsImgBox">
                                            <img src={post.imageurl} alt=""/>
                                        </div>
                                        <div className="newsTestBox">
                                            <p>{new Date(post.published_on).toLocaleDateString()}</p>
                                            <p>{post.source}</p>
                                            <p>{post.body}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <h2>
                        -{this.state.pager.currentPage? this.state.pager.currentPage : null}-
                    </h2>
                </div>
            </div>
        );
    }
}

export default NewsComponent;