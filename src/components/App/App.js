import React, {useState, useEffect, useRef} from 'react';
import kelp from '../../kelp.png';
import './reset.css'
import './App.css';
import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';
import Yelp from '../../util/Yelp'
import Map from '../Map/Map';
import Loader from '../Loader/Loader';
import { useSelector } from 'react-redux';


export default function App() {
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [clickedBusiness, setClickedBusiness] = useState();
  const [windowSmall, setWindowSmall] = useState(false);
  
  const globalState = useSelector(state => state);
  
  function searchYelp(term, location, sortBy) {
    setIsLoading(true);

    Yelp.search(term, location, sortBy).then(businesses => {
      setBusinesses([]);

      if (!businesses || businesses.length < 1) {
        let p = document.createElement('p');
        let noresults = document.querySelector('.noresults');
        p.textContent = "No results found! 😱😢";
        p.style.cssText = "color: white; background: red; padding: 10px; border-radius: 4px; text-align: center; width: 300px; font-size: 1.3rem";
        noresults.append(p);
        // console.log("NOTHING FOUND!");
        setTimeout(() => {
          noresults.removeChild(p);
        }, 5000);
      } else {
        setBusinesses([...businesses]);
      }
    });
      // console.log(`Searching Yelp with ${term}, ${location}, ${sortBy}`)
  };

  useEffect(() => {
    if (businesses) {
      setIsLoading(false);
    }
  }, [businesses, setIsLoading])


  const toggleSearchResultsWidth = () => {
    setMapOpen(mapOpen => !mapOpen);
    // console.log(mapOpen);
  }

  // const [bizId, setBizId] = useState();

  const clickOnBusiness = (coordinates) => {
    setClickedBusiness(coordinates);
  }


  
  const prevBizDiv = useRef();
  
  useEffect(() => {
    let bizToHighlight = document.getElementById(globalState.currentMarker)
    if (bizToHighlight) {
      // console.log(bizToHighlight)
      bizToHighlight.classList.add("activeBiz");
      bizToHighlight.scrollIntoView({block: 'start', inline: 'start', behavior: "smooth"});
      // console.log(prevBizDiv.current)
    }
    if (prevBizDiv.current && prevBizDiv.current !== bizToHighlight) {
      prevBizDiv.current.classList.remove("activeBiz");
    }
    prevBizDiv.current = bizToHighlight;
    // if (currentBizDiv.current !== bizToHighlight) {
    //   currentBizDiv.current.classList.toggle("active");
    // }
}, [globalState.currentMarker])


  useEffect(() => {
    window.addEventListener('resize', function() {
        // console.log(window.innerWidth);
        // console.log(document.documentElement.clientWidth)
        let viewPortWidth = window.innerWidth || document.documentElement.clientWidth;
        if (viewPortWidth < 900) {
          setWindowSmall(true)
        } if (viewPortWidth > 900){
          setWindowSmall(false);
        }
        // console.log(windowSmall);
    })
  }, [windowSmall])

  const BusinessListWidth = mapOpen && !windowSmall ? {width: "50%"} : {width: "100%"};

  // const mapOpenStyle = mapOpen ? {visibility: "visible", width: "45%"} : {visibility: "hidden", width: "0%", display: "none"};

  return (
    <div className="App">
      <h1 className="logo-container">
        {/* need to do "/" for vercel and netlify, "/kelp" for github pages because of their urls */}
        <a href="/" className="logo" style={{textDecoration: 'none', color: "white"}}>
        {/* <a href="/kelp" className="logo" style={{textDecoration: 'none', color: "white"}}> */}
          <span>kelp</span>
          <img src={kelp} alt="kelp logo" height="30px"/>
        </a>
      </h1>
      <SearchBar searchYelp={searchYelp}/>
      <div className="noresults" style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '30px', position: 'absolute'}}></div>
      {/* <div className="mapButtContainer">
        <button className="mapButton" onClick={this.handleClick}>{buttonStatus}</button>
      </div> */}


      <div id="mapComponent" className="sticky">
          <Map onClick={toggleSearchResultsWidth} businesses={businesses} clickedBusiness={clickedBusiness}/>
      </div>
      
      <div style={BusinessListWidth} className="BizListContainer">
        {isLoading ? 
          <div className="loader">
            {/* <img src="https://miro.medium.com/max/700/1*CsJ05WEGfunYMLGfsT2sXA.gif" alt="icon" />
            <p>LOADING...</p> */}
            <Loader style={{display: 'flex', alignItems:"center", justifyContent: "center"}}/>
          </div>
        : <BusinessList businesses={businesses} clickOnBusiness={clickOnBusiness}
          />
        }
      </div>

    </div>
  );
}
