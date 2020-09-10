import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business';


function BusinessList (props) {

    return (
        <div className="BusinessList" style={props.style}>
            {props.businesses.map(business => <Business business={business} key={business.id}/> )}
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