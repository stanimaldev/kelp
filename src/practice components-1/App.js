import React from 'react';
import ReactDOM from 'react-dom';
import Yelp from '../../util/Yelp';
import SearchBar from '../SearchBar/SearchBar';
import BusinessList from '../BusinessList/BusinessList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {businesses: []}
    this.searchYelp = this.searchYelp.bind(this)
  };

  searchYelp(term, location, sortBy) {
    Yelp.search(term, location, sortBy).then(businesses => {
      this.setState({businesses: businesses});
    });
  };

  render() {
    return(
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar searchYelp={this.searchYelp}/>
        <BusinessList businesses={this.state.businesses}/>
      </div>
    );
  }
}

export default App;