import React, {useState} from "react";
import './SearchBar.css';


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
