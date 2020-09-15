import React, {useState, useEffect, useRef} from 'react';
import kelp from '../../kelp.png';
import './reset.css'
import './App.css';
import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';
import Yelp from '../../util/Yelp'
import Map from '../Map/Map';
import Loader from '../Loader/Loader';
// import MapButton from '../MapButton/MapButton';
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
        console.log("NOTHING FOUND!");
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


  // Map box sticky scroll attempt 1: 
  // useEffect(() => {
  //   // window.onload = function() {
  //     window.onscroll = function() {stickyMap()};
  
  //     // Get the header
  //     // var myMap = document.getElementById("mapComponent");
  //     let myMap = document.querySelector('.scrollThis');
  
  //     // Get the offset position of the navbar
  //     let sticky = myMap.offsetTop;
  
  //     // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
  //     function stickyMap() {
  //       if (window.pageYOffset > sticky) {
  //         myMap.classList.add("sticky");
  //         console.log("yoyoyo!")
  //       } else {
  //         myMap.classList.remove("sticky");
  //         console.log("up top!")
  //       }
  //     }
  //   // }
  // }, [])


  const toggleSearchResultsWidth = () => {
    setMapOpen(mapOpen => !mapOpen);
    // console.log(mapOpen);
  }

  const [bizId, setBizId] = useState();

  const clickOnBusiness = (coordinates) => {
    setClickedBusiness(coordinates);
  }


  
  // const usePrevious = (value) => {
  //   const ref = useRef();
  //   useEffect(() => {
  //     ref.current = value;
  //   });
  //   return ref.current;
  // }

  
  const prevBizDiv = useRef();
  
  useEffect(() => {
    let bizToHighlight = document.getElementById(globalState.currentMarker)
    if (bizToHighlight) {
      console.log(bizToHighlight)
      bizToHighlight.classList.add("activeBiz");
      bizToHighlight.scrollIntoView({behavior: "smooth"});
      console.log(prevBizDiv.current)
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
        <a href="/" className="logo" style={{textDecoration: 'none', color: "white"}}>
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



















// class App extends React.Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     businesses: [],
  //     isLoading: '',
  //     mapOpen: false,
  //     // mapLoaded: false
  //   }
  //   this.searchYelp = this.searchYelp.bind(this);
  //   // this.handleClick = this.handleClick.bind(this);
  // };


  // searchYelp(term, location, sortBy) {
  //   this.setState({isLoading: true})

  //   Yelp.search(term, location, sortBy).then(businesses => {
  //     this.setState({businesses: []})

  //     if (!businesses || businesses.length < 1) {
  //       let p = document.createElement('p');
  //       let noresults = document.querySelector('.noresults');
  //       p.textContent = "No results found! 😱😢";
  //       p.style.cssText = "color: white; background: red; padding: 20px; border-radius: 4px; text-align: center; width: 300px; font-size: 1.3rem";
  //       noresults.append(p);
  //       console.log("NOTHING FOUND!");
  //       setTimeout(() => {
  //         noresults.removeChild(p);
  //       }, 5000);
  //     } else {
  //       this.setState({businesses: businesses});
  //     }
  //   });
  //     // console.log(`Searching Yelp with ${term}, ${location}, ${sortBy}`)
  // };


  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.isLoading) {
  //     this.setState({isLoading: false})
  //   }
  // }


  /* GOOGLE MAP // LIFESAVER video: https://www.youtube.com/watch?v=W5LhLZqj76s (initMap is not a function error: because the script needs to look at the 'window' level. so at window.document.body.. etc. window.initMap = this.initMap)*/


  // renderMap = () => {
  //   loadScript("https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js");
  //   window.initMap = this.initMap;
  //   window.initMap();
  // };

  // initMap = () => {
  //   // var map = new window.google.maps.Map(document.getElementById('map'), {
  //   //   center: {lat: -33.8688, lng: 151.2195},
  //   //   zoom: 13
  //   // });
    
  //   console.log('initMap running')
  //   mapboxgl.accessToken = 'pk.eyJ1Ijoic3Rhbi1kZXYiLCJhIjoiY2tlYm9leWpjMGFpMjJ0cndybWdpbmVwMSJ9.I0CXw1DFG7WYKgyVm7x07A';
  //   var map = new mapboxgl.Map({
  //     container: 'map',
  //     style: 'mapbox://styles/mapbox/streets-v11',
  //     center: [-96, 37.8],
  //     zoom: 3
  //   });

  //   var geojson = {
  //     type: 'FeatureCollection',
  //     features: [{
  //       type: 'Feature',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [-77.032, 38.913]
  //       },
  //       properties: {
  //         title: 'Mapbox',
  //         description: 'Washington, D.C.'
  //       }
  //     },
  //     {
  //       type: 'Feature',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [-122.414, 37.776]
  //       },
  //       properties: {
  //         title: 'Mapbox',
  //         description: 'San Francisco, California',
  //         haircut: 'bald'
  //       }
  //     }]
  //   };
    
  //   // add markers to map
  //   geojson.features.forEach(function(marker) {
    
  //   // create a HTML element for each feature
  //   var el = document.createElement('div');
  //   el.className = 'marker';
    
  //   // make a marker for each feature and add to the map
  //   new mapboxgl.Marker(el)
  //     .setLngLat(marker.geometry.coordinates)
  //     new mapboxgl.Marker(el)
  //     .setLngLat(marker.geometry.coordinates)
  //     .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
  //     .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>' + marker.properties.haircut))
  //     .addTo(map);
  //     console.log(marker.properties)
  //   });
  // }


  // toggleSearchResultsWidth = () => {
  //   this.setState({mapOpen: !this.state.mapOpen});
  //   console.log(this.state.mapOpen);
  // }


  // render() {
    
  //   const mapOpen = this.state.mapOpen ? {visibility: "visible", width: "45%"} : {visibility: "hidden", width: "0%", display: "none"};
  //   const BusinessListWidth = this.state.mapOpen ? {width: "45%"} : {width: "100%"};
  //   // const mapOpen = this.state.mapOpen ? {display: "block"} : {display: "none"};
  //   // const mapOpen = this.state.mapOpen ? "mapViewOn" : "mapViewOff";
  //   // document.querySelector('#map').classList.toggle('mapViewOn');
  //   // const buttonStatus = this.state.mapOpen ? "Grid View" : "Map View";

  //   return (
  //     <div className="App">
  //       <h1 className="logo-container">
  //         <a href="/" className="logo" style={{textDecoration: 'none', color: "white"}}>
  //           <span>kelp</span>
  //           <img src={kelp} alt="kelp logo" height="35px"/>
  //         </a>
  //       </h1>
  //       <SearchBar searchYelp={this.searchYelp}/>
  //       <div className="noresults" style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '30px', position: 'absolute'}}></div>
  //       {/* <div className="mapButtContainer">
  //         <button className="mapButton" onClick={this.handleClick}>{buttonStatus}</button>
  //       </div> */}
        
  //       <div className="bizAndMap">
  //         {this.state.isLoading ? 
  //           <div className="loader">
  //             <img src="https://miro.medium.com/max/700/1*CsJ05WEGfunYMLGfsT2sXA.gif" alt="icon" />
  //             <p>LOADING...</p>
  //             </div>
  //           : <BusinessList style={BusinessListWidth} businesses={this.state.businesses}
  //           />
  //         }
  //         <Map onClick={this.toggleSearchResultsWidth} style={mapOpen}/>
  //         {/* <div id='map' style={mapOpen}></div> */}
  //       </div>

  //     </div>
  //   );
  // }
// }

// export default App;

// https://www.codecademy.com/paths/build-web-apps-with-react/tracks/bwa-ajax-requests-and-api-interactions/modules/bwa-ravenous-part-four/projects/interacting-with-yelp-api 