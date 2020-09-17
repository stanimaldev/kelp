import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business';
// import { useSelector } from 'react-redux';

function BusinessList (props) {
    // similar incoming prop that lets this component know which marker was clicked on the map. then reach in for it's id property and check it against whichever business was rendered in the businessList. then have a function to automatically scroll to that 'id' position and also to add and remove a class that highlights the business.
    // const globalState = useSelector(state => state);
    let loadedBusinesses = [];

    props.businesses.map(business => loadedBusinesses.push(business))



    return (
        <div className="BusinessList" style={props.style}>
            {props.businesses.map(business => <Business business={business} className="biz" id={business.id} key={business.id} clickOnBusiness={props.clickOnBusiness}/> )}
        </div>
    )
}

// class BusinessList extends React.Component {

//     // componentDidMount() {
//     //     console.log("BusinessList did mount")
//     // }

//     render() {
//         return (
//             <div className="BusinessList">
//                 {this.props.businesses.map(business => <Business business={business} key={business.id}/> )}
//             </div>
//         );
//     }
// }

export default BusinessList;