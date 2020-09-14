import React from 'react';
import './Business.css';
import { useSelector, useDispatch } from "react-redux";
import setCurrentBiz from '../redux/store';

export default function Business({ business, clickOnBusiness }) {  
  const currentBiz = useSelector(state => state);
  const dispatch = useDispatch();

  const handleImageClick = (e) => {
    // dispatch(setCurrentBiz(e))
    // console.log(currentBiz, "from Business Component!")
    clickOnBusiness(e.target.alt.split(','))
    console.log(e.target.alt, "from Business Component!")
  }

  return (
      <div className="Business">
        <div className="image-container">
          <img src={business.imageSrc} alt={[business.coordinates.longitude, business.coordinates.latitude]} onClick={handleImageClick}/>
        </div>
        <a href={business.url} target="_blank" rel="noopener noreferrer" className="Business-name"><h2>{business.name}</h2></a>
        <div className="Business-information">
          <div className="Business-address">
            <a href={`https://www.google.com/maps/search/?api=1&query=${business.address}+${business.city}`} target="_blank" rel="noopener noreferrer"><p>{business.address}</p>
            <p>{business.city}</p>
            <p>{`${business.state} ${business.zipCode}`}</p></a>
          </div>
          <div className="Business-reviews">
            {business.category ? <h3>{business.category.toUpperCase()}</h3> : null}
            <h3 className="rating">{`${business.rating} stars`}</h3>
            <p>{`${business.reviewCount} reviews`}</p>
          </div>
        </div>
      </div>
    )
}





// class Business extends React.Component {
//     render() {
//         return (
//             <div className="Business">
//               <div className="image-container">
//                 <img src={this.props.business.imageSrc} alt={this.props.business.name}/>
//               </div>
//               <a href={this.props.business.url} target="_blank" rel="noopener noreferrer" className="Business-name"><h2>{this.props.business.name}</h2></a>
//               <div className="Business-information">
//                 <div className="Business-address">
//                   <a href={`https://www.google.com/maps/search/?api=1&query=${this.props.business.address}+${this.props.business.city}`} target="_blank" rel="noopener noreferrer"><p>{this.props.business.address}</p>
//                   <p>{this.props.business.city}</p>
//                   <p>{`${this.props.business.state} ${this.props.business.zipCode}`}</p></a>
//                 </div>
//                 <div className="Business-reviews">
//                   {this.props.business.category ? <h3>{this.props.business.category.toUpperCase()}</h3> : null}
//                   <h3 className="rating">{`${this.props.business.rating} stars`}</h3>
//                   <p>{`${this.props.business.reviewCount} reviews`}</p>
//                 </div>
//               </div>
//             </div>
//         )
//     }
// };

// export default Business;