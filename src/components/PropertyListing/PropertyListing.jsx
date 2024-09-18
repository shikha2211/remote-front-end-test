import React, { useEffect, useState } from 'react';
import PropertyCard from '../PropertyCard';
import './PropertyListing.scss';


const PropertyListing = () => {
    const [propertyList, setPropertyList] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchProperties () {
            try {
                const response = await fetch("http://localhost:3000/api/properties12");
                if(!response.ok){
                    setError("Error while fetching response from api");
                }
                else{
                    const data = await response.json();
                    setPropertyList(data);
                }
            }
            catch(err) {    
                setError("Error in reaching out to api");
            }
        }
        fetchProperties();
    },[]);

    return (
        <div>
            {
                error && <label>{error}</label>
            }
        <ul className="PropertyListing">
            {
                propertyList.map((property) => {
                    return(
                        <li key={property.id}>
                        <PropertyCard {...property} />
                    </li>
                    );
                })
            }
        </ul>
        </div>
    );
};

export default PropertyListing;
