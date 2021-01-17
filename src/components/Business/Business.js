import React from 'react';
import './Business.css';
import defaultImage from '../../favicon.ico';

export default function Business({ business, clickOnBusiness, id }) {
  const handleImageClick = (e) => {
    clickOnBusiness(e.target.alt.split(','))
  }

  const chooseImage = () => {
    return business.imageSrc ? business.imageSrc : defaultImage;
  } 

  return (
      <div className="Business" id={id}>
        <div className="image-container">
          <img src={chooseImage()} alt={[business.coordinates.longitude, business.coordinates.latitude]} onClick={handleImageClick}/>
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