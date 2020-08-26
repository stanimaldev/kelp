import React from 'react';
// import logo from '../../favicon.ico';
import kelp from '../../kelp.png';
import './App.css';
import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';
import Yelp from '../../util/Yelp'
// import Map from '../Map/Map';
import mapboxgl from 'mapbox-gl';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      businesses: [],
      isLoading: '',
      mapView: false
    }
    this.searchYelp = this.searchYelp.bind(this);
    this.handleClick = this.handleClick.bind(this);
  };

  searchYelp(term, location, sortBy) {
    this.setState({isLoading: true})

    Yelp.search(term, location, sortBy).then(businesses => {
      this.setState({businesses: []})

      if (!businesses || businesses.length < 1) {
        let p = document.createElement('p');
        let noresults = document.querySelector('.noresults');
        p.textContent = "No results found! 😱😢";
        p.style.cssText = "color: white; background: red; padding: 20px; border-radius: 4px; text-align: center; width: 300px; font-size: 1.3rem";
        noresults.append(p);
        console.log("NOTHING FOUND!");
        setTimeout(() => {
          noresults.removeChild(p);
        }, 5000);
      } else {
        this.setState({businesses: businesses});
      }
    });
      // console.log(`Searching Yelp with ${term}, ${location}, ${sortBy}`)
  };


  componentDidUpdate(prevProps, prevState) {
    // console.log("App componentDidUpdate!")
    if (prevState.isLoading) {
      this.setState({isLoading: false})
    }
  }

  handleClick() {
    this.setState({
      mapView: !this.state.mapView
    })
    // console.log('clicked!', this.state.mapView)
  }




  /* GOOGLE MAP // LIFESAVER video: https://www.youtube.com/watch?v=W5LhLZqj76s (initMap is not a function error: because the script needs to look at the 'window' level. so at window.document.body.. etc. window.initMap = this.initMap)*/
  componentDidMount() {
    this.renderMap();

  }

  renderMap = () => {
    loadScript("https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js");
    window.initMap = this.initMap;
    window.initMap();
  };

  initMap = () => {
    // var map = new window.google.maps.Map(document.getElementById('map'), {
    //   center: {lat: -33.8688, lng: 151.2195},
    //   zoom: 13
    // });
    
    console.log('initMap running')
    mapboxgl.accessToken = 'pk.eyJ1Ijoic3Rhbi1kZXYiLCJhIjoiY2tlYm9leWpjMGFpMjJ0cndybWdpbmVwMSJ9.I0CXw1DFG7WYKgyVm7x07A';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-96, 37.8],
      zoom: 3
    });

    var geojson = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-77.032, 38.913]
        },
        properties: {
          title: 'Mapbox',
          description: 'Washington, D.C.'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-122.414, 37.776]
        },
        properties: {
          title: 'Mapbox',
          description: 'San Francisco, California',
          haircut: 'bald'
        }
      }]
    };
    
    // add markers to map
    geojson.features.forEach(function(marker) {
    
    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker';
    
    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>' + marker.properties.haircut))
      .addTo(map);
      console.log(marker.properties)
    });
    

  }





  render() {

    const mapView = this.state.mapView ? {visibility: "visible"} : {visibility: "hidden"};
    // const mapView = this.state.mapView ? "mapViewOn" : "mapViewOff";
    // document.querySelector('#map').classList.toggle('mapViewOn');
    const buttonStatus = this.state.mapView ? "Grid View" : "Map View";

    return (
      <div className="App">
        <h1 className="logo-container">
          <a href="/" className="logo" style={{textDecoration: 'none', color: "white"}}>
            <span>kelp</span> 
            <img src={kelp} alt="kelp logo" height="35px"/>
          </a>
        </h1>
        <SearchBar searchYelp={this.searchYelp}/>
        <div className="noresults" style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '30px', position: 'absolute'}}></div>
        <div className="mapButtContainer">
          <button className="mapButton" onClick={this.handleClick}>{buttonStatus}</button>
        </div>
        

        <div id='map' style={mapView} ></div>
        {/* <div ref={el => this.mapContainer = el} style={mapView} className="mapContainer" /> */}
        

        {/* <section style={mapView}>
          <div className="pac-card" id="pac-card">
            <div>
              <div id="title">
                Autocomplete search
              </div>
              <div id="type-selector" className="pac-controls">
                <input type="radio" name="type" id="changetype-all" checked="checked" />
                <label htmlFor="changetype-all">All</label>

                <input type="radio" name="type" id="changetype-establishment" />
                <label htmlFor="changetype-establishment">Establishments</label>

                <input type="radio" name="type" id="changetype-address" />
                <label htmlFor="changetype-address">Addresses</label>

                <input type="radio" name="type" id="changetype-geocode" />
                <label htmlFor="changetype-geocode">Geocodes</label>
              </div>
              <div id="strict-bounds-selector" className="pac-controls">
                <input type="checkbox" id="use-strict-bounds" value="" />
                <label htmlFor="use-strict-bounds">Strict Bounds</label>
              </div>
            </div>
            <div id="pac-container">
              <input id="pac-input" type="text"
                  placeholder="Enter a location" />
            </div>
          </div>

          <div id="map"></div>
          <div id="infowindow-content">
            <img src="" width="16" height="16" id="place-icon" />
            <span id="place-name"  className="title"></span><br></br>
            <span id="place-address"></span>
          </div>
        </section> */}
        
      

        {this.state.isLoading ? <div className="loader"><img src="https://miro.medium.com/max/700/1*CsJ05WEGfunYMLGfsT2sXA.gif" alt="icon" /><p></p></div> : <BusinessList businesses={this.state.businesses}/>}
      </div>
    );
  }
}


// Loads the Google Maps API
function loadScript(url) {
  const index = window.document.getElementsByTagName("script")[0];
  // const head = window.document.getElementsByTagName('head')[0];
  const script = window.document.createElement('script');
  // script.type = "text/javascript"
  script.src = url;
  // script.async = true;
  // script.defer = true;
  // head.append(script);
  index.parentNode.insertBefore(script, index);
  console.log('script loaded')
};



export default App;




// https://www.codecademy.com/paths/build-web-apps-with-react/tracks/bwa-ajax-requests-and-api-interactions/modules/bwa-ravenous-part-four/projects/interacting-with-yelp-api