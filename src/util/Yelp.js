const apiKey = process.env.REACT_APP_YELP_APIKEY;

/* https://www.yelp.com/developers/documentation/v3/business_search */
const Yelp = {
    search: async (term, location, sortBy) => {
        /* to bypass the CORS restriction, use CORS Anywhere */
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        })
        const jsonResponse = await response.json()
        if (jsonResponse.businesses) {
            return jsonResponse.businesses.map(business => {    
                return {
                    id: business.id,                            
                    imageSrc: business.image_url,
                    url: business.url,
                    name: business.name,
                    address: business.location.address1,
                    city: business.location.city,
                    state: business.location.state,
                    zipCode: business.location.zip_code,
                    category: business.categories[0] ? business.categories[0].title : null,
                    rating: business.rating,
                    reviewCount: business.review_count,
                    coordinates: business.coordinates
                }
            });
        }
    }
};


export default Yelp;