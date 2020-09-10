// import React, {useState} from 'react';
// import './MapButton.css';

// export default function MapButton() {
//   const [mapOpen, setMapOpen] = useState(false);

//   function handleClick() {
//     if (!mapLoaded) {
//       renderMap();
//       setMapLoaded(true);
//       onClick();
//     }
//     setMapOpen(mapOpen => mapOpen = !mapOpen)
//     setTimeout(() => {
//       window.dispatchEvent(new Event('resize'))
//     }, 0)
//   }


//   const buttonStatus = mapOpen ? "Grid View" : "Map View";

//   return (
//     <div className="mapButtContainer">
//       <button className="mapButton" onClick={handleClick}>{buttonStatus}</button>
//     </div>
//   )
// }