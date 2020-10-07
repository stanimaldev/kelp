import React, {useState} from "react";
import './SearchBar.css';

// Auto location populator


export default function SearchBar(props) {
    const [term, setTerm] = useState('');
    const [location, setLocation] = useState('');
    const [sortBy, setSortBy] = useState('best_match');

    const sortByOptions = {
        'Best Match': 'best_match',
        'Highest Rated': 'rating',
        'Most Reviewed': 'review_count'
    }
    
    const getSortByClass = (sortByOption) => {
        return sortBy === sortByOption ? 'active' : '';
    };

    const handleSortByChange = (sortByOption) => {
        setSortBy(sortByOption);
        // console.log(sortByOption);
        if (term && location) {
            console.log(`sort option changed to ${sortByOption}`);
            handleSearch();
            // makeshift bandaid fix to the "needing to double click sorting options for it to load new results with different sorting option applied"
            // setTimeout(() => {
            //     handleSearch();
            // }, 0);
        }
    };

    const handleTermChange = (e) => {
        setTerm(e.target.value)
        // Yelp.autoComplete(event.target.value, this.autoLocate().latitude, this.autoLocate().longitude);
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleSearch = () => {
        // Form Validation Warning
        if (!term || !location) {
            let warningContainer = document.createElement('div');
            let warning = document.createElement('p');
            let belowSubmitButton = document.querySelector('.SearchBar-submit');
            warningContainer.setAttribute('style', 'display: flex; justify-content: center; position: absolute; width: 100%; margin-top: 35px;')
            warning.textContent = "Must fill in all fields! 🧐";
            warning.style.cssText = "color: white; background: red; width: 300px; padding: 7px; border-radius: 7px; opacity: 0.9; display: flex; justify-content: center; font-size: 1.1rem";
            warningContainer.append(warning);
            belowSubmitButton.append(warningContainer);
            setTimeout(() => {
                belowSubmitButton.removeChild(warningContainer);
            }, 5000);
        } else {
            props.searchYelp(term, location, sortBy);
        }
    }

    const renderSortByOptions = () => {
        // console.log(sortByOptions)
        return Object.keys(sortByOptions).map(sortByOption => {
            let sortByOptionValue = sortByOptions[sortByOption];
            return (<li 
                        key={sortByOptionValue} 
                        className={getSortByClass(sortByOptionValue)} 
                        onClick={() => handleSortByChange(sortByOptionValue)}
                    >
                        {sortByOption}
                    </li>)
        })
        // return Object.keys(this.sortByOptions).map(sortByOption => {
    //         let sortByOptionValue = this.sortByOptions[sortByOption];
    //         return <li key={sortByOptionValue} className={this.getSortByClass(sortByOptionValue)} onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>{sortByOption}</li>
    //     });
    }

    const enterSearch = (e) => {
        e.preventDefault();
        if (e.keyCode === 13) {
            handleSearch();
        }
    }


    return (
        <div className="SearchBar">
            <div className="SearchBar-sort-options">
                <ul>
                    {renderSortByOptions()}
                </ul>
            </div>
            <div className="SearchBar-fields">
                <input className="termInput" 
                    onChange={handleTermChange} 
                    placeholder="Search Businesses"
                    onKeyUp={enterSearch}
                />
                <input className="locationInput" 
                    onChange={handleLocationChange} 
                    placeholder="Where?" 
                    onKeyUp={enterSearch} 
                    value={location ? location : ''}
                />
            </div>
            <div className="SearchBar-submit" >
                <button onClick={handleSearch}>Let's Go</button>
            </div>
        </div>
    ) 
}









// OLD CLASS BASED COMPONENT:

// class SearchBar extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {term: '', location: '', sortBy: 'best_match'};
    //     this.sortByOptions = {
    //         'Best Match': 'best_match',
    //         'Highest Rated': 'rating',
    //         'Most Reviewed': 'review_count'
    //     };
    //     this.handleTermChange = this.handleTermChange.bind(this);
    //     this.handleLocationChange = this.handleLocationChange.bind(this);
    //     this.handleSortByChange = this.handleSortByChange.bind(this);
    //     this.handleSearch = this.handleSearch.bind(this);
    //     this.enterSearch = this.enterSearch.bind(this);
    // };
    
    // getSortByClass(sortByOption) {              /* This returns CSS class for providing visual feedback to users */
    //     return this.state.sortBy === sortByOption ? 'active' : '';
    // };

    // handleSortByChange(sortByOption, event) {          /* This sets the state of a sorting option for communicating with Yelp API */
    //     this.setState({sortBy: sortByOption});
    //     console.log(sortByOption)
    //     if (this.state.term && this.state.location) {
    //         console.log(`sort option changed to ${sortByOption}`)
    //         this.handleSearch();
    //         // ghetto bandaid fix to the "needing to double click sorting options for it to load new results with different sorting option applied"
    //         setTimeout(() => {
    //             this.handleSearch();
    //         }, 0);
    //     }
    // };

    // handleTermChange(event) {
    //     this.setState({term: event.target.value});
    //     // Yelp.autoComplete(event.target.value, this.autoLocate().latitude, this.autoLocate().longitude);
    // };

    // handleLocationChange(event) {

    //     this.setState({location: event.target.value});
    // };

    // // componentDidMount() {
    // //     const coors = navigator.geolocation.getCurrentPosition(function(position) {
    // //         // console.log(position)
    // //         console.log(position.coords.latitude + ', ' + position.coords.longitude)
    // //         return position.coords.latitude + ', ' + position.coords.longitude
    // //     })
    // //     console.log(this.state.location)
    // //     console.log(coors)
    // //     this.setState({location: coors})
    // // }

    // handleSearch(event) {

    //     // loading animation take 1:
    //     // let loading = document.querySelector('.SearchBar-submit');
    //     // let p = document.createElement('p');
    //     // p.textContent = "LOADING...";
    //     // p.style.cssText = "position: absolute; top: 67%; left: 50%; margin-left: -40px; margin-top: -50px; z-index: -1;"
    //     // loading.append(p);

    //     if (!this.state.term || !this.state.location) {
    //         let headsupContainer = document.createElement('div');
    //         let headsup = document.createElement('p');
    //         let belowSubmitButton = document.querySelector('.SearchBar-submit');
    //         headsupContainer.setAttribute('style', 'display: flex; justify-content: center; position: absolute; width: 100%; margin-top: 35px;')
    //         headsup.textContent = "Must fill in all fields! 🧐";
    //         headsup.style.cssText = "color: white; background: red; width: 300px; padding: 7px; border-radius: 7px; opacity: 0.9; display: flex; justify-content: center; font-size: 1.1rem";
    //         headsupContainer.append(headsup)
    //         belowSubmitButton.append(headsupContainer);
    //         setTimeout(() => {
    //             belowSubmitButton.removeChild(headsupContainer);
    //         }, 5000);
    //     } else {
    //         this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
    //     }
    //     // document.querySelector('.termInput').value = ""
    //     // document.querySelector('.locationInput').value = ""
    //     // event.preventDefault();
    // };

    // renderSortByOptions() {
    //     return Object.keys(this.sortByOptions).map(sortByOption => {
    //         let sortByOptionValue = this.sortByOptions[sortByOption];
    //         return <li key={sortByOptionValue} className={this.getSortByClass(sortByOptionValue)} onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>{sortByOption}</li>
    //     });
    // };

    // enterSearch(event) {
    //     if (event.keyCode === 13) {
    //         this.handleSearch();
    //         event.preventDefault();
    //     }
    // };

    // render() {

        // let locationInput = document.querySelector('.locationInput');
        // if (this.state.location) {
        //     console.log(locationInput.value)
        // }
        // if (this.state.location) {
        //     console.log(this.state.location)
        // }

        // return (
        //     <div className="SearchBar">
        //         <div className="SearchBar-sort-options">
        //             <ul>
        //                 {this.renderSortByOptions()}
        //             </ul>
        //         </div>
        //         <div className="SearchBar-fields">
        //             <input className="termInput" onChange={this.handleTermChange} placeholder="Search Businesses" onKeyUp={this.enterSearch}/>
        //             <input className="locationInput" onChange={this.handleLocationChange} placeholder="Where?" onKeyUp={this.enterSearch} value={this.state.location ? this.state.location : ''}/>
        //         </div>
        //         <div className="SearchBar-submit" >
        //             <button onClick={this.handleSearch}>Let's Go</button>
        //         </div>
        //     </div>
        // )
    // }
// }

// export default SearchBar;