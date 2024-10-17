import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {iCountries} from "../../types.ts";

interface Props {
    onCountrySelect: (alpha3Code: string) => void;
}

const CountryList: React.FC<Props> = ({ onCountrySelect }) => {
    const [countries, setCountries] = useState<iCountries[]>([]);

    useEffect(() => {
        axios.get('https://restcountries.com/v2/all?fields=alpha3Code,name')
            .then(response => setCountries(response.data))
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    return (
        <div>
            <h3>Страны</h3>
            <ul>
                {countries.map(country => (
                    <li className="list-unstyled" key={country.alpha3Code} onClick={() => onCountrySelect(country.alpha3Code)}>
                        {country.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CountryList;
